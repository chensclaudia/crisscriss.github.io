function renderCalendarHeatmap(file, yearId) {
  var margin = { top: 30, right: 20, bottom: 20, left: 20 },
      width = d3.select('#heatmap-container').node().getBoundingClientRect().width,
      height = d3.select('#heatmap-container').node().getBoundingClientRect().height;

  d3.csv(file, function(error, data) {
    if (error) throw error;

    var calendarRows = function(month) {
      var m = d3.timeMonth.floor(month);
      return d3.timeWeeks(d3.timeWeek.floor(m), d3.timeMonth.offset(m,1)).length;
    }

    var minDate = d3.min(data, function(d) {
      let minDate = new Date(d.date);
      return minDate.setDate(minDate.getDate() + 1);
    })
    var maxDate = d3.max(data, function(d) { return new Date(d.date) })

    var cellMargin = 2,
        cellSize = Math.floor(width / 100);

    var day = d3.timeFormat("%w"),
        week = d3.timeFormat("%U"),
        format = d3.timeFormat("%Y-%m-%d"),
        titleFormat = d3.utcFormat("%a, %b, %d"),
        monthName = d3.timeFormat("%B"),
        months = d3.timeMonth.range(d3.timeMonth.floor(minDate), maxDate);

    var rows = d3.max(months, function(month) {
      return calendarRows(month);
    })

    var svg = d3.select(yearId).selectAll("svg")
      .data(months)
      .enter().append("svg")
        .attr("class", "month")
        .attr("width", (cellSize * 7) + (cellMargin * 8) )
        .attr("height", function(d) {
          return (cellSize * rows) + (cellMargin * (rows + 1)) + 24; // the 14 is for the month labels
        })
      .append("g")

    svg.append("text")
      .attr("class", "month-name")
      .attr("x", ((cellSize * 7) + (cellMargin * 8)) / 2 )
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .text(function(d) { return monthName(d); })


    //  Tooltip Object
    var tooltip = d3.select("body")
      .append("div").attr("id", "tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .text("");

    var rect = svg.selectAll("rect.day")
      .data(function(d, i) {
        return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth()+1, 1));
      })
      .enter().append("rect")
        .attr("class", "day")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("rx", 3).attr("ry", 3) // rounded corners
        .attr("fill", '#eaeaea') // default light grey fill
        .attr("x", function(d) {
          return (day(d) * cellSize) + (day(d) * cellMargin) + cellMargin;
        })
        .attr("y", function(d) {
          return ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellSize) +
                 ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellMargin) +
                 cellMargin + 20;
         })
        .on("mouseover", function(d) {
          d3.select(this).classed('hover', true);
          tooltip.style("visibility", "visible");
          var data = titleFormat(new Date(d));

          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(data)
            .style("left", ((d3.event.pageX) - 38) + "px")
            .style("top", ((d3.event.pageY) - 30) + "px");
        })
        .on("mouseout", function(d) {
          d3.select(this).classed('hover', false);
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
          var $tooltip = $("#tooltip");
          $tooltip.empty();
        })
        .datum(format)

    var lookup = d3.nest()
      .key(function(d) { return d.date; })
      .rollup(function(leaves) {
        return d3.sum(leaves, function(d){ return parseInt(d.count); });
      })
      .object(data);

    var scale = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return parseInt(d.count); }))
      .range([0.1,1]); // the interpolate used for color expects a number in the range [0,1] but i don't want the lightest part of the color scheme

    rect.filter(function(d) { return d in lookup; })
      .attr("fill", function(d) { return d3.interpolateReds(scale(lookup[d])); })
      .on("mouseover", function(d) {
        d3.select(this).classed('hover', true);
        tooltip.style("visibility", "visible");
        var data = "<span class='red tooltip-count'>" + lookup[d] + "</span><span class='tooltip-count'> shootings</span>" + " on " + titleFormat(new Date(d));

        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(data)
          .style("left", ((d3.event.pageX) - 84) + "px")
          .style("top", ((d3.event.pageY) - 30) + "px");
      })
      .on("mouseout", function(d) {
        d3.select(this).classed('hover', false);
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
        var $tooltip = $("#tooltip");
        $tooltip.empty();
      })
  })

}
