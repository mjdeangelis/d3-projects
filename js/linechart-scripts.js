
//Call lineChart function to draw charts
lineChart("linechart-2-container", "linechart-2", "linechart2-data.csv", "number of consumers");
lineChart("linechart-3-container", "linechart-3", "linechart3-data.csv", "total balances ($b)", "dollar");

/**
  * Creates a d3.js Line Chart
  * @param {String} containerID - ID of container div
  * @param {String} chartID - ID of chart dic
  * @param {String} dataLoc - Filename of csv data file (extension included)
  * @param {String} yLabel - Y axis label
  * @param {String} yFormat (optional) - Specifies the y axis format
**/
function lineChart(containerID, chartID, dataLoc, yLabel, yFormat) {

  //Initialize Variables
  var lineContainerWidth, lineContainerHeight, lineMargin, lineWidth, lineHeight;

  //Assign chart specific variables
  var chartSelector = d3.select("#"+chartID);
  var dataLocation = dataLoc;

  //Find width of chart container and update dimensions
  lineContainerMargin = $("#"+chartID).offset().left;
  lineContainerWidth = $("#"+containerID).width();
  // lineChartHeight = $("#"+chartID).height();
  // console.log("lineChartHeight is: "+lineChartHeight);
  updateDimensions(lineContainerWidth);

  //Formats
  var parseTime = d3.timeParse("%y");
  var percentage = d3.format(".0%");
  var dollar = d3.format("$,.0f");
  var thousand = d3.format(",.0f");

  //Returns value in our array of data that corresponds to the horizontal position of the mouse pointer
  var bisectPoint = d3.bisector(function(d) { return d.year; }).left;

  //Set the scales with ranges - possible area to render chart in pixels
  var x = d3.scaleLinear().range([0, lineWidth]);
  var y = d3.scaleLinear().range([lineHeight, 0]);

  //Define the line generator
  var lineGen = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.value); });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  // var svg = chartSelector.append("svg")
  //     .attr("width", lineWidth + lineMargin.left + lineMargin.right)
  //     .attr("height", lineHeight + lineMargin.top + lineMargin.bottom)
  //     .style("background-color", "#fff")
  //   .append("g")
  //     .attr("transform",
  //           "translate(" + lineMargin.left + "," + lineMargin.top + ")");

  ///////////////////////////////////////////////////////////////////
  // CURRENTLY IN DEVELOPMENT: modification to make svg responsive //
  ///////////////////////////////////////////////////////////////////

  var svg = chartSelector.append("div")
       .classed("svg-container", true) //container class to make it responsive
       .append("svg")
       .style("background-color", "#fff")
       //responsive SVG needs these 2 attributes and no width and height attr
       .attr("preserveAspectRatio", "xMinYMin meet")
       .attr("viewBox", "0 0 " + (lineWidth + lineMargin.left + lineMargin.right) + " " + (lineHeight + lineMargin.top + lineMargin.bottom))
       //class to make it responsive
       .classed("svg-content-responsive", true)
          .append("g")
            .attr("transform",
                  "translate(" + lineMargin.left + "," + lineMargin.top + ")");

  // Get the data and loop through each data point
  d3.csv("data/"+dataLocation, function(error, data) {

    //Format the data
    // data.forEach(function(d) {
    //     d.value = +d.value;
    //     d.year = +d.year;
    //     d.label = +d.label;
    // });

    //Scale the domains - minimum and maximum values of axes
    x.domain([2011,2016]);
    y.domain([0, d3.max(data, function(d) { return Math.max(d.value)*1.15; })]);

    //Draw x axis and labels
    svg.append("g")
    	  .attr("class", "x axis")
        .attr("transform", "translate(0," + lineHeight + ")")
        .call(
        	d3.axisBottom(x)
        	.ticks(5)
        	.tickFormat(d3.format("d"))
        )
  	  .selectAll("text") 
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)"); 

    //Draw y axis
      var yAxis = svg.append("g")
                	  .attr("class", "y axis")
                    .call(
                    	d3.axisLeft(y)
                        .ticks(5)
                    );

                  //Format y axis is yFormat is included
                  if (yFormat === "dollar") {
                    yAxis.call(
                            d3.axisLeft(y)
                              .ticks(5)
                              .tickFormat(dollar)
                          );
                  }

        //Draw y axis label
        svg.append("text")
            .attr("class", "y-label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(yLabel);

    //Draw vertical grid
  	svg.append("g")         
          .attr("class", "grid vert-grid")
          .attr("transform", "translate(0," + lineHeight + ")")
          .call(
          	d3.axisBottom(x)
          	.ticks(5)
              .tickSize(-lineHeight, 0, 0)
              .tickFormat(d3.format("d"))
          );

    //Draw horizontal grid
    svg.append("g")         
      .attr("class", "grid hor-grid")
      .attr("id", chartID+"-y-grid")
      .call(
      	d3.axisLeft(y)
          .tickSize(-lineWidth, 0, 0)
          .tickFormat("")
      );

      //Use lineGen to draw line 1
  	  var line1 = svg.append("path")
  	      .data([data])
  	      .attr("class", "line")
  	      .attr("id", chartID+"-line")
  	      .attr("d", lineGen);

      //Find length of line 1  
      var totalLength = line1.node().getTotalLength();

      //Hide line by default using offset
      line1
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)

      //Initialize hidden tooltip
      var lineTooltip = chartSelector.append("div")
            .attr("class", "tooltip")
            .style("display", "none");

        ////
        //Transition events to fire when chart element is visible - uses Waypoints.js
        ////
        var waypoint = new Waypoint({
            element: document.getElementById(chartID),
            handler: function() {

              //Transition for line to appear
              line1.transition()
                     .duration(2000)
                     .attr("stroke-dashoffset", 0);

              //Transition for line points to appear
              linePoints.transition()
                      .duration(2000)
                      .style("opacity","1");

            },
            offset: 'bottom-in-view'
        });

      //Draw line points 
      var linePoints = svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
          .attr("class", "line-point")
          // .style("opacity", "0")
          .attr("r", 5)
          .attr("cx", function(d) { return x(d.year); })
          .attr("cy", function(d) { return y(d.value); })
        .on("mouseover", function(d, event) {
            lineTooltip.transition()
              .duration(100)
              .style("display", "inline")
              .style("opacity", .9);

            //Change tooltip content based on chart
            if(chartID === "linechart-2") {
              lineTooltip.html("<strong>Q3 "+d.year+"</strong><br>"+thousand(d.value)+" consumers")
                .style("left", x(d.year) + "px")
                .style("top", y(d.value) + "px");
            } else if (chartID === "linechart-3") {
              lineTooltip.html("<strong>Q3 "+d.year+"</strong><br>"+dollar(d.value)+" billion")
                .style("left", (x(d.year)) + "px")
                .style("top", (y(d.value)) + "px");
            }

        })
        .on("mouseout", function(d) {
            lineTooltip.transition()
              .duration(500)
              .style("opacity", 0);
        })
        .on("mouseleave", function() {
            lineTooltip.transition()
              .duration(500)
              .style("opacity", 0);
        });


        //////////////////////////////////////
        // REMOVED AREA CAPTURE FOR Q3 2016 //
        //////////////////////////////////////

        // //Append the area to capture mouse hover
        // svg.append("rect")
        //   .attr("class", "hover-area")
        //     .attr("width", lineWidth)
        //     .attr("height", lineHeight)
        //     .style("fill", "none")
        //     .style("pointer-events", "all")
        //     .on("mouseover", function() { focus.style("display", null); })
        //     .on("mouseout", function() { focus.style("display", "none"); })
        //     .on("mousemove", mousemove);

        // //Initialize tooltip focus 1
        // var focus = svg.append("g") 
        //      .attr("class", "lineCircle")
        //      .style("display", "none");

        //  //Mousemove function
        // function mousemove() {
      
        //   //Variables for tooltip circle 1
        //   var x0 = x.invert(d3.mouse(this)[0]),
        //       i = bisectPoint(data, x0, 1),
        //       d0 = data[i - 1],
        //       d1 = data[i],
        //       d = x0 - d0.year > d1.year - x0 ? d1 : d0;

        //   focus.select("circle.y")
        //       .attr("transform","translate(" + x(d.year) + "," + y(d.value) + ")");

        // } //end mousemove

        // //append circle 1 at the intersection
        // focus.append("circle")
        //     // .data(data)
        //     .attr("class", "y")
        //     .style("fill", "#fff")
        //     .style("stroke", "#00A6CA")
        //     .attr("r", 6)
        //     //Circle Tooltip Events
        //     .on("mouseover", function(d) {

        //         //fixes bug that flickers circle
        //         focus.style("display", "inline");

        //         lineTooltip.transition()
        //           // .style("opacity", 0.9)
        //           .style("display", "inline");
        //     })



        //Draw dotted line on 15 million line **Tick Hack**
        if(chartID === "linechart-2") {
          $("#"+chartID+" g.y.axis g.tick:nth-child(5) line").attr("x2", lineWidth).attr("stroke-dasharray","5, 5").attr("opacity","0.3");
        }
        //Draw dotted line on $100 billion line **Tick Hack**
        if (chartID === "linechart-3") {
          $("#"+chartID+"-y-grid g.tick:nth-child(12)").attr("class", "tick zero-axis dotted");
        }

  }); //end data

  function updateDimensions(contWidth) {

        //Declare margins and height of svg container
        lineMargin = {top: 10, right: 50, bottom: 80, left: 125},
        lineWidth = contWidth - lineMargin.left - lineMargin.right,
        lineHeight = contWidth - lineMargin.top - lineMargin.bottom;

  }

}
// })(window,d3); //end linechart 2

//Document Ready
$(document).ready(function() {


})