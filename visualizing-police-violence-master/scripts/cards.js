function updateCards(state) {
  d3.json('data/count-per-state.json', function(error, data) {
    if (error) throw error;
    if (state !== "") {
      var stateArr = data[state.replace(/\s/g, '')];
      var div = document.getElementById('cards');

      while(div.firstChild) {
        div.removeChild(div.firstChild);
      }

      for (let j = 0 ; j < stateArr.length; j++) {
        var cards = document.getElementById("cards");

        var card = document.createElement('a');
        card.setAttribute('class','card card-' + (j+1));
        card.href = "#explore-visualization";

        var city = document.createElement("h3")
        city.setAttribute('class','city');

        var cityText = document.createTextNode(stateArr[j].city);
        city.appendChild(cityText);

        card.appendChild(city);
        $(card).data("city", stateArr[j].city);

        var deathCount = document.createElement("h1")
        deathCount.setAttribute('class','death-count red');

        var count = document.createTextNode(stateArr[j].count);
        deathCount.appendChild(count)

        var police = document.createElement("p")
        police.setAttribute('class','police-murders');

        var policeMurders = document.createTextNode("Police Murders");
        police.appendChild(policeMurders)

        var lineColor = document.createElement("div")
        lineColor.setAttribute('class','line-color');

        card.appendChild(deathCount);
        card.appendChild(police);
        card.appendChild(lineColor);

        cards.appendChild(card);
      }

      $('.death-count').each(function() {
        $(this).prop('Counter', 0).animate({
          Counter: $(this).text()
        }, {
          duration: 500,
          easing: 'linear',
          step: function(now) {
            console.log(now)
            $(this).text(Math.ceil(now));
          }
        });
      });
    }
  })

  // Render parallel coordinates
  document.getElementById("parallelCoordinates").innerHTML = '';
  var cities = [];
  cardSelected(cities);
  updateTreemap(cities);
}

function cardSelected(cities) {
  $('#cards').on('click', '.card', function () {
    var selectedCity = $(this).data("city");
    var lineColor = $(this)[0].className;
    if (cities.includes(selectedCity)) {
      var index = cities.indexOf(selectedCity);
      cities.splice(index, 1);
    } else {
      cities.push(selectedCity);
    }

    renderParallelCoordinates('data/socio-per-city.csv', cities, selectedCity, lineColor);
    updateTreemap(cities);
  });
}
