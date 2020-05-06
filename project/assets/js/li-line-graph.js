function legInjury() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 100, bottom: 30, left: 100},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("figure#li-chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

    // labels 

    var ankle_spr = svg.append("text")
    .attr("class", "li-label")
    .text("Ankle Sprain")
    .attr("y", 24)
    .attr("x", "10")
    .style("fill", "rgb(47, 92, 170)")
    .attr('transform', 'rotate(11)');

    var ankle_fx = svg.append("text")
    .attr("class", "li-label")
    .text("Ankle Fracture")
    .attr("y", 276)
    .attr("x", "5")
    .style("fill", "#53caf5");
    
    var tibia_fx = svg.append("text")
    .attr("class", "li-label")
    .text("Tibia Fracture")
    .attr("y", 190)
    .attr("x", "18")
    .style("fill", "#2396f3")
    .attr('transform', 'rotate(4)');

    var knee_spr = svg.append("text")
    .attr("class", "li-label")
    .text("Knee Sprain")
    .attr("y", 140)
    .attr("x", "-11")
    .style("fill", "#86adc5")
    .attr('transform', 'rotate(-7)');
          


   //Read the data
   d3.csv("data-leg-injury.csv").then(function(data) {
    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function(d) { return d.name;})
        .entries(data);
        console.log(data);
    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .tickFormat(d3.format("d"))
            .tickPadding([11]) // moves axis labels away from ticks and lines
            .tickSize(-height, 0, 0))
        .style("stroke-dasharray", "2 2");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.value; })])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y)
            .tickFormat(d3.format("d"))
            .tickPadding([11])
            .tickSize(-width, 0, 0))
            .style("stroke-dasharray", "2 2");

    // color palette
    var res = sumstat.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#2F5CAA','#54CAF5','#87ADC5','#2196F3'])

    // Draw the line
    svg.selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return color(d.key) })
            .attr("stroke-width", 2.5)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(+d.value); })
                (d.values)
            })

    })

  

      // line svg attr and give it two values (start, end)
};