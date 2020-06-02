async function drawLineChart() {
    const dataset = await d3.json("my_weather_data.json");
    
    // setting up data pt accessors
    const yAccessor = d => d.temperatureMax;
    const dateParser = d3.timeParse("%Y-%m-%d");
    const xAccessor = d => d.date;

    console.log(d3.extent(dataset, yAccessor));
    
    // setting up dimensions for bounds
    let dimensions = {
        width: window.innerWidth * 0.9, height: 400,
        margin: {
              top: 15,
              right: 15,
              bottom: 40,
              left: 60,
        }, 
    }

    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    // appending svg to workspace
    const wrapper = d3.select("#wrapper")
        .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height);

    // shifting svg element within bounds
    const bounds = wrapper.append("g") .style("transform", 
        `translate(${ dimensions.margin.left }px, ${ dimensions.margin.top }px)`);

    // creating y axis
    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([dimensions.boundedHeight, 0])

    // highlighting temperatures below 0f
    const freezingTemperaturePlacement = yScale(32)
    const freezingTemperatures = bounds.append("rect")
        .attr("x", 0)
        .attr("width", dimensions.boundedWidth)
        .attr("y", freezingTemperaturePlacement)
        .attr("height", dimensions.boundedHeight - freezingTemperaturePlacement)
        .attr("fill", "#e0f3f3")

    // creating x axis
	const xScale = d3.scaleTime()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth]);

    // drawing data
    const lineGenerator = d3.line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)));

    const line = bounds.append("path")
        .attr("d", lineGenerator(dataset))
        .attr("fill", "none")
        .attr("stroke", "#af9358")
        .attr("stroke-width", 2);

    // drawing axes
    const yAxisGenerator = d3.axisLeft()
        .scale(yScale);

    const yAxis = bounds.append("g")
        .call(yAxisGenerator);

    const xAxisGenerator = d3.axisBottom()
        .scale(xScale);

    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${ dimensions.boundedHeight }px)`);
}
  
drawLineChart();

