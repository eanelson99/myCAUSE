var countriesPromise = d3.json("countries.json")
    
countriesPromise.then(function(countries)
    {
        console.log("worked",countries);
        drawMap(countries)
       
    });
    (function(err){console.log("failed",err)})

//define path generator, using the geoMercator
var path = d3.geoPath()
    .projection(d3.geoMercator())


//bind data and create one path per GeoJSON feature
var drawMap = function(countries)
{
    var width = 1000;
    var height = 550;
   
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
    
}


    
