async function plotScatterChart() {
    const dataset = await d3.json("my_weather_data.json");

    // setting up data pt accessors
    const yAccessor = d => d.dewPoint;
    const xAccessor = d => d.humidity;
    const colorAccessor = d => d.cloudCover;

    console.log(dataset[2].humidity);

    // setting up dimensions for bounds
    const width = d3.min([ 
        window.innerWidth * 0.9, 
        window.innerHeight * 0.9,
    ]);

 
    let dimensions = { 
        width: width, 
        height: width,
        margin: {
            top: 10,
            right: 10,
            bottom: 50,
            left: 50,
      },
    }

    // defining bound width and height
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    // draw canvas
    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width) 
        .attr("height", dimensions.height);

    const bounds = wrapper.append("g") 
        .style("transform", `translate(${ dimensions.margin.left }px, ${ dimensions.margin.top }px)`)

    // create x scale
    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))  // min and max values from the dataset
        .range([0, dimensions.boundedWidth])
        .nice();

    // console.log(xScale.domain()); 
    // xScale.nice();
    // console.log(xScale.domain());

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor)) 
        .range([dimensions.boundedHeight, 0]) 
        .nice();

     // extra credit -- third metric
     const colorScale = d3.scaleLinear() 
        .domain(d3.extent(dataset, colorAccessor)) 
        .range(["skyblue", "darkslategrey"]);

    // draw data
    const dots = bounds.selectAll("circle") 
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(xAccessor(d))) 
        .attr("cy", d => yScale(yAccessor(d))) 
        .attr("r", 5)
        .attr("fill", d => colorScale(colorAccessor(d)));

    // draw peripherals
    const xAxisGenerator = d3.axisBottom() 
        .scale(xScale);

    const xAxis = bounds.append("g") 
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`);

    const xAxisLabel = xAxis.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", dimensions.margin.bottom - 10)
        .attr("fill", "black")
        .style("font-size", "1.4em")
        .html("Dew point (&deg;F)");

    const yAxisGenerator = d3.axisLeft() 
        .scale(yScale)
        .ticks(4);

    const yAxis = bounds.append("g") 
        .call(yAxisGenerator);

    const yAxisLabel = yAxis.append("text")
        .attr("x", -dimensions.boundedHeight / 2)
        .attr("y", -dimensions.margin.left + 10)
        .attr("fill", "black")
        .style("font-size", "1.4em")
        .text("Relative humidity")
        .style("transform", "rotate(-90deg)") 
        .style("text-anchor", "middle");

   
  
}

plotScatterChart();