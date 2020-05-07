
//define path generator, using the geoMercator
var path = d3.geoPath()
    .projection(d3.geoMercator())

var countriesPromise = d3.json("countries.json")
    
countriesPromise.then(function(countries)
    {
        console.log("worked",countries);
        drawMap(countries)
       
    });
    (function(err){console.log("failed",err)})

//bind data and create one path per GeoJSON feature
var drawMap = function(countries)
{
    var width = 1000;
    var height = 550;
   
    
    var projection = d3.geoMercator()
        .translate([width/2,height/2])
    
    
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
                    else
                    {
                        return false
                    }
                })
    
    svg.selectAll("circle")
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