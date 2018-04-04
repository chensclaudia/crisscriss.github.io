var  width2 = ($(window).width() * .92),
    height2 = ($(window).height() / 2.1);

  // legend
var legend = ['White', 'Black','Asian','Hispanic'];
// tree map colors per question
var color2 = d3.scaleOrdinal().range(['#FEEAE6', '#534B47','#FADE9B', '#845F45']).domain(legend);

// generate d3 treemap
var tree = d3.treemap()
    .size([width2, height2])
    .padding(1)
    .round(true);

function updateTreemap(cities) {
  d3.csv('data/socio.csv', function(error, data) {
      // replace data from tree like structure csv with our actual data counted previously
      // treeupdate(data,"Male1");
      // generate tree structure using stratify
    for(let i = 0; i < data.length; i++)
    {
         if(cities.length == 0)
        {
            if(data[i].parent != "root")
            {
                if(data[i].name != "root"){
                  data[i].value = parseInt(data[i].value1)
                  data[i].value2 = parseInt(data[i].value2)
                }
            }
        }
        if(data[i].parent != "root")
        {
            if(data[i].name != "root" )
            {
                cities.length > 0 && cities.map(function(city) {
                  if(data[i].name == city)
                  {
                    data[i].value = parseInt(data[i].value1)
                    data[i].value2 = parseInt(data[i].value2)
                  }
                })
            }
        }
    }//end for

    var root = treeData(data);

    tree(root);

    var topDiv = d3.select('#treesection');
    var node = topDiv.selectAll('.node')
        .remove()
        .exit()
        .data(root.leaves(), function(d) {
            return d.data.name
        })
        .enter().append('div')
        .attr('class', 'node');

    // label
    var nodeLabel = node.append("div")
        .attr("class", "node-label");

    // label value
    var nodeValue = node.append("div")
        .attr("class", "node-value");

    // function to define block positions
    node.call(position);

    // generate tree like structure based of d3's stratify
    function treeData(data) {

        var stratifyd3 = d3.stratify()

            .id(function(d) {
                return d.name
            })
            .parentId(function(d) {
                return d.parent;
            });

        return stratifyd3(data).sum(function(d) {
            return d.value;
        }).sort(function(a, b) {
            return b.height2 - a.height2 || b.value - a.value;
        });
    } //tree data

    // position our inner blocks for our tree
    function position(d) {

        d.attr("title", function(d) {
            return d.id + "\n" + (d.value);
        })
        .style('left', function(d) {
            return d.x0 + 'px';
        })
        .style('top', function(d) {

            return d.y0 + 'px';
        })
        .style('width', function(d) {
            return d.x1 - d.x0 + 'px';
        })
        .style('height', function(d) {
            return d.y1 - d.y0 + 'px';
        })
        .style('background', function(d, i) {
            return !d.children ? color2(d.parent.data.name) : null;
        });

        // generate labels
        d.select('.node-label')
            .text(function(d) {
                return (d.data.name);
            });

        d.select('.node-value').text(function(d) {

            return (d.data.value);
        });
    } // position d

  });
  // tupdate
  // legend section
}

var legend = ['White', 'Black','Asian','Hispanic'];

var svg = d3.select('#treesection')
    .append('svg')
    .attr('width', width2 + 100)
    .attr('height', height2).append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(' + width2 + ', ' + 30 + ')');

// title
svg.append('text')
    .style('font-weight', 'bold')
    .attr('x', 10)
    .attr('y', -10)
    .text('Legend');


// legend items
var legendItem = svg.selectAll('.legend-item')
    .data(legend).enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', function(d, i) {
        return 'translate(10,' + i * 25 + ')'
});

// legend color fill
legendItem.append('rect')
    .attr('width', 20)
    .attr('height', 20)
    .style('fill', function(d) {

        return color2(d)
});

// legend text
legendItem.append('text')
    .attr('x', 25)
    .attr('y', 15).text(function(d) {
        return d;
});

updateTreemap([]);
