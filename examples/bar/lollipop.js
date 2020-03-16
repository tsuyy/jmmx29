
// Define the dimensions
let dimensions = {
    width: window.innerWidth * 0.9,
    height: 600,
    margin: {
        top: 20,
        right: 80,
        bottom: 30,
        left: 80,
    },
};

dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom; 

var svg = d3.select("figure#chart")
    .append("svg") // creating a svg element
    .attr("viewBox",`0 0 ${dimensions.width} ${dimensions.height}` )
    .append("g") // grouping the svg
    .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

var xScale = d3.scaleLinear()
    .range([0, dimensions.boundedWidth]);

var yScale = d3.scaleBand()
    .range([0, dimensions.boundedHeight])
    .padding(.5);

var rowConverter = function(d) {
    return {
        genre: d.genre,
        votes: +d.count // + parses the values into numbers
    }
};

// loading data in d3v5
d3.csv("https://raw.githubusercontent.com/lennymartinez/jmmx29/master/_work/examples/bar/data.csv", rowConverter)
    .then( // promise: don't do anything until we load the data
        // chart goes here!
        data => {
            console.log(data);
            // update the doamin of the xScale with d3.extent
            //xScale.domain(d3.extent(data, function(d) { return d.votes })); 
            // domain is the value of the data; range is the pixels on the browsers
            xScale.domain([0, d3.max(data, d => d.votes) * 1.20]) ;
            yScale.domain(data.map(d => d.genre)).padding(1); // use the map method for categorical data 

            // declaring variables so we can modify them later!
            var xAxis = svg.append("g")
                .attr("class", "x axis")
                .call(d3.axisBottom(xScale))
                .attr("transform", `translate(0, ${dimensions.boundedHeight})`);

            var xAxisText = xAxis.selectAll("text")
                .attr("class", "axis_text");

            var candy = svg.selectAll("circle") // referecing something that doesn't yet exist
            .data(data) 
            .enter() // add the rectangle based on the data
            .append("circle")
            .attr("cy", d => yScale(d.genre)) // set y position of the candy to each category
            .attr("cx", d => xScale(d.votes)) // set x postion to the scale of x ?
            .attr("r", 5)
            .attr("fill", "#96d0ff")
            .attr("stroke", "grey");

            var yAxis = svg.append("g")
                .attr("class", "y axis")
                .call(d3.axisLeft(yScale));

            var yAxisText = yAxis.selectAll("text")
                .attr("class", "axis_text");

            var stick = svg.selectAll("stcik")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", d => xScale(d.votes) - 5)
            .attr("x2", d => xScale(0))
            .attr("y1", d => yScale(d.genre))
            .attr("y2", d => yScale(d.genre))
            .attr("stroke", "grey");


        }
    );

    // line svg attr and give it two values (start, end)