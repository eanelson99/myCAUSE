var oceansPromise = d3.json("oceans.json")
    
oceansPromise.then(function(oceans)
    {
        console.log("worked",oceans);
        drawMap(oceans)
    });
    (function(err){console.log("failed",err)})

//define path generator, using the geoMercator
var path = d3.geoPath()
    .projection(d3.geoMercator())

//bind data and create one path per GeoJSON feature
var drawMap = function(oceans)
{
    var width = 1000;
    var height = 600;
    
    var svg = d3.select("svg")
        .attr("width",width)
        .attr("height",height)
      
    svg.selectAll("path")
    .data(oceans.geometries)
    .enter()
    .append("path")
    .attr("d",path);
}
    
