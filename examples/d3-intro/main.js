var data = [2, 444, 66666];
var body = d3.select('body');

body.selectAll('h3').data(data).enter().append('p')
    .text(function(d) {return `${d}`;})
    .style('color', function(d) {
        if (d > 3) {
            return 'red';
        }
        return 'green';
    });