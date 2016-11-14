//Initialize Variables
var lineContainerWidth1, lineMargin, lineWidth, lineHeight;

//find width of chart container and update dimensions
lineContainerWidth1 = $("#linechart-1-container").width();
updateDimensions(lineContainerWidth1);

//Declare chart selector
var chartSelector = d3.select("#linechart-1");

// Formats
var parseTime = d3.timeParse("%y");
var percentage = d3.format(".0%");
var dollar = d3.format("$.0f");

// set the ranges
var x = d3.scaleLinear().range([0, lineWidth]);
var y = d3.scaleLinear().range([lineHeight, 0]);

// define the 1st line
var valueline = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.subprime); });

// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.nearprime); });

// define the 3rd line
var valueline3 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.prime); });

// define the 4th line
var valueline4 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.primeplus); }); 

// define the 5th line
var valueline5 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.superprime); }); 


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin


var svg = d3.select("#linechart-1").append("svg")
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
d3.csv("data/linechart1-data.csv", function(error, data) {
  // if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.year = +d.year;
      // console.log("year is: "+d.year);
      d.subprime = +d.subprime;
      // console.log("subprime is: "+d.subprime);
      d.nearprime = +d.nearprime;
      // console.log("nearprime is: "+d.nearprime);
  });

  // Scale the range of the data
  // x.domain(d3.extent(data, function(d) { return d.year; }));
  x.domain([2011,2016]);
  y.domain([
  	d3.min(data, function(d) { return Math.min(d.subprime, d.nearprime, d.prime, d.primeplus, d.superprime)*3; }), 
  	d3.max(data, function(d) { return Math.max(d.subprime, d.nearprime, d.prime, d.primeplus, d.superprime); })
  ]);

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
      	  .tickFormat(percentage)
      );

  //draw y axis label
  svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("yoy growth");

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
        .attr("id", "line1-y-grid")
        .call(
        	d3.axisLeft(y)
            .tickSize(-lineWidth, 0, 0)
            .tickFormat("")
        );

    // Add the valueline path
	  var subprime = svg.append("path")
	      .data([data])
	      .attr("class", "line")
	      .attr("id", "subprime-line")
	      .style("stroke", "#e66651")
	      .attr("d", valueline)
	      .attr("data-legend", "Subprime");

	  // Add the valueline2 path
	  var nearprime = svg.append("path")
	      .data([data])
	      .attr("class", "line")
	      .attr("id", "nearprime-line")
	      .style("stroke", "#f48d4f")
	      .attr("d", valueline2)
	      .attr("data-legend", "NearPrime");

	  // Add the valueline3 path.
	  var prime = svg.append("path")
	      .data([data])
	      .attr("class", "line")
	      .attr("id", "prime-line")
	      .style("stroke", "#fde033")
	      .attr("d", valueline3)
	      .attr("data-legend", "Prime");

	    // Add the valueline4 path
	  var primeplus = svg.append("path")
	      .data([data])
	      .attr("class", "line")
	      .attr("id", "primeplus-line")
	      .style("stroke", "#bada81")
	      .attr("d", valueline4)
	      .attr("data-legend", "PrimePlus");

	    // Add the valueline5 path
	  var superprime = svg.append("path")
	      .data([data])
	      .attr("class", "line")
	      .attr("id", "superprime-line")
	      .style("stroke", "#49bed7")
	      .attr("d", valueline5)
	      .attr("data-legend", "SuperPrime");


	   var totalLength = [subprime.node().getTotalLength(), nearprime.node().getTotalLength(), prime.node().getTotalLength(),
	   					   primeplus.node().getTotalLength(), superprime.node().getTotalLength()];


	   subprime.attr("stroke-dasharray", totalLength[0] + " " + totalLength[0]) 
      	.attr("stroke-dashoffset", totalLength[0])
      	.transition()
        	.duration(2000)
        	.attr("stroke-dashoffset", 0);

       nearprime.attr("stroke-dasharray", totalLength[1] + " " + totalLength[1])
      	.attr("stroke-dashoffset", totalLength[1])
      	.transition()
        	.duration(2000)
        	.attr("stroke-dashoffset", 0);

       prime.attr("stroke-dasharray", totalLength[2]+ " " + totalLength[2]) 
      	.attr("stroke-dashoffset", totalLength[2])
      	.transition()
        	.duration(2000)
        	.attr("stroke-dashoffset", 0);

       primeplus.attr("stroke-dasharray", totalLength[3] + " " + totalLength[3]) 
      	.attr("stroke-dashoffset", totalLength[3])
      	.transition()
        	.duration(2000)
        	.attr("stroke-dashoffset", 0);

       superprime.attr("stroke-dasharray", totalLength[4] + " " + totalLength[4]) 
      	.attr("stroke-dashoffset", totalLength[4])
      	.transition()
        	.duration(2000)
        	.attr("stroke-dashoffset", 0);

});

function updateDimensions(contWidth) {

      //Declare margins and height of svg container
      lineMargin = {top: 20, right: 50, bottom: 70, left: 75},
      lineWidth = contWidth - lineMargin.left - lineMargin.right,
      lineHeight = 500 - lineMargin.top - lineMargin.bottom;

}

$(document).ready(function() {

	//linechart legend events
	$('.linechart1-legend .legend-item').on("click", function() {

		//change respective box
		$(this).toggleClass("unchecked");

		//hide respective line
		var thisId = $(this).attr('id');
    	$('#'+ thisId + '-line').toggleClass("hidden");

	})

})