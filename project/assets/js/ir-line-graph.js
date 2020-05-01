function injuryRate() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("figure#ir-chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // loading data in d3v5
  d3.csv("data-injury-rate.csv")
      .then( // promise: don't do anything until we load the data
      // chart goes here!
      // Now I can use this dataset:
      data => {
      // Add X axis --> it is a date format
      // console.log(data);
      var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([2.5, d3.max(data, function(d) { return +d.value; })])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));

          // This allows to find the closest X index of the mouse:
      var bisect = d3.bisector(function(d) { return d.date; }).left;

      // Create the circle that travels along the curve of chart
      var focus = svg
        .append('g')
        .append('circle')
          .style("fill", "#2196F3")
          .attr("stroke", "none")
          .attr('r', 5)
          .style("opacity", 0)

      // Create the text that travels along the curve of chart
      var focusText = svg
        .append('g')
        .append('text')
          .style("opacity", 0)
          .attr("text-anchor", "left")
          .attr("alignment-baseline", "middle")
          .attr("class", "ir-pth-tt")

      // Add the line
      svg.append("path")
        .datum(data)
        .attr("class", "ir-pth")
        .attr("fill", "none")
        .attr("stroke", "#2196F3")
        .attr("stroke-width", 1.75)
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.value) })
          )

      // Create a rect on top of the svg area: this rectangle recovers mouse position
      svg
      .append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);


    // What happens when the mouse move -> show the annotations at the right positions.
    function mouseover() {
      focus.style("opacity", 1)
      focusText.style("opacity",1)
    }

    function mousemove() {
      // recover coordinate we need
      var x0 = x.invert(d3.mouse(this)[0]);
      var i = bisect(data, x0, 1);
      selectedData = data[i]
      focus
        .attr("cx", x(selectedData.date))
        .attr("cy", y(selectedData.value))
      focusText
        .html(selectedData.date + " -  " + selectedData.value)
        .attr("x", x(selectedData.date)+15)
        .attr("y", y(selectedData.value))
      }
    function mouseout() {
      focus.style("opacity", 0)
      focusText.style("opacity", 0)
    }

  })

      // line svg attr and give it two values (start, end)
};
