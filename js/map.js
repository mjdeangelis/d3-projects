$(document).ready(function() {

    //variable to keep track of current map
    var currentMap;

    $(".visualization-map").arrive("div.google-visualization-tooltip", function() {
        var yoyPercentage = $(".google-visualization-tooltip-item:last-child span:last-child").html();
        var yoyValue = parseFloat(yoyPercentage);

        /**
        **Checks if tooltip number is positive/negative and applies appropriate class
        */
        if (yoyValue < 0) {
            $(".google-visualization-tooltip-item:last-child span:last-child").addClass("negative");
        }
        else if (yoyValue > 0) {
            $(".google-visualization-tooltip-item:last-child span:last-child").addClass("positive");
        }

    });


    function drawMortgageDelMap() {

        /**
        **Mortgage Delinquency Data
        */
        var mortgageDelData = google.visualization.arrayToDataTable([ ['State', 'Delinquency', 'YoY Change'], ["Alaska",1.38,-0.2], ["Alabama",2.45,-5.9], ["Arkansas",2.23,-9.5], ["Arizona",1.73,-6.6], ["California",1.44,-11.3], ["Colorado",1.06,-6.0], ["Connecticut",3.12,-4.7], ["District Of Columbia",2.98,-4.6], ["Delaware",3.62,-6.5], ["Florida",3.12,-21.7], ["Georgia",2.50,-8.4], ["Hawaii",2.11,-8.7], ["Iowa",1.54,-5.6], ["Idaho",1.47,-11.2], ["Illinois",2.42,-8.9], ["Indiana",2.15,-4.0], ["Kansas",1.63,-2.5], ["Kentucky",2.21,-7.6], ["Louisiana",3.18,3.5], ["Massachusetts",2.23,-9.1], ["Maryland",2.91,-10.0], ["Maine",2.92,-8.6], ["Michigan",1.54,-8.2], ["Minnesota",1.18,-7.9], ["Missouri",1.77,-5.9], ["Mississippi",3.42,-1.6], ["Montana",1.38,-4.1], ["North Carolina",2.49,-7.5], ["North Dakota",1.11,12.2], ["Nebraska",1.19,-7.0], ["New Hampshire",1.64,-4.5], ["New Jersey",4.22,-15.1], ["New Mexico",2.92,-5.0], ["Nevada",2.73,-20.0], ["New York",3.51,-11.6], ["Ohio",2.25,-4.7], ["Oklahoma",2.58,4.8], ["Oregon",1.56,-20.5], ["Pennsylvania",2.75,-3.9], ["Rhode Island",2.50,-13.5], ["South Carolina",2.99,-6.7], ["South Dakota",1.28,2.3], ["Tennessee",2.12,-6.6], ["Texas",2.32,4.1], ["Utah",1.38,-9.7], ["Virginia",1.78,-4.6], ["Vermont",1.92,-7.0], ["Washington",1.51,-18.8], ["Wisconsin",1.34,-7.8], ["West Virginia",2.69,3.9], ["Wyoming",1.67,18.0] ]);
        
        /**
        **Mortgage Map Options
        */
        var mortgageOptions = {
        region: 'US',
        colorAxis: {colors: ['#99dbea', '#00a6ca', '#005365']},
        backgroundColor: '#fff',
        datalessRegionColor: '#f8bbd0',
        defaultColor: '#f5f5f5',
        resolution: "provinces",
        keepAspectRatio: true,
        chartArea:{left:0,top:0,width:"100%",height:"100%"},
        width:100+"%",
        tooltip: {isHtml: true, /*trigger: 'selection',*/ showColorCode: true, textStyle: {fontName: "IntroRegular"} },
    	legend: {textStyle: {fontName: "IntroRegular"}, numberFormat: "#.##'%" }
        };

        var perFormatter = new google.visualization.NumberFormat( {suffix: '%' });
        var yoyFormatter = new google.visualization.NumberFormat( {suffix: '%', fractionDigits: 1 });

        //iniate chart in DOM    
        var mortgageDelMap = new google.visualization.GeoChart(document.getElementById('mortgageMap'));

        //draw default chart
        perFormatter.format(mortgageDelData, 1);
        yoyFormatter.format(mortgageDelData, 2);
        mortgageDelMap.draw(mortgageDelData, mortgageOptions);

        currentMap = "mortgage";

    }

    function drawMortgageBalMap() {

        /**
        **Mortgage Avg Balance Data
        */
        var mortgageBalData = google.visualization.arrayToDataTable([ ['State','Average Balance', 'YoY Change'], ["Alaska",217783,1.7], ["Alabama",136224,1.5], ["Arkansas",121296,1.8], ["Arizona",193750,1.3], ["California",336653,2.0], ["Colorado",232991,3.4], ["Connecticut",228542,0.7], ["District Of Columbia",387340,3.1], ["Delaware",188815,1.0], ["Florida",177742,2.3], ["Georgia",166563,2.2], ["Hawaii",333383,2.5], ["Iowa",125886,1.7], ["Idaho",158738,2.1], ["Illinois",173701,0.5], ["Indiana",120509,1.5], ["Kansas",146786,11.1], ["Kentucky",123822,1.7], ["Louisiana",140914,3.1], ["Massachusetts",244417,2.0], ["Maryland",253060,1.1], ["Maine",138723,1.6], ["Michigan",129499,0.8], ["Minnesota",175026,2.9], ["Missouri",136537,1.5], ["Mississippi",119029,6.3], ["Montana",169769,2.6], ["North Carolina",161327,2.2], ["North Dakota",151522,4.7], ["Nebraska",146505,14.0], ["New Hampshire",177619,1.0], ["New Jersey",237274,0.6], ["New Mexico",158532,0.7], ["Nevada",210644,2.0], ["New York",228409,3.0], ["Ohio",125849,0.9], ["Oklahoma",127077,2.8], ["Oregon",210421,2.7], ["Pennsylvania",148484,1.0], ["Rhode Island",185157,0.1], ["South Carolina",153934,2.6], ["South Dakota",147886,3.4], ["Tennessee",146111,3.5], ["Texas",158437,4.8], ["Utah",197649,2.8], ["Virginia",239676,1.2], ["Vermont",148388,1.0], ["Washington",240940,2.5], ["Wisconsin",139483,0.6], ["West Virginia",109533,2.6], ["Wyoming",178509,2.3] ]);
        
        /**
        **Mortgage Map Options
        */
        var mortgageOptions = {
            region: 'US',
            colorAxis: {colors: ['#ddedc0', '#a9d161', '#556931']},
            backgroundColor: '#fff',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
            resolution: "provinces",
            keepAspectRatio: true,
            chartArea:{left:0,top:0,width:"100%",height:"100%"},
            width:100+"%",
            tooltip: {isHtml: true, /*trigger: 'selection',*/ showColorCode: true, textStyle: {fontName: "IntroRegular"} },
        	legend: {textStyle: {fontName: "IntroRegular"}, numberFormat: "$#,##0" }//###','###
        };

        var dolFormatter = new google.visualization.NumberFormat( {prefix: '$', fractionDigits: 0 });
        var yoyFormatter = new google.visualization.NumberFormat( {suffix: '%', fractionDigits: 1 });

        //iniate chart in DOM    
        var mortgageBalMap = new google.visualization.GeoChart(document.getElementById('mortgageMap2'));

        dolFormatter.format(mortgageBalData, 1);
        yoyFormatter.format(mortgageBalData, 2);
        mortgageBalMap.draw(mortgageBalData, mortgageOptions);

        currentMap = "mortgage";

    }

    function drawAutoDelMap() {

        /**
        **Auto Delinquency Data
        */
        var autoDelData = google.visualization.arrayToDataTable([['State', 'Delinquency', 'YoY Change'], ["Alaska",1.10,19.7], ["Alabama",2.09,8.9], ["Arkansas",1.75,15.5], ["Arizona",1.34,2.9], ["California",0.96,9.2], ["Colorado",1.03,8.9], ["Connecticut",1.02,11.5], ["District Of Columbia",2.04,12.4], ["Delaware",1.68,19.2], ["Florida",1.27,12.0], ["Georgia",2.00,19.2], ["Hawaii",0.91,15.1], ["Iowa",0.92,11.8], ["Idaho",0.85,13.7], ["Illinois",1.28,13.0], ["Indiana",1.38,4.4], ["Kansas",1.15,12.0], ["Kentucky",1.66,12.2], ["Louisiana",2.83,19.1], ["Massachusetts",0.84,6.8], ["Maryland",1.41,18.5], ["Maine",0.81,8.7], ["Michigan",1.31,5.5], ["Minnesota",0.71,13.5], ["Missouri",1.55,19.1], ["Mississippi",2.65,6.6], ["Montana",1.01,22.9], ["North Carolina",1.53,14.0], ["North Dakota",0.95,35.9], ["Nebraska",1.02,16.0], ["New Hampshire",0.77,6.4], ["New Jersey",1.00,11.7], ["New Mexico",1.94,9.1], ["Nevada",1.37,17.2], ["New York",1.02,12.1], ["Ohio",1.28,11.7], ["Oklahoma",1.98,15.8], ["Oregon",0.63,19.2], ["Pennsylvania",1.04,12.3], ["Rhode Island",0.96,18.1], ["South Carolina",1.82,15.4], ["South Dakota",1.07,20.1], ["Tennessee",1.44,7.7], ["Texas",1.86,21.4], ["Utah",0.79,5.9], ["Virginia",1.12,11.5], ["Vermont",0.89,11.6], ["Washington",0.67,10.7], ["Wisconsin",1.03,10.9], ["West Virginia",1.66,16.6], ["Wyoming",1.28,14.8] ]);
        
        /**
        **Auto Delinquency Options
        */
        var autoOptions = {
            region: 'US',
            colorAxis: {colors: ['#99dbea', '#00a6ca', '#005365']},
            backgroundColor: '#fff',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
            resolution: "provinces",
            keepAspectRatio: true,
            width:100 + "%",
            tooltip: {isHtml: true, showColorCode: true, textStyle: {fontName: "IntroRegular"} },
    		legend: {textStyle: {fontName: "IntroRegular"}, numberFormat: "#.##'%" }
        };

        var perFormatter = new google.visualization.NumberFormat( {suffix: '%' });
        var yoyFormatter = new google.visualization.NumberFormat( {suffix: '%', fractionDigits: 1 });

        var autoDelMap = new google.visualization.GeoChart(document.getElementById('autoMap'));

        perFormatter.format(autoDelData, 1);
        yoyFormatter.format(autoDelData, 2);
        autoDelMap.draw(autoDelData, autoOptions);

        currentMap = "auto";

    }

    function drawAutoBalMap() {

        /**
        **Auto Avg Balance Data
        */
        var autoBalData = google.visualization.arrayToDataTable([['State', 'Average Balance', 'YoY Change'], ["Alaska",22155,1.7], ["Alabama",19639,3.0], ["Arkansas",21866,3.7], ["Arizona",20367,2.6], ["California",18480,2.5], ["Colorado",19198,2.2], ["Connecticut",15581,1.4], ["District Of Columbia",17010,1.7], ["Delaware",17743,2.4], ["Florida",18677,2.7], ["Georgia",20289,3.8], ["Hawaii",18888,3.8], ["Iowa",17806,2.7], ["Idaho",18623,4.2], ["Illinois",17788,1.8], ["Indiana",16628,2.9], ["Kansas",18529,2.0], ["Kentucky",17432,3.5], ["Louisiana",22043,2.1], ["Massachusetts",15207,1.8], ["Maryland",19084,2.5], ["Maine",15749,2.8], ["Michigan",13824,1.1], ["Minnesota",16163,2.4], ["Missouri",17819,3.0], ["Mississippi",20290,3.3], ["Montana",18849,1.6], ["North Carolina",18962,2.3], ["North Dakota",19495,-0.9], ["Nebraska",17155,1.8], ["New Hampshire",16191,2.4], ["New Jersey",15610,0.9], ["New Mexico",22481,2.7], ["Nevada",20167,2.4], ["New York",15587,0.8], ["Ohio",15728,2.0], ["Oklahoma",21565,1.7], ["Oregon",17282,3.3], ["Pennsylvania",16268,1.6], ["Rhode Island",14407,2.0], ["South Carolina",18344,3.6], ["South Dakota",18025,2.4], ["Tennessee",19050,3.5], ["Texas",23391,2.1], ["Utah",18200,2.4], ["Virginia",18491,2.0], ["Vermont",16094,1.0], ["Washington",18830,3.2], ["Wisconsin",15692,2.2], ["West Virginia",19906,1.3], ["Wyoming",22827,0.6] ]);
        
        /**
        **Auto Avg Balance Options
        */
        var autoOptions = {
            region: 'US',
            colorAxis: {colors: ['#ddedc0', '#a9d161', '#556931']},
            backgroundColor: '#fff',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
            resolution: "provinces",
            keepAspectRatio: true,
            width:100 + "%",
            tooltip: {isHtml: true, showColorCode: true, textStyle: {fontName: "IntroRegular"} },
    		legend: {textStyle: {fontName: "IntroRegular"}, numberFormat: "$#,##0" }
        };

        var dolFormatter = new google.visualization.NumberFormat( {prefix: '$', fractionDigits: 0 });
        var yoyFormatter = new google.visualization.NumberFormat( {suffix: '%', fractionDigits: 1 });

        var autoBalMap = new google.visualization.GeoChart(document.getElementById('autoMap2'));

        dolFormatter.format(autoBalData, 1);
        yoyFormatter.format(autoBalData, 2);
        autoBalMap.draw(autoBalData, autoOptions);

        currentMap = "auto";

    }

    function drawCreditDelMap() {

        /**
        **Credit Delinquency Data
        */
        var creditDelData = google.visualization.arrayToDataTable([['State', 'Delinquency', 'YoY Change'], ["Alaska",1.47,7.6], ["Alabama",1.87,0.9], ["Arkansas",2.05,9.0], ["Arizona",1.76,18.6], ["California",1.35,2.3], ["Colorado",1.18,8.5], ["Connecticut",1.39,6.2], ["District Of Columbia",1.68,7.7], ["Delaware",1.64,6.0], ["Florida",1.79,7.6], ["Georgia",2.01,3.5], ["Hawaii",1.17,3.6], ["Iowa",1.15,4.9], ["Idaho",1.16,5.2], ["Illinois",1.38,9.8], ["Indiana",1.53,6.0], ["Kansas",1.25,7.0], ["Kentucky",1.70,7.1], ["Louisiana",2.18,11.0], ["Massachusetts",1.28,4.5], ["Maryland",1.70,8.4], ["Maine",1.25,2.1], ["Michigan",1.40,6.2], ["Minnesota",1.02,4.5], ["Missouri",1.44,7.0], ["Mississippi",2.54,10.1], ["Montana",1.08,8.2], ["North Carolina",1.73,4.7], ["North Dakota",1.14,22.9], ["Nebraska",1.16,6.4], ["New Hampshire",1.20,2.6], ["New Jersey",1.46,4.1], ["New Mexico",1.65,7.7], ["Nevada",1.86,6.2], ["New York",1.65,9.1], ["Ohio",1.56,6.7], ["Oklahoma",1.87,12.3], ["Oregon",1.08,3.8], ["Pennsylvania",1.50,7.9], ["Rhode Island",1.51,9.0], ["South Carolina",1.77,6.1], ["South Dakota",1.12,10.5], ["Tennessee",1.74,6.2], ["Texas",1.82,10.5], ["Utah",1.02,4.6], ["Virginia",1.47,4.6], ["Vermont",1.10,3.3], ["Washington",0.99,2.3], ["Wisconsin",0.95,13.3], ["West Virginia",1.99,15.5], ["Wyoming",1.35,19.9] ]);
         /**
        **Credit Delinquency Options
        */
        var creditOptions = {
            region: 'US',
            colorAxis: {colors: ['#99dbea', '#00a6ca', '#005365']},
            backgroundColor: '#fff',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
            resolution: "provinces",
            keepAspectRatio: true,
            width:100 + "%",
            tooltip: {isHtml: true, showColorCode: true, textStyle: {fontName: "IntroRegular"} },
    		legend: {textStyle: {fontName: "IntroRegular"}, numberFormat: "#.##'%" }
        };

        var perFormatter = new google.visualization.NumberFormat( {suffix: '%' });
        var yoyFormatter = new google.visualization.NumberFormat( {suffix: '%', fractionDigits: 1 });

        var creditDelMap = new google.visualization.GeoChart(document.getElementById('creditMap'));

        perFormatter.format(creditDelData, 1);
        yoyFormatter.format(creditDelData, 2);
        creditDelMap.draw(creditDelData, creditOptions);

        currentMap = "credit";

    }

    function drawCreditBalMap() {

        /**
        **Credit Avg Balance Data
        */
        var creditBalData = google.visualization.arrayToDataTable([['State', 'Average Balance', 'YoY Change'], ["Alaska",6910,1.7], ["Alabama",5112,2.0], ["Arkansas",4850,2.5], ["Arizona",5397,2.7], ["California",5355,1.8], ["Colorado",5618,1.0], ["Connecticut",5965,1.3], ["District Of Columbia",5953,2.2], ["Delaware",5466,0.6], ["Florida",5316,2.2], ["Georgia",5585,1.9], ["Hawaii",5734,2.5], ["Iowa",4386,2.9], ["Idaho",4931,2.0], ["Illinois",5366,1.9], ["Indiana",4819,1.3], ["Kansas",5099,2.4], ["Kentucky",4792,0.8], ["Louisiana",5036,3.6], ["Massachusetts",5258,0.6], ["Maryland",6022,2.1], ["Maine",5004,0.3], ["Michigan",4798,1.2], ["Minnesota",4930,1.8], ["Missouri",4984,1.4], ["Mississippi",4565,1.2], ["Montana",4937,3.0], ["North Carolina",5251,1.6], ["North Dakota",4607,4.7], ["Nebraska",4697,2.8], ["New Hampshire",5473,0.5], ["New Jersey",5923,1.4], ["New Mexico",5357,1.7], ["Nevada",5356,3.1], ["New York",5529,1.4], ["Ohio",4990,1.0], ["Oklahoma",5310,3.2], ["Oregon",5039,0.9], ["Pennsylvania",5154,1.9], ["Rhode Island",5351,1.3], ["South Carolina",5236,1.5], ["South Dakota",4796,3.6], ["Tennessee",5030,1.6], ["Texas",5634,2.9], ["Utah",5012,2.3], ["Virginia",6122,1.9], ["Vermont",5015,1.3], ["Washington",5636,0.9], ["Wisconsin",4571,1.2], ["West Virginia",4807,2.6], ["Wyoming",5292,3.2] ]);
        
        /**
        **Credit Avg Balance Options
        */
        var creditOptions = {
            region: 'US',
            colorAxis: {colors: ['#ddedc0', '#a9d161', '#556931']},
            backgroundColor: '#fff',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
            resolution: "provinces",
            keepAspectRatio: true,
            width:100 + "%",
            tooltip: {isHtml: true, showColorCode: true, textStyle: {fontName: "IntroRegular"} },
    		legend: {textStyle: {fontName: "IntroRegular"}, numberFormat: "$#,##0" }
        };

        var dolFormatter = new google.visualization.NumberFormat( {prefix: '$', fractionDigits: 0 });
        var yoyFormatter = new google.visualization.NumberFormat( {suffix: '%', fractionDigits: 1 });

        var creditBalMap = new google.visualization.GeoChart(document.getElementById('creditMap2'));

        dolFormatter.format(creditBalData, 1);
        yoyFormatter.format(creditBalData, 2);
        creditBalMap.draw(creditBalData, creditOptions);

        currentMap = "credit";

    }

    function drawLoansDelMap() {

        /**
        **Loans Del Data
        */
        var loansDelData = google.visualization.arrayToDataTable([['State', 'Average Balance', 'YoY Change'], ["Alaska",8097 ,3.6], ["Alabama",6193 ,39.7], ["Arkansas",6730 ,32.1], ["Arizona",8611 ,-0.2], ["California",7832 ,10.7], ["Colorado",9075 ,-8.3], ["Connecticut",10119 ,-14.8], ["District Of Columbia",10281 ,-14.8], ["Delaware",8523 ,-2.3], ["Florida",8725 ,-1.7], ["Georgia",7921 ,7.6], ["Hawaii",11417 ,-25.0], ["Iowa",6990 ,21.4], ["Idaho",7066 ,19.8], ["Illinois",7522 ,15.8], ["Indiana",8268 ,4.9], ["Kansas",7608 ,4.1], ["Kentucky",8272 ,0.5], ["Louisiana",6593 ,26.8], ["Massachusetts",8890 ,-1.0], ["Maryland",9902 ,-12.1], ["Maine",6013 ,47.6], ["Michigan",7043 ,22.1], ["Minnesota",8925 ,-5.1], ["Missouri",6128 ,48.6], ["Mississippi",5519 ,38.4], ["Montana",10609 ,-18.0], ["North Carolina",8686 ,-2.8], ["North Dakota",8823 ,-8.2], ["Nebraska",8588 ,-4.0], ["New Hampshire",8875 ,0.0], ["New Jersey",10863 ,-19.9], ["New Mexico",5530 ,55.0], ["Nevada",6794 ,26.1], ["New York",8919 ,-3.0], ["Ohio",8090 ,6.6], ["Oklahoma",6692 ,49.6], ["Oregon",7850 ,7.4], ["Pennsylvania",8552 ,-1.1], ["Rhode Island",8288 ,3.0], ["South Carolina",7473 ,9.0], ["South Dakota",7764 ,11.6], ["Tennessee",6377 ,39.0], ["Texas",6154 ,43.3], ["Utah",6868 ,26.6], ["Virginia",9523 ,-7.3], ["Vermont",9315 ,-8.0], ["Washington",8553 ,0.1], ["Wisconsin",6358 ,34.3], ["West Virginia",7329 ,15.1], ["Wyoming",9005 ,-5.8] ]);
        
        /**
        **Loans Del Options
        */
        var loansOptions = {
            region: 'US',
            colorAxis: {colors: ['#99dbea', '#00a6ca', '#005365']},
            backgroundColor: '#fff',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
            resolution: "provinces",
            keepAspectRatio: true,
            width:100 + "%",
            tooltip: {isHtml: true, showColorCode: true, textStyle: {fontName: "IntroRegular"} },
    		legend: {textStyle: {fontName: "IntroRegular"}, numberFormat: "#.##'%" }
            };

        var perFormatter = new google.visualization.NumberFormat( {suffix: '%' });
        var yoyFormatter = new google.visualization.NumberFormat( {suffix: '%', fractionDigits: 1 });

        var loansDelMap = new google.visualization.GeoChart(document.getElementById('loansMap'));

        perFormatter.format(loansDelData, 1);
        yoyFormatter.format(loansDelData, 2);
        loansDelMap.draw(loansDelData, loansOptions);

        currentMap = "loans";

    }

    function drawLoansBalMap() {

        /**
        **Loans Avg Balance Data
        */
        var loansBalData = google.visualization.arrayToDataTable([['State', 'Average Balance', 'YoY Change'], ["Alaska",2.67,12.7], ["Alabama",4.03,-4.0], ["Arkansas",2.58,-3.4], ["Arizona",3.70,10.4], ["California",3.16,29.9], ["Colorado",2.38,2.5], ["Connecticut",1.84,1.5], ["District Of Columbia",2.19,5.6], ["Delaware",2.19,-8.2], ["Florida",2.45,-0.4], ["Georgia",4.07,11.1], ["Hawaii",1.39,5.5], ["Iowa",2.56,2.9], ["Idaho",4.17,-11.7], ["Illinois",4.17,1.4], ["Indiana",1.95,0.1], ["Kansas",2.65,2.3], ["Kentucky",2.88,-5.6], ["Louisiana",4.22,3.7], ["Massachusetts",1.76,-5.1], ["Maryland",2.15,9.6], ["Maine",1.51,0.6], ["Michigan",2.26,5.8], ["Minnesota",3.28,6.2], ["Missouri",5.42,-15.8], ["Mississippi",2.98,2.2], ["Montana",1.48,13.6], ["North Carolina",2.82,4.5], ["North Dakota",3.23,-1.0], ["Nebraska",2.25,-15.4], ["New Hampshire",1.51,-13.5], ["New Jersey",2.08,2.7], ["New Mexico",6.90,2.6], ["Nevada",4.03,7.0], ["New York",2.28,7.9], ["Ohio",2.56,-3.6], ["Oklahoma",7.46,-0.5], ["Oregon",2.51,10.2], ["Pennsylvania",1.97,0.8], ["Rhode Island",1.86,9.6], ["South Carolina",3.05,8.4], ["South Dakota",3.15,-4.1], ["Tennessee",4.73,0.3], ["Texas",6.01,1.7], ["Utah",3.53,-4.8], ["Virginia",2.64,-14.0], ["Vermont",1.64,-24.5], ["Washington",2.54,-1.7], ["Wisconsin",3.42,-6.5], ["West Virginia",2.13,6.6], ["Wyoming",2.10,15.6] ]);

        var loansOptions = {
            region: 'US',
            colorAxis: {colors: ['#ddedc0', '#a9d161', '#556931']},
            backgroundColor: '#fff',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
            resolution: "provinces",
            keepAspectRatio: true,
            width:100 + "%",
            tooltip: {isHtml: true, showColorCode: true, textStyle: {fontName: "IntroRegular"} },
    		legend: {textStyle: {fontName: "IntroRegular"}, numberFormat: "$#,##0" }
        };

        var dolFormatter = new google.visualization.NumberFormat( {prefix: '$', fractionDigits: 0 });
        var yoyFormatter = new google.visualization.NumberFormat( {suffix: '%', fractionDigits: 1 });

        var loansBalMap = new google.visualization.GeoChart(document.getElementById('loansMap2'));

        dolFormatter.format(loansBalData, 1);
        yoyFormatter.format(loansBalData, 2);
        loansBalMap.draw(loansBalData, loansOptions);

        currentMap = "loans";

    }


    function drawMap() {

        //iniate charts in DOM    
        var loansBalMap = new google.visualization.GeoChart(document.getElementById('loansBalMap'));

        function createCustomHTMLContent(stateName, avgBal, yoyVal) {
            return  '<div style="padding:5px 5px 5px 5px;">' +
                    '<p class="state-name">' + stateName + '</p>' +
                    '<p class="avg-bal">' + avgBal + '</p>' +
                    '<p class="yoy-val">' + yoyVal + '</p>' +
                    '</div>';
        }

      }; //end drawMap function

    $(document).ready(function() {

      $("#geochart-colors").click(function() {
        var li = $("ul.google-visualization-tooltip-item-list li.google-visualization-tooltip-item:last-child span:last-child").html();
      });

    });

    function initialize() {

        // $("#mortgageMap.visualization-map").css("display", "block");
        // $("#mortgageMap2.visualization-map").css("display", "block");
        // drawMortgageDelMap();
        // drawMortgageBalMap();
        // drawAutoDelMap();
        // drawAutoBalMap();
        // $(".loading").css("display", "none");
            
            var autoClicked = false;
            var creditClicked = false;
            var loansClicked = false;

            //draw default charts after tab is clicked
            $(".nav-tabs li a").click(function() {

                //show loading wheel
                $(".loading").css("display", "block");

                var tabValue = $(this).attr('href');

                if (tabValue === "#mortgage") {
                    $("#mortgageMap.visualization-map").css("display", "block");
                    $("#mortgageMap2.visualization-map").css("display", "block");
                    $(".loading").css("display", "none");

                    //wait for tab to be shown before drawing map
                    $('a[href="#mortgage"]').on('shown.bs.tab', function() {
                        $(".loading").css("display", "none");
                        drawMortgageDelMap();
                        drawMortgageBalMap();
                    })

                }
                else if (tabValue === "#auto") {
                    autoClicked = true;
                    $("#autoMap.visualization-map").css("display", "block");
                    $("#autoMap2.visualization-map").css("display", "block");

                    $('a[href="#auto"]').on('shown.bs.tab', function() {
                        $(".loading").css("display", "none");
                        drawAutoDelMap();
                        drawAutoBalMap();
                    })
                }
                else if (tabValue === "#credit") {
                    creditClicked = true;
                    $("#creditMap.visualization-map").css("display", "block");
                    $("#creditMap2.visualization-map").css("display", "block");

                    $('a[href="#credit"]').on('shown.bs.tab', function() {
                        $(".loading").css("display", "none");
                        drawCreditDelMap();
                        drawCreditBalMap();
                    })
                }
                else if (tabValue === "#loans") {
                    loansClicked = true;
                    $("#loansMap.visualization-map").css("display", "block");
                    $("#loansMap2.visualization-map").css("display", "block");

                    $('a[href="#loans"]').on('shown.bs.tab', function() {
                        $(".loading").css("display", "none");
                        drawLoansDelMap();
                        drawLoansBalMap();
                    })
                }


                
            });


            //draw chart depending on subtab clicked
            $( "a.secondary-nav" ).click(function() {

                var pillValue = $(this).attr('href');
               
                $(this).addClass("active").siblings().removeClass("active");

                switch(pillValue) {
                  case "#mortgage-deliquency":
                    $("#mortgage-title").html("Mortgage - Delinquency Rates").removeClass("avg-bal-title");
                    $("#mortgage-description").html("In Q2 2016, serious mortgage delinquency rates (60+ days delinquent) declined to 2.30%, down more than 18% from 2.82% in Q2 2015.");
                    $("#mortgageMap.visualization-map").css("display", "block");
                    $(".mobile-mortgage-del-container").removeClass("important-hide").siblings(".showMobile").addClass("important-hide");
                    drawMortgageDelMap();
                    break;
                  case "#mortgage-average-bal":
                    $("#mortgage-title").html("Mortgage - Average Balance per Consumer").addClass("avg-bal-title");
                    $("#mortgage-description").html("Average mortgage debt per borrower continued to grow, rising 2.3% in the last year to $192,749. This marked the 5th consecutive quarter of mortgage debt growth and is largely due to the overall increase to the Home Price Index.");
                    $("#mortgageMap.visualization-map").css("display", "block");
                    $(".mobile-mortgage-bal-container").removeClass("important-hide").siblings(".showMobile").addClass("important-hide");
                    drawMortgageBalMap();
                    break;
                  case "#auto-deliquency":
                    $("#auto-title").html("Auto - Delinquency Rates").removeClass("avg-bal-title");
                    $("#auto-description").html("In Q2 2016, the auto delinquency rate (60+ days delinquent) increased to 1.11%, an 11-basis point rise from 1.00% in Q2 2015.");
                    $("#autoMap.visualization-map").css("display", "block");
                    $(".mobile-auto-del-container").removeClass("important-hide").siblings(".showMobile").addClass("important-hide");
                    drawAutoDelMap();
                    break;
                  case "#auto-average-bal":
                    $("#auto-title").html("Auto - Average Balance per Consumer").addClass("avg-bal-title");
                    $("#auto-description").html("In Q2 2016, the average auto balance grew 2.7% and reached $18,177, the highest level since the Recession (Q3 2009). The average balance was up from $17,699 in Q2 2015.");
                    $("#autoMap.visualization-map").css("display", "block");
                    $(".mobile-auto-bal-container").removeClass("important-hide").siblings(".showMobile").addClass("important-hide");
                    drawAutoBalMap();
                    break;
                  case "#credit-deliquency":
                    $("#credit-title").html("Credit Card - Delinquency Rates").removeClass("avg-bal-title");
                    $("#credit-description").html("The serious delinquency rate per borrower (90+ days delinquent) stands at 1.29% as of Q2 2016, up from a 1.20% reading in Q2 2015.");
                    $("#creditMap.visualization-map").css("display", "block");
                    $(".mobile-credit-del-container").removeClass("important-hide").siblings(".showMobile").addClass("important-hide");
                    drawCreditDelMap();
                    break;
                  case "#credit-average-bal":
                    $("#credit-title").html("Credit Card - Average Balance per Consumer").addClass("avg-bal-title");
                    $("#credit-description").html("In Q2 2016, the average credit card debt per borrower reached $5,247, up from $5,197 in Q1 2016.");
                    $("#creditMap.visualization-map").css("display", "block");
                    $(".mobile-credit-bal-container").removeClass("important-hide").siblings(".showMobile").addClass("important-hide");
                    drawCreditBalMap();
                    break;
                  case "#loans-deliquency":
                    $("#loans-title").html("Unsecured Personal Loans - Delinquency Rates").removeClass("margin-l-30").removeClass("avg-bal-title");
                    $("#loans-description").html("The unsecured personal loan delinquency rate (60+ days delinquent) remained steady in Q2 2016 at 3.30%, its lowest post-Recession level and a slight decline from 3.32% in Q2 2015.");
                    $("#loansMap.visualization-map").css("display", "block");
                    $(".mobile-loans-del-container").removeClass("important-hide").siblings(".showMobile").addClass("important-hide");
                    drawLoansDelMap();
                    break;
                  case "#loans-average-bal":
                    $("#loans-title").html("Unsecured Personal Loans - Average Balance per Consumer").addClass("margin-l-30").addClass("avg-bal-title");
                    $("#loans-description").html("Average debt per personal loan borrower rose 9.1% from $7,102 in Q2 2015 to $7,745 in Q2 2016.");
                    $("#loansMap.visualization-map").css("display", "block");
                    $(".mobile-loans-bal-container").removeClass("important-hide").siblings(".showMobile").addClass("important-hide");
                    drawLoansBalMap();
                    break;
                  }   
            });

            //redraw map when window is resized using global variable
            $(window).resize(function redrawMaps() {

                if (currentMap) {
                    switch (currentMap) {
                        case "mortgage":
                            drawMortgageDelMap();
                            drawMortgageBalMap();
                            break;
                        case "auto":
                            drawAutoDelMap();
                            drawAutoBalMap();
                            break;
                        case "credit":
                            drawCreditDelMap();
                            drawCreditBalMap();
                            break;
                        case "loans":
                            drawLoansDelMap();
                            drawLoansBalMap();
                            break;
                    }
                }

            });

        } // end initialize function
      
    //load Google GeoChart API
    google.charts.load('current', {'packages':['geochart']});
    google.charts.setOnLoadCallback(initialize);

}); //end document.ready