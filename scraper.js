var request = require('request');
var cheerio = require('cheerio');
var _= require('underscore');
var prompt = require('prompt');
// var mcdonalds = 'http://fastfoodnutrition.org/mcdonalds/chart';
// var wendys = 'http://fastfoodnutrition.org/wendys/chart';

prompt.start();

prompt.get('Restaurant', function(err, result) {
    request('http://fastfoodnutrition.org/' + result + '/chart', function (error, response, html) {

      var $ = cheerio.load(html);
      var result = [];
      $('tr').each(function(i, element){
          var title = $(this).children('.chart_row_name').children('a').text();
          var category = $(this).parents('.chart_outside').prev().prev().text();
          var calories = $(this).children('td').eq(1).text();
          var protein = $(this).children('td').eq(11).text();

          var score = parseInt(protein)/parseInt(calories);

          result.push({
            category:category,
            title:title,
            calories: calories,
            protein: protein,
            score: score
          });
        });
        var filtered = _.filter(result, function(each) {
            return each.protein;
        });
        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];

                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
        }
        //sortByKey(result,'score')
      console.log(sortByKey(filtered,'score'));
    });
});
