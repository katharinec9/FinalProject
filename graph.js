var getCountry = function(country)
    {return (country.name)}

var DataPromise = d3.json("Data.json");
    DataPromise.then (function(country){
            console.log("worked", country); 
        var getSVG =
            d3.select("#vaccinegraph");
        intGraph(getSVG, country);
                                      },
                      function(err){
                    console.log("failed:", err);
    })
var intGraph = function(target, countrys)
{
    var screen = {width:600, height:600}
    
    var margins = {top:60,bottom:50,left:70,right: 60}
var graph =
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    d3.select(target)
        target.attr("width", screen.width)
        target.attr("height", screen.height)
    var g = 
        target.append("g")
        .classed("graph", true)
        .attr("transform", "translate("+margins.left+","+margins.top+")")
    var highY = 2017
    var lowY = 1990
     var xScale = d3.scaleLinear()
        .domain([lowY, highY])
        .range([0,graph.width])
    var highD = 0.2;
    var yScaleL = d3.scaleLinear()
        .domain([0,highD])
        .range([graph.height,0])
    var highV = 100
    var yScaleR = d3.scaleLinear()
        .domain([0,highV])
        .range([graph.height,0])

    
    createLabels(screen,margins,graph,target);
    createAxes(screen,margins,graph,target,xScale,yScaleL,yScaleR)
    drawLines(countrys,graph,target,xScale,yScaleL,yScaleR,yearscale)
   
    
}

    var yearscale = d3.scaleOrdinal(d3.schemeCategory10)
    var createLabels = function(screen, margins, graph, target)

    
{
   var labels = 
        target.append("g")
        .classed("labels", true)
   
   labels.append("text")
        .text("Vaccine Preventable Deaths vs Child Vaccination Rate")
        .classed("title", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left+(graph.width/2))
        .attr("y",margins.top-2)
    labels.append("text")
        .text("Year")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left+(graph.width/2))
        .attr("y",screen.height-5)
    labels.append("g")
        .attr("transform", "translate(20,"+(margins.top+(graph.height/2))+")")
        .append("text")
        .text("% of population that died from vaccine preventable diseases")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(270)")
         labels.append("g")
        .attr("transform", "translate(600,"+(margins.top+ (graph.height/2))+")")
        .append("text")
        .text("% of children vaccinated (DTP1)")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(270)")
    
    
}
 
 var createAxes = function(screen,margins,graph,target,xScale,yScaleL, yScaleR)
 {
   var xAxis = d3.axisBottom(xScale)
   .tickFormat(d3.format("d"))
   
   var yAxisL = d3.axisLeft(yScaleL)
  var yAxisR = d3.axisRight(yScaleR)

   var axes = 
        target.append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
      .style("font", "13px times")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .style("font", "14px times")
        .call(yAxisL)
      .attr("class", "axisBlue")
    axes.append("g")
        .attr("transform","translate(" +(screen.width - margins.right) + "," + (margins.top) + ")")
      .attr("class", "axisRed")
      .style("font", "14px times")
        .call(yAxisR)
       
          
       
 } 
 
var drawLines = function(countrys,graph,target,xScale,yScaleL,yScaleR, yearScale)
 {
     var lineGenerator1 = d3.line()
        .x(function(box){return xScale(box.year)})
        .y(function(box){return yScaleL(box.pdeaths)})
        .curve(d3.curveCardinal)
     
     var lineGenerator2 = d3.line()
        .x(function(box){return xScale(box.year)})
        .y(function(box){return yScaleR(box.pvaccinated)})
        .curve(d3.curveCardinal)
     
     
     var mycolor = d3.scaleOrdinal()
     .domain(["Senegal", "Bolivia", "United States", "Mexico", "Cambodia"])
     .range(d3.schemeSet1)
     
     var lines = 
        target.select(".graph")
        .selectAll("g")
        .data(countrys)
        .enter()
        .append("g")
        .classed("line", true)
        .attr("fill","none")
        .style ("stroke", function (d){return mycolor(d.name)}) 
              

        .attr("stroke-width",4)
        .on("mouseover",function(country)
        
            {
            d3.selectAll(".line")
            .classed("fade",true);
            
            d3.select(this)
                .classed("fade",false)
                .raise(); //move to top
            
            var xPosition = d3.event.pageX;
            var yPosition = d3.event.pageY
             d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .text(getCountry(country))
            d3.select("#tooltip").classed("hidden", false)
     
            }
        )
        .on("mouseout",function(countrys)
           {  
            if(! d3.select(this).classed("off"))
            {
            d3.selectAll(".line")
                .classed("fade",false);
             d3.select("#tooltip").classed("hidden", true)
                
            }
            
        }) 
            
        lines.append("path")
        .datum(function(country)
        {return country.yeardata})
        .attr("d",lineGenerator1)
         
     
     lines.append("path")
        .datum(function(country)
        {return country.yeardata})
        .attr("d",lineGenerator2)
         .style("stroke-dasharray", ("3, 3"))
     
        }
        var xLabel=540
        var size=20
        var allgroups= ["Senegal", "Mexico", "Bolivia", "United States", "Cambodia"]
        svg.selectAll("mylabels")
        .data(allgroups)
        .enter()
        .append("text")
        .attr("x", 590+size*.8)
        .attr("y", function(d, i){return i *(size + 5) + (size/2)})
        .style("alignment-baseline", "middle")
      


