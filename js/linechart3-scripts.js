var LineChart3 = (function(window,d3) { 

//Initialize Variables
var lineContainerWidth1, lineMargin, lineWidth, lineHeight;

//Declare chart selector
var chartSelector = d3.select("#linechart-3");

//find width of chart container and update dimensions
lineContainerMargin = $("#linechart-3-container").offset().left;
lineContainerWidth1 = $("#linechart-3-container").width();

//update Dimensions
updateDimensions(lineContainerWidth1);

// Formats
var parseTime = d3.timeParse("%y");
var percentage = d3.format(".0%");
var dollar = d3.format("$,.0f");

//returns value in our array of data that corresponds to the horizontal position of the mouse pointer
var bisectPoint = d3.bisector(function(d) { return d.year; }).left;

// set the ranges
var x = d3.scaleLinear().range([0, lineWidth]);
var y = d3.scaleLinear().range([lineHeight, 0]);

// define the 1st line
var valueline = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.value); });


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin


var svg = chartSelector.append("svg")
    .attr("width", lineWidth + lineMargin.left + lineMargin.right)
    .attr("height", lineHeight + lineMargin.top + lineMargin.bottom)
    .style("background-color", "#fff")
  .append("g")
    .attr("transform",
          "translate(" + lineMargin.left + "," + lineMargin.top + ")");

// var svg = chartSelector.append("div")
//      .classed("svg-container", true) //container class to make it responsive
//      .append("svg")
//      .style("background-color", "#fff")
//      //responsive SVG needs these 2 attributes and no width and height attr
//      .attr("preserveAspectRatio", "xMinYMin meet")
//      .attr("viewBox", "0 0 " + (lineWidth + lineMargin.left + lineMargin.right) + " " + (lineHeight + lineMargin.top + lineMargin.bottom))
//      //class to make it responsive
//      .classed("svg-content-responsive", true)
//         .append("g")
//           .attr("transform",
//                 "translate(" + lineMargin.left + "," + lineMargin.top + ")");

// Get the data
d3.csv("data/linechart3-data.csv", function(error, data) {
  // if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.value = +d.value;
      d.year = +d.year;
      d.label = +d.label;
  });

  // Scale the range of the data
  // x.domain(d3.extent(data, function(d) { return d.year; }));
  x.domain([2011,2016]);
  y.domain([0, d3.max(data, function(d) { return Math.max(d.value)*1.15; })]);

  //draw x axis
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
	 

  //draw y axis
  svg.append("g")
      .attr("class", "y axis")
      .call(
        d3.axisLeft(y)
          .ticks(5)
          .tickFormat(dollar)
      );

  //draw y axis label
  svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("total balances ($b)");

   //draw x grid
  svg.append("g")         
        .attr("class", "x-grid grid")
        .attr("transform", "translate(0," + lineHeight + ")")
        .call(
          d3.axisBottom(x)
          .ticks(5)
            .tickSize(-lineHeight, 0, 0)
            .tickFormat(d3.format("d"))
        );

   //draw y grid
    svg.append("g")         
        .attr("class", "y-grid grid")
        .attr("id", "line3-y-grid")
        .call(
          d3.axisLeft(y)
            .tickSize(-lineWidth, 0, 0)
            .tickFormat("")
        );

    // Add the valueline path
    var line1 = svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("id", "linechart2-line")
        .style("stroke", "#bada81")
        .attr("d", valueline);

       //find length of line path  
       var totalLength = line1.node().getTotalLength();

       //hide line until scroll 
        line1
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)

    //initialize hidden tooltip
    var lineTooltip = chartSelector.append("div")
          .attr("class", "tooltip")
          // .style("position", "absolute")
          .style("display", "none");

     //draw line when chart is visible
     //using Waypoints.js
      var waypoint = new Waypoint({
          element: document.getElementById('linechart-3'),
          handler: function() {

              //reset line offset so it appears
              line1.transition()
                   .duration(2000)
                   .attr("stroke-dashoffset", 0);

              //Placeholder points 
              linePoints.transition()
                      .duration(2000)
                      .style("opacity","1");
          },
          offset: 'bottom-in-view'
      });


      ////
      //REMOVED AREA CAPTURE FOR Q3 2016
      ////

      // append the area to capture mouse hover
      // svg.append("rect")
      //   .attr("class", "hover-area")
      //     .attr("width", lineWidth)
      //     .attr("height", lineHeight)
      //     .style("fill", "none")
      //     .style("pointer-events", "all")
      //     .on("mouseover", function() { focus.style("display", null); })
      //     .on("mouseout", function() { focus.style("display", "none"); })
      //     .on("mousemove", mousemove);

    //initialize tooltip focus 1
    var focus = svg.append("g") 
            .attr("class", "lineCircle")
            .style("display", "none");

    //Placeholder points 
    var linePoints = svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
        .attr("class", "line-point")
        .style("opacity", "0")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y(d.value); })
      .on("mouseover", function(d, event) {
          lineTooltip.transition()
            .duration(100)
            .style("display", "inline")
            .style("opacity", .9);
          lineTooltip.html("<strong>Q3 "+d.year+"</strong><br>"+dollar(d.value)+" billion")
            .style("left", (x(d.year)) + "px")
            .style("top", (y(d.value)) + "px");
      })
      .on("mouseout", function(d) {
          lineTooltip.transition()
            .duration(500)
            .style("opacity", 0);
      })
      .on("mouseleave", function() {
          lineTooltip.transition()
        .duration(500)
        .style("opacity", 0)
      });

      //append circle 1 at the intersection
      focus.append("circle")
          // .data(data)
          .attr("class", "y")
          .style("fill", "#fff")
          .style("stroke", "#00A6CA")
          .attr("r", 6)
          //Circle Tooltip Events
          .on("mouseover", function(d) {

              //fixes bug that flickers circle
              focus.style("display", "inline");

              lineTooltip.transition()
                // .style("opacity", 0.9)
                .style("display", "inline");
          })

          // .on("mousemove", function(d) {
          //     lineTooltip.html("<strong>"+d.label+"</strong><br>"+percentage(d.value))
          //     // lineTooltip.html(d3.event.pageX + ", " + d3.event.pageY)
          //       .style("left", (d3.event.pageX - 400)+"px")
          //       .style("top", (d3.event.pageY - 875) + "px") //300 is a hardcoded value here - might present issues
          // })

          // .on("mouseout", function() {
          //     lineTooltip.style("display", "none");
          // })

          // .on("mouseleave", function() {
          //     lineTooltip.style("display", "none");
          // });

      function mousemove() {
    
        //variables for tooltip circle 1
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectPoint(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.year > d1.year - x0 ? d1 : d0;

        focus.select("circle.y")
            .attr("transform","translate(" + x(d.year) + "," + y(d.value) + ")");

      }

}); //end data

function updateDimensions(contWidth) {

      //Declare margins and height of svg container
      lineMargin = {top: 20, right: 50, bottom: 70, left: 125},
      lineWidth = contWidth - lineMargin.left - lineMargin.right,
      lineHeight = 500 - lineMargin.top - lineMargin.bottom;

}

})(window,d3); //end linechart 2

//Document Ready
$(document).ready(function() {


})