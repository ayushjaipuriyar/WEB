$('#autocomplete').autocomplete({
  dataType: 'jsonp',
  serviceUrl: 'https://en.wikipedia.org/w/api.php?callback=?&action=opensearch&format=json',
  paramName: 'search',
  transformResult: function(response) {
    return {
      "suggestions": response[1]
    }
  },
  onSelect: function(suggestion) {
    getWikiLinks(suggestion.value);
  },
  autoSelectFirst: true,
  //if wiki opensearch provides no results, pressing enter should still submit a search to the getWikiLinks function
  onSearchComplete: function() {
    var instance = $(this).data('autocomplete');
    if (instance.suggestions.length === 0) {
      $('#autocomplete').keyup(function(e) {
        if (e.keyCode === 13) {
          var query = $('input').val()
          getWikiLinks(query);
          $('#autocomplete').off('keyup');
        }
      });
    }
  }
});

$('#search-button').click(function() {
  var query = $('input').val()
  getWikiLinks(query);
})

function getWikiLinks(query) {
    $.getJSON('https://en.wikipedia.org/w/api.php?&callback=?', {
      format: 'json',
      action: 'query',
      prop: 'extracts|links|pageimages',
      exchars: '200',
      exlimit: 'max',
      exintro: '',
      explaintext: '',
      exsectionformat: 'plain',
      generator: 'search',
      gsrsearch: query
    }, function(data) {
      if (data.hasOwnProperty('query')) {
        var results = data.query.pages;
        $('.wiki-links ul').html(createLinks(results));
      } else {
        $('.wiki-links ul').html('<li id="no-match">No matching results</li>')
      }
    });
  }
  //create an array of <li> elements with indexing to match wiki search ranking.
function createLinks(data) {
  var wikis = []
  for (var key in data) {
    var i = data[key].index - 1;
    wikis[i] = '<li class="animated fadeIn"><h3><a href="http://en.wikipedia.org/?curid=' + key + '" target="_blank">' + data[key].title +
      '</h3></a>' +
      '<p>' + data[key].extract +
      '</p></li>';
  }
  return wikis;
}