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
    
    var margins = {top:15,bottom:50,left:70,right: 40}
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
    var highD = 9000;
    var yScaleL = d3.scaleLinear()
        .domain([0,highD])
        .range([graph.height,0])
    var yScaleR = d3.scaleLinear()
        .domain([0,highD])
        .range([graph.height,0])

    
    createLabels(screen,margins,graph,target);
    createAxes(screen,margins,graph,target,xScale,yScale)
    

    /*
    drawLines(students,graph,target,xScale,yScale,gradeScale)
    */
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
        .attr("transform", "translate(580,"+(margins.top+(graph.height/2))+")")
        .append("text")
        .text("% of children vaccinated (DTP1)")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(270)")
    
    
}

 var createAxes = function(screen,margins,graph,target,xScale,yScale)
 {
   var xAxis = d3.axisBottom(xScale)
   .tickFormat(d3.format("d"))
   var yAxisL = d3.axisLeft(yScaleL)
  var yAxisR = d3.axisLeft(yScaleR)
    
   var axes = 
        target.append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(yAxisL)
    axes.append("g")
        .attr("transform","translate("+margins.right+","+(margins.bottom)+")")
        .call(yAxisR)
    
 } //I DIDNT DO ANYTHING PAST THIS POINT//
 
 var drawLines = function(students,graph,target,xScale,yScale,gradeScale)
 {
     var lineGenerator = d3.line()
        .x(function(quiz,i){return xScale(i)})
        .y(function(quiz){return yScale(quiz.grade)})
        .curve(d3.curveCardinal)
     
     var lines = 
        target.select(".graph")
        .selectAll("g")
        .data(students)
        .enter()
        .append("g")
        .classed("line", true)
        .attr("fill","none")
        .attr("stroke",function(student)
                {
            return gradeScale(student.quizes.grade)
        })
        .attr("stroke-width", 2)
     .on("mouseover", function(student)
        {
         d3.selectAll(".line")
            .classed("fade",true);
         
         d3.select(this)
            .classed("fade", false).classed("red", true)
            .raise();
        var xPosition = d3.event.pageX;
        var yPosition = d3.event.pageY
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("img")
                .attr("src", "imgs/"+student.picture)
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value")
                .text(getFinal(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value1")
                .text(getmeanHW(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value2")
                .text(getmeanQuiz(student))
            d3.select("#tooltip")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("#value3")
                .text(getmeanTest(student))
         d3.select("#tooltip").classed("hidden", false)
     })
     .on("mouseout", function(student)
        {
         d3.selectAll(".line")
            .classed("fade", false)
            .classed("red",false)
        d3.select("#tooltip").classed("hidden", true)
     })

     
     lines.append("path")
        .datum(function(student)
                {return student.quizes})
        .attr("d",lineGenerator)
     
 }
  

