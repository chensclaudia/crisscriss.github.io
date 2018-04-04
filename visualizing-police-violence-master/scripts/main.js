(function() {
  $(document).ready(function() {
    $('#main').fullpage({
      navigation: true,
      anchors: ['title', 'frequency', 'explore', 'explore-visualization', 'piechart'],
      afterLoad: function(anchorLink, index) {
        if (anchorLink == 'title') {
          $('.count').each(function() {
            $(this).prop('Counter', 0).animate({
              Counter: $(this).text()
            }, {
              duration: 8000,
              easing: 'swing',
              step: function(now) {
                $(this).text(Math.ceil(now));
              }
            });
          });
        }

        if (anchorLink == 'frequency') {
          $('.avg-count').each(function() {
            $(this).prop('Counter', 0).animate({
              Counter: $(this).text()
            }, {
              duration: 250,
              easing: 'swing',
              step: function(now) {
                $(this).text(Math.ceil(now));
              }
            });
          });
        }

        if (anchorLink == 'piechart') {
          renderDonutCharts("Fleeing", "fleeing-donut");
          renderDonutCharts("Body Camera", "body-cam-donut");
          renderDonutCharts("Mental Health Issues", "mental-health-donut");
        }
      }
    });
    renderCalendarHeatmap('data/count-per-day-2015.csv', '#calendar-heatmap-2015', 2015);
    renderCalendarHeatmap('data/count-per-day-2016.csv', '#calendar-heatmap-2016', 2016);
    renderCalendarHeatmap('data/count-per-day-2017.csv', '#calendar-heatmap-2017', 2017);
  });
})();
