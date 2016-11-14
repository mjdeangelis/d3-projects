var BarChart = (function(window,d3) { 


    var barChart, barContainerHeight, barContainerWidth, barContainerMargin, barMargin, barWidth, barHeight, dollar, percentage,
        barX, barY, barXAxis, barYAxis, barTooltip, bars, barColors, barY0;

    //Formats
    // var dollar = d3.format("($,");
    percentage = d3.format(".01%");

    // d3.csv("data/bar-data.csv", function(error, data) {
    d3.csv("data/bar-data.csv", init);

    function init(data) {

      //initialize hidden tooltip
      barTooltip = d3.select("#barchart").append("div")
          .attr("class", "tooltip")
          .style("display", "none");

      //find width of chart container and update dimensions
      barContainerWidth = $("#barchart-container").width();
      updateDimensions(barContainerWidth);

      //initialize chart svg
      barChart = d3.select("#barchart").append("svg")
          .attr("width", barWidth + barMargin.left + barMargin.right)
          .attr("height", barHeight + barMargin.top + barMargin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + barMargin.left + "," + barMargin.top + ")");

      //initialize scales
      barX = d3.scaleBand()
            .rangeRound([0, barWidth], .05)
            .round(true).padding(.1);
      barY = d3.scaleLinear()
              .range([barHeight, 0]).nice();

      //initialize X axis
      barXAxis = d3.axisBottom()
        .scale(barX);
      
      //initialize Y axis
      barYAxis = d3.axisLeft()
        .scale(barY)
        .tickFormat(percentage)
        .ticks(5);

        data.forEach(function(d) {
            d.year = d.year;
            d.value = d.value;
        });

          barColors = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range(['#00a6ca', '#006685']);
        	
          //set up domains
          barX.domain(data.map(function(d) { return d.year; }));
          //set up y area to allow negative values
          barY0 = Math.max(Math.abs(d3.min(data, function(d) { return d.value; })), Math.abs(d3.max(data, function(d) { return d.value; })));
          barY.domain([-barY0/10, barY0*1.1]);

          //draw x axis
          barChart.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + barHeight + ")")
              .call(barXAxis)
            .selectAll("text")
              .attr("class", "x-label")
              .style("text-anchor", "end")
        	  .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)"); 
			  

          //draw y axis
          barChart.append("g")
              .attr("class", "y axis")
              .call(barYAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .attr("class", "y-label")
              .text("Value ($)")
            .selectAll("text");

          //draw y axis label
          barChart.append("text")
              .attr("class", "y-label")
              .attr("text-anchor", "end")
              .attr("y", 6)
              .attr("dy", ".75em")
              .attr("transform", "rotate(-90)")
              .text("yoy growth");

         //draw y grid
          barChart.append("g")         
              .attr("class", "y-grid grid")
              .attr("id", "bar-y-grid")
              // .attr("transform", "translate(" + (barMargin.left) + ",0)")
              .call(
                barYAxis
                  .tickSize(-barWidth, 0, 0)
                  .tickFormat("")
              );

          bars = barChart.selectAll("bar")
              .data(data)
              .enter().append("rect")
              // .style("fill", barColors)
              // .attr("class", "bar")
              .attr("class", function(d) { return d.value < 0 ? "bar negative" : "bar positive"; })
              .attr("x", function(d) { return barX(d.year); })
              .attr("width", barX.bandwidth())
              // .attr("y", barHeight)
              // .attr("y", function(d) { return  d.value < 0 ? barY(Math.max(0, d.value)) : barY(d.value); })
              .attr("y", function(d) { return d.value < 0 ? barY(Math.max(0, d.value)) : barY(Math.min(0, d.value)); })
              .attr("height", 0);
              // .attr("height", function(d) { return Math.abs(barY(d.value) - barY(0)); })

          //Bar Tooltip Events
          bars.on("mouseover", function(d) {
                  barTooltip.transition()
                    // .style("opacity", 0.9)
                    .style("display", "inline");
              })

              .on("mousemove", function(d) {
                  // barTooltip.html("<strong>Q2 "+d.year+"</strong><br>"+percentage(d.value))
                  barTooltip.html("<strong>Q2 "+d.year+"</strong><br>"+percentage(d.value))
                  // barTooltip.html(d3.event.pageX + ", " + d3.event.pageY)
                    .style("left", (d3.event.pageX - barContainerMargin)+"px")
                    .style("top", (d3.event.pageY - 300) + "px") //300 is a hardcoded value here - might present issues
              })

              .on("mouseout", function(d) {
                  barTooltip.style("display", "none");
              })

              .on("mouseleave", function(d) {
                  barTooltip.style("display", "none");
              });

          //Bar Transitions
          bars.transition()
            // have different Y position depending if bar is negative or positive
            .attr("y", function(d) { return d.value < 0 ? barY(Math.max(0, d.value)) : barY(d.value); })
            .attr("height", function(d) { return Math.abs(barY(d.value) - barY(0)); })
            .duration(2500)
            .delay(function(d, i) {
              return i * 250;
            })
            .ease(d3.easeElasticOut);

        //render the chart
        render();

    } //end init

    function render() {

      //find width of chart container and update dimensions
      barContainerWidth = $("#barchart-container").width();
      updateDimensions(barContainerWidth);

    }

    function updateDimensions(contWidth) {

      //Find height and width of chart container before doing anything
      // barContainerHeight = $("#barchart-container").height(),
      // barContainerWidth = $("#barchart-container").width(),
      barContainerMargin = $("#barchart-container").offset().left;

      //Declare margins and height of svg container
      barMargin = {top: 20, right: 20, bottom: 70, left: 75},
      barWidth = barContainerWidth - barMargin.left - barMargin.right,
      barHeight = 500 - barMargin.top - barMargin.bottom;

  }

})(window,d3);