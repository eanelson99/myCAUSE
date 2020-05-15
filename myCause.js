
var countriesPromise = d3.json("countries.json")
var WSvMSPromise = d3.csv("WSvMS.csv")  
countriesPromise.then(function(countries)
    {
        WSvMSPromise.then(function(teams)
    {
        console.log("worked",teams);
        drawMap(countries, teams);
        initStack(countries,teams)
    });
    (function(err){console.log("failed",err)})
       
    });
    (function(err){console.log("failed",err)})

var blank = " "
//bind data and create one path per GeoJSON feature
var drawMap = function(countries,teams)
{
    var width = 1250;
    var height = 550;

   
    
    var projection = d3.geoMercator()
        .translate([width/2,height/2])
    
    var path = d3.geoPath()
        .projection(projection)
    
    
    var svg = d3.select("svg")
        .attr("width",width)
        .attr("height",height)
        .attr("fill","#444")
    
    svg.selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("d",path)
    .attr("stroke","white");
    
    
    var highlightCountry = d3.select("svg")
        .selectAll("path")
        .classed("focus", function(features)
                {
                   
                    if("United States of America" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("Germany" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("Netherlands" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("France" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("Sweden" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("United Kingdom" == features.properties.SOVEREIGNT)
                    {
                        return true 
                    }
                    if("Australia" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("Canada" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("Brazil" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("Japan" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("Belgium" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("Uruguay" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("Croatia" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("Portugal" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    if("Spain" == features.properties.SOVEREIGNT)
                    {
                        return true
                    }
                    else
                    {
                        return false
                    }
        
                })
    svg.selectAll("circle")
        .data(teams)
        .enter()
        .append("circle")
        .attr("cx", function(teams)
              {
                return projection([teams.Lon,teams.Lat])[0]
              })
        .attr("cy", function(teams)
              {
                return projection([teams.Lon,teams.Lat])[1]
              })
        .attr("r", 5)
        .style("fill", "#21a606")
        .style("opacity", 0.70)
        .append("title")
        .text(function(teams)
             {
               return teams.Team + blank + "Ranking:" + teams.Ranking
             })
        
    //choropleth for Rankings
    /*var color = d3.scaleQuantize()
        .domain([d3.min(teams,function(teams)
                {
                    return Ranking
                })],
                [d3.max(teams,function(teams)
                {
                    return Ranking
                })]
               )
        .range(["rgb(255,149,49)","rgb(117,12,255)"])*/
    
        
        /*.on("click", function(features)
           {
                if("United States of America" == features.properties.SOVEREIGNT)
                {
                   return USWNT.Rankings
                }
                else
                {
                    console.log("N/A")
                }
           })*/
    
    /*svg.selectAll("circle")
        .data(countries.features)
        .enter()
        .append("circle")
        .attr("cx", function(d)
            {
                return projection([-86.5,44])[0]
            })
        .attr("cy", function(d)
            {
                return projection([-86.5,44])[1]
            })
        .attr("r",5)
        .style("fill","pink")
    
    d3.selectAll("circle")
        .on("click", function(countries)
           {
                console.log("data")
           })*/

   
    
}

var createStackLayout = function(countries,teams,target,graph,yScale,xScale)
{
   var stack = d3.stack()
        .keys([teams.W, teams.L, teams.T]);
    
    var series = stack(teams)
    
    var colors = d3.scalelinear()
        .range(["rgb(168,141,31)","rgb(171,89,106)","rgb(89,128,173)"])
    
    var groups = svg.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .style("fill", function(Team,index)
            {
                return colors(Team.index)
            })
    
    var rects = groups.selectAll("rect")
        .data(teams)
        .enter()
        .append("rect")
        .attr("x", function(teams,index)
             {return xScale(index)})
        .attr("y", function(teams)
             {return yScale(series[0])})
        .attr("height", function(teams)
             {return yScale(teams[1])-yScale(teams[0])})
        .attr("width", xScale.bandwidth())
}

var createLabels = function(screen,margins,graph,target)
{
    var labels = d3.select(target)
        .append("g")
        .classed("labels",true)
    
    labels.append("text")
        .text("W-L-T Record")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top)
    
    labels.append("text")
        .text("National Team")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",screen.height)
    
    labels.append("g")
        .attr("transform","translate(20,"+ 
              (margins.top+(graph.height/2))+")")
        .append("text")
        .text("Wins/Losses/Ties")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
    
}

var createAxes = function(screen,margins,target,graph,xScale,yScale)
{
        var xAxis = d3.axisBottom(xScale)
        
        var yAxis = d3.axisLeft(yScale)
        
        var axes = d3.select(target)
            .append("g")
        
        axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top)+")")
        .call(yAxis)
        
}

var displayStackLayout = function(countries,teams,target)
{   
    
    var screen = {width:1000, height:600};
    
    var margins = {top:50, bottom:40, left:70, right:40};
    
    var graph = 
        {
            width: screen.width-margins.left-margins.right,
            height: screen.height-margins.top-margins.bottom,
        }
    
    d3.select(target)
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    var g = d3.select(target)
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+margins.top+")")
    
    var record = function(teams)
        {return teams.W + teams.L + teams.L}
    
    var xScale = d3.scaleBand()
        .domain([teams,function(teams){return teams.Team}])
        .range([0,graph.width])
    
    var yScale = d3.scaleLinear()
        .domain([0,d3.max(teams,record)])
        .range(graph.height, 0)
    
    createStackLayout(countries,teams,target,graph,yScale,xScale)
    createLabels(screen,margins,graph,target)
    createAxes(screen,margins,target,graph,xScale,yScale)
    
    initStack(countries,teams)
}

var clearMap= function()
{
    d3.selectAll("projection")
        .remove()
    d3.selectAll("path")
        .remove();
    d3.selectAll("circle")
        .remove();
}

var initStack = function(countries,teams)
{
    d3.select("#stack")
    .on("clicked",function()
       {
        clearTable()
        displayStackLayout(countries,teams,target)
       })
}


//working out kinks on panning..dont know if I actually want to use it or if it is necessary for my final project
/*var createPanButtons = function(countries)
{
    var svg = d3.select("svg")
        .attr("width",width)
        .attr("height",height)
        .attr("fill","#444")
    var width = 1000;
    var height = 550;
   
    
    var north = svg.append("g")
        .attr("class","pan")
        .attr("id","north")
    north.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width",500)
        .attr("height", 30)
    north.append("text")
        .attr("x",width/2)
        .attr("y",20)
        
    
     d3.selectAll(".pan")
        .on("click",function(countries)
           {
                var offset = projection.translate()
                var moveAmount = 50
                var direction = d3.select("this")
                    .attr("north")
           })
    
    var south = svg.append("g")
        .attr("class","pan")
        .attr("id","south")
    south.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width",500)
        .attr("height", 30)
    south.append("text")
        .attr("x",width/2)
        .attr("y",20)
    
     d3.selectAll(".pan")
        .on("click",function(countries)
           {
                var offset = projection.translate()
                var moveAmount = 50
                var direction = d3.select("this")
                    .attr("south")
           })
    
    var west = svg.append("g")
        .attr("class","pan")
        .attr("id","west")
    west.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width",500)
        .attr("height", 30)
    west.append("text")
        .attr("x",width/2)
        .attr("y",20)
    
     d3.selectAll(".pan")
        .on("click",function(countries)
           {
                var offset = projection.translate()
                var moveAmount = 50
                var direction = d3.select("this")
                    .attr("west")
           })
    
    var east = svg.append("g")
        .attr("class","pan")
        .attr("id","east")
    east.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width",500)
        .attr("height", 30)
    east.append("text")
        .attr("x",width/2)
        .attr("y",20)
    
     d3.selectAll(".pan")
        .on("click",function(countries)
           {
                var offset = projection.translate()
                var moveAmount = 50
                var direction = d3.select("this")
                    .attr("east")
           })
    
   
}*/