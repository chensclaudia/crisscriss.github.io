function renderParallelCoordinates(file, cities, selectedCity, lineColor) {
  var margin = { top: 30, right: 20, bottom: 20, left: 20 },
      width = ($(window).width() / 1.5),
      height = ($(window).height() / 2);

  var categories = ["Murders", "Income", "Poverty"];

  var xScale = d3.scalePoint().domain(categories).range([0, width - 60]),
      yScale = {};

  var line = d3.line(),
      axis = d3.axisLeft(),
      foreground;

  var svg = d3.select('#parallelCoordinates')
      .attr('width', width)
      .attr('height', height - margin.top)
      .attr('x', width)
    .append('g')
      .attr('transform', 'translate(' + (margin.left+margin.right) + ',' + margin.top + ')');

  var tooltip = d3.select("body")
    .append("div").attr("id", "pc-tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("");

  d3.csv(file, function(data) {
    // Create a scale for each category.
    categories.forEach(function(d) {
      // Coerce values to numbers.
      data.forEach(function(p) { p[d] = +p[d]; });

      yScale[d] = d3.scaleLinear()
          .domain(d3.extent(data, function(p) { return p[d]; }))
          .range([height - 100, 0]);
    });

    // Add foreground lines.
    foreground = svg.append('g')
        .attr('class', 'foreground')
      .selectAll('path')
        .data(data)
      .enter().append('path')
        .attr('d', path)
        .attr('class', function(d) {
          if (cities.includes(d.City) && selectedCity == d.City) {
            return lineColor
          }
        })
        .on("mouseover", function(d) {
          d3.select(this).classed('hover', true);
          tooltip.style("visibility", "visible");
          var data = d.City;

          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(data)
            .style("left", (d3.event.pageX) + "px")
            .style("top", ((d3.event.pageY) - 30) + "px");
        })
        .on("mouseout", function(d) {
          d3.select(this).classed('hover', false);
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
          var $tooltip = $("#tooltip");
          $tooltip.empty();
        });

    // Add a group element for each category.
    var g = svg.selectAll(".category")
        .data(categories)
      .enter().append("g")
        .attr("class", "category")
        .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; })

    if (cities.length == 1) {
      // Add an axis and title.
      g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(yScale[d])); })
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", -9)
      .text(String);
    }
  });

  // Returns the path for a given data point.
  function path(d) {
    return line(categories.map(function(p) { return [xScale(p), yScale[p](d[p])]; }));
  }
}
