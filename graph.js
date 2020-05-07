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
    
    var margins = {top:50,bottom:50,left:70,right: 60}
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
    var highY = 2018
    var lowY = 1990
     var xScale = d3.scaleLinear()
        .domain([lowY, highY])
        .range([0,graph.width])
    var highD = 13700;
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
    createLegend(screen,margins,graph,target,yearscale)
    
}

    var yearscale = d3.scaleOrdinal(d3.schemeCategory10)
    var createLabels = function(screen, margins, graph, target)

    
{
   var labels = 
        target.append("g")
        .classed("labels", true)
   
   labels.append("text")
        .text(" Deaths Caused by Vaccine Preventable Diseases per Year")
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
        .text("# of deaths")
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
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(yAxisL)
      .attr("class", "axisBlue")
    axes.append("g")
        .attr("transform","translate(" +(screen.width - margins.right) + "," + (margins.top) + ")")
      .attr("class", "axisRed")
        .call(yAxisR)
       
          
       
 } 
 
var drawLines = function(countrys,graph,target,xScale,yScaleL,yScaleR, yearScale)
 {
     var lineGenerator1 = d3.line()
        .x(function(box){return xScale(box.year)})
        .y(function(box){return yScaleL(box.deaths)})
        .curve(d3.curveCardinal)
     
     var lineGenerator2 = d3.line()
        .x(function(box){return xScale(box.year)})
        .y(function(box){return yScaleR(box.pvaccinated)})
        .curve(d3.curveCardinal)
     
     var lines = 
        target.select(".graph")
        .selectAll("g")
        .data(countrys)
        .enter()
        .append("g")
        .classed("line", true)
        .attr("fill","none")
        .attr("stroke",function(country)
                {
           
            return subject.country;
            
        })
        .classed("line",true)
        .attr("fill","none")
        .attr("stroke",function(countrys) 
        { 
            return bloodScale(subject.country);
        })
        .attr("stroke-width",3)
        .on("mouseover",function(countrys)
        {   
            if(! d3.select(this).classed("off"))
            {
            d3.selectAll(".line")
            .classed("fade",true);
            
            d3.select(this)
                .classed("fade",false)
                .raise(); //move to top
            }
        })
        .on("mouseout",function(countrys)
           {
            if(! d3.select(this).classed("off"))
            {
            
            d3.selectAll(".line")
                .classed("fade",false);
            }
   
        
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

var createLegend = function(screen,margins,graph,
                             target,yearscale)
{
        var legend = d3.select(target)
        .append("g")
        .classed("legend",true)
        .attr("transform","translate("+
              (margins.left+ 10) +","+
             (margins.top+10)+")");
    
    var entries = legend.selectAll("g")
        .data(["Senegal","Bolivia","Cambodia","Mexico", "United States"])
        .enter()
        .append("g")
        .classed("legendEntry",true)
        .attr("fill",function(country)
              
              {
                return yearScale(country);
             })
            .attr("transform",function(country,index)
                  {
                return "translate(0,"+index*20+")";
              })
        .on("click",function(country)
            
            var on = ! d3.select(this).classed("off");
            if(on) //turn off
                {
                    d3.select(this)
                        .classed("off",true);
                    d3.selectAll("."+country)
                        .classed("off",true);
                }
            else
                {
                    d3.select(this)
                        .classed("off",false);        
                    d3.selectAll("."+country)
                        .classed("off",false);

                }
        })
            
        entries.append("rect")
                .attr("width",10)
                .attr("height",10)
    
        entries.append("text")
                .text(function(country){return country;})
                .attr("x",15)
                .attr("y",10)  
}