
var countriesPromise = d3.json("countries.json")
var WSvMSPromise = d3.csv("WSvMS.csv")  
countriesPromise.then(function(countries)
    {
        WSvMSPromise.then(function(teams)
    {
        console.log("worked",teams);
        drawMap(countries, teams);
        displayStackLayout(countries,teams,"target");
    });
    (function(err){console.log("failed",err)})
       
    });
    (function(err){console.log("failed",err)})

var blank = " "

var info = function(teams)
             {
        return teams.Team + blank + "_" + blank + "Ranking:" + teams.Ranking + ";" + blank + "Olympic Wins:" + teams.Olympics + ";" + blank + "World Cup Wins:" + teams.WorldCup
             }

var drawToolTip = function(teams)
{
    d3.select("#tooltip div")
        .remove();

    
    var xPosition = d3.event.pageX;
    var yPosition = d3.event.pageY;

    var base = d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPosition+"px")
        .style("left",xPosition+"px")
        .append("div")
    
    base.append("div")
        .classed("tt-Title",true)
        /*.text("Circle Selected:")*/
        .text(info(teams))
        

    
}
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
        .style("fill", "#7144b5")
        .style("opacity", 0.70)
       /* .append("title")
        .text(function(teams)
             {
               return teams.Team + blank + "Ranking:" + teams.Ranking
             })*/
        .on("mouseover",function(teams)
           {
            d3.select(this)
            .raise(this);
            drawToolTip(teams)
           })
        .on("mouseout",function(teams)
           {
            d3.select(this)
            d3.select("#tooltip")
            .classed("hidden",true);
           })
        
    //choropleth for Trophies
    /*var color = d3.scaleQuantize()
        .domain([(teams,function(teams)
                {
                    return teams.Olympics + teams.WorldCup
                })],
                [d3.max(teams,function(teams)
                {
                    return teams.Olympics + teams.WorldCup
                })]
               )
        .range(["#ffffe5","#ffffe4","#fffee2","#fffee1","#fffee0","#fffedf","#fffddd","#fffddc","#fffddb","#fffdd9","#fffcd8","#fffcd7","#fffcd6","#fffcd4","#fffbd3","#fffbd2","#fffbd0","#fffacf","#ffface","#fffacc","#fff9cb","#fff9ca","#fff9c9","#fff8c7","#fff8c6","#fff8c5","#fff7c3","#fff7c2","#fff7c1","#fff6bf","#fff6be","#fff5bd","#fff5bc","#fff4ba","#fff4b9","#fff4b8","#fff3b6","#fff3b5","#fff2b4","#fff2b2","#fff1b1","#fff1af","#fff0ae","#ffefad","#ffefab","#ffeeaa","#ffeea9","#ffeda7","#feeca6","#feeca4","#feeba3","#feeaa1","#feeaa0","#fee99e","#fee89d","#fee89b","#fee79a","#fee698","#fee697","#fee595","#fee493","#fee392","#fee390","#fee28e","#fee18d","#fee08b","#fedf89","#fedf87","#fede86","#fedd84","#fedc82","#fedb80","#feda7e","#fed97d","#fed87b","#fed779","#fed777","#fed675","#fed573","#fed471","#fed370","#fed26e","#fed16c","#fed06a","#fecf68","#fece66","#fecd64","#fecc63","#fecb61","#fec95f","#fec85d","#fec75b","#fec65a","#fec558","#fec456","#fec355","#fec253","#fec051","#febf50","#febe4e","#febd4d","#febc4b","#feba4a","#feb948","#feb847","#feb746","#feb544","#feb443","#feb341","#feb240","#feb03f","#feaf3e","#feae3c","#feac3b","#fdab3a","#fdaa39","#fda938","#fda737","#fda635","#fda534","#fda333","#fca232","#fca131","#fc9f30","#fc9e2f","#fc9d2e","#fb9b2d","#fb9a2c","#fb992b","#fb972a","#fa962a","#fa9529","#fa9328","#f99227","#f99126","#f89025","#f88e25","#f88d24","#f78c23","#f78a22","#f68921","#f68821","#f58620","#f5851f","#f4841f","#f3831e","#f3811d","#f2801c","#f27f1c","#f17e1b","#f07c1a","#f07b1a","#ef7a19","#ee7918","#ee7718","#ed7617","#ec7517","#eb7416","#eb7215","#ea7115","#e97014","#e86f14","#e86e13","#e76c12","#e66b12","#e56a11","#e46911","#e36810","#e2670f","#e1650f","#e1640e","#e0630e","#df620d","#de610d","#dd600c","#dc5f0c","#db5e0b","#da5d0b","#d95b0a","#d75a0a","#d65909","#d55809","#d45708","#d35608","#d25508","#d15407","#cf5307","#ce5207","#cd5106","#cc5006","#ca4f06","#c94e05","#c84d05","#c74c05","#c54b05","#c44b05","#c24a04","#c14904","#c04804","#be4704","#bd4604","#bb4504","#ba4504","#b84404","#b74304","#b54203","#b44103","#b24103","#b14003","#af3f03","#ae3e03","#ac3e03","#ab3d03","#a93c03","#a83b04","#a63b04","#a43a04","#a33904","#a13904","#a03804","#9e3704","#9c3704","#9b3604","#993604","#983504","#963404","#943404","#933304","#913304","#903204","#8e3104","#8c3104","#8b3005","#893005","#882f05","#862f05","#842e05","#832e05","#812d05","#802d05","#7e2c05","#7c2c05","#7b2b05","#792b05","#782a05","#762a05","#742905","#732905","#712806","#702806","#6e2706","#6c2706","#6b2606","#692606","#682506","#662506"])*/
    
    
}

var createStackLayout = function(countries,teams,yScale,xScale)
{ 
   var stack = d3.stack()
        .keys(["W", "L", "T"]);
    
    var series = stack(teams)
    console.log("series", series)
    
    var colors = d3.scaleLinear()
        .range(["red","green","yellow"])
    
    
    
    var groups = d3.select("#stacklayout")
        .selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .style("fill", function(Team,index)
            {
                return colors(Team.index)
            })
    
    var rects = groups.selectAll("rect")
        .data(function(arr){return arr})
        .enter()
        .append("rect")
        .attr("x", function(element)
             {  console.log("element", element)
                return xScale(element.data.Team)})
        .attr("y", function(element)
             {return yScale(element[1])})
        .attr("height", function(element)
             {return yScale(element[0])-yScale(element[1])})
        .attr("width", xScale.bandwidth())
}

var createLabels = function(screen,margins,graph,target)
{
    var labels = d3.select(target)
        .append("g")
        .classed("labels",true)
    
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
   console.log("height",graph.height)
    
    d3.select(target)
        .attr("width",screen.width)
        .attr("height",screen.height)
        
        
    
    var g = d3.select(target)
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+margins.top+")")
        
    
    var record = function(teams)
        {return Number.parseInt(teams.W) + Number.parseInt(teams.L) + Number.parseInt(teams.T)}
    
    var getTeam = function(team)
        {
            return team.Team
        }
    
    var arrTeam = teams.map(getTeam)
    
    var xScale = d3.scaleBand()
        .domain(arrTeam)
        .range([0,graph.width])
    console.log("x",xScale)
    
    var yScale = d3.scaleLinear()
        .domain([0,d3.max(teams,record)])
        .range([graph.height, 0])
    console.log("yScale",yScale.domain())
    

    
    createStackLayout(countries,teams,yScale,xScale)
    createLabels(screen,margins,graph,target)
    createAxes(screen,margins,target,graph,xScale,yScale)
    
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