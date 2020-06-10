async function drawBarChart() {
    const dataset = await d3.json("my_weather_data.json");

    // setting up data pt accessors
    const metricAccessor = d => d.humidity;
    const yAccessor = d => d.length; // added after creating the bins

    // setting up dimensions
    const width = 600;
    let dimensions = { 
        width: width, 
        height: width * 0.6, 
        margin: {
            top: 30,
            right: 10,
            bottom: 50,
            left: 50,
        }, 
    }

    // setting up the size of the bounds by subtracting margins
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    // draw canvas
    const wrapper = d3.select("#wrapper") 
        .append("svg")
        .attr("width", dimensions.width) 
        .attr("height", dimensions.height);

    const bounds = wrapper
        .append("g") 
        .style("transform", `translate(${ dimensions.margin.left }px, ${ dimensions.margin.top }px)`);

    // creating x scale
    const xScale = d3.scaleLinear() 
        .domain(d3.extent(dataset, metricAccessor)) 
        .range([0, dimensions.boundedWidth]) 
        .nice();
    
    // creating bins 
    const binsGenerator = d3.histogram() 
        .domain(xScale.domain())
        .value(metricAccessor)
        .thresholds(12);

    const bins = binsGenerator(dataset);
    console.log(bins);

    // creating y scale
    const yScale = d3.scaleLinear() 
        .domain([0, d3.max(bins, yAccessor)]) 
        .range([dimensions.boundedHeight, 0])
        .nice();

    // drawing data
    const binsGroup = bounds.append("g");
    const binGroups = binsGroup.selectAll("g") // binding & selecting each data point to a <g> SVG element (grouping the bars and lables)
		.data(bins) // binding the bins to the selection
		.enter()
        .append("g");
    
    const barPadding = 1;
    const barRects = binGroups.append("rect") 
        .attr("x", d => xScale(d.x0) + barPadding / 2) 
        .attr("y", d => yScale(yAccessor(d)))
        .attr("width", d => d3.max([ 0, xScale(d.x1) - xScale(d.x0) - barPadding ]))
		.attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)))
        .attr("fill", "cornflowerblue");
    
    // adding labels
    const barText = binGroups.filter(yAccessor) // shorthand for d => yAccessor(d) != 0
        .append("text")
        .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
        .attr("y", d => yScale(yAccessor(d)) - 5) // shifting text up by 5px to add a gap
        .text(yAccessor)
        .style("text-anchor", "middle")
        .attr("fill", "darkgrey") 
        .style("font-size", "12px") 
        .style("font-family", "sans-serif");

    // adding mean 
    const mean = d3.mean(dataset, metricAccessor);
    const meanLine = bounds.append("line") 
		.attr("x1", xScale(mean)) 
		.attr("x2", xScale(mean)) 
		.attr("y1", -15)
        .attr("y2", dimensions.boundedHeight)
        .attr("stroke", "maroon") 
        .attr("stroke-dasharray", "2px 4px");

    // mean label
    const meanLabel = bounds.append("text")
        .attr("x", xScale(mean))
        .attr("y", -20)
        .text("mean")
        .attr("fill", "maroon")
        .style("font-size", "12px")
        .style("font-family", "sans-serif")
        .style("text-anchor", "middle");

    // draw x axis
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
        .text("Humidity");
}

drawBarChart();