
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
    .padding(0.3);

var rowConverter = function(d) {
    return {
        genre: d.genre,
        votes: +d.count // + parses the values into numbers
    }
};

// ARROW FUNCTION
// var rowCOnverter2 = (d) => {
//     return {
//         genre: d.gener,
//         count: +d.count
//     }
// };

// loading data in d3v4
// d3.csv("https://raw.githubusercontent.com/lennymartinez/jmmx29/master/_work/examples/bar/data.csv", 
//     rowConverter, 
//     function(data) {
    // do stuff with data
// })

// loading data in d3v5
d3.csv("https://raw.githubusercontent.com/lennymartinez/jmmx29/master/_work/examples/bar/data.csv", rowConverter)
    .then( // promise: don't do anything until we load the data
        // chart goes here!
        data => {
            console.log(data);
            // update the doamin of the xScale with d3.extent
            //xScale.domain(d3.extent(data, function(d) { return d.votes })); 
            // domain is the value of the data; range is the pixels on the browsers
            xScale.domain([0, d3.max(data, d => d.votes)]);
            yScale.domain(data.map(d => d.genre)); // use the map method for categorical data 

            // declaring variables so we can modify them later!
            var xAxis = svg.append("g")
                .attr("class", "x axis")
                .call(d3.axisBottom(xScale))
                .attr("transform", `translate(0, ${dimensions.boundedHeight})`);

            var xAxisText = xAxis.selectAll("text")
                .attr("class", "axis_text");

            var bars = svg.selectAll("rect") // referecing something that doesn't yet exist
                .data(data) 
                .enter() // add the rectangle based on the data
                .append("rect")
                .attr("y", d => yScale(d.genre)) // set y position of the rectangles to each category
                .attr("width", d => xScale(d.votes)) // set width of the rect to the scale of x axis
                .attr("height", d => yScale.bandwidth())
                .attr("fill", "#96d0ff");

            var yAxis = svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale))

            var yAxisText = yAxis.selectAll("text")
            .attr("class", "axis_text");
        }
    );