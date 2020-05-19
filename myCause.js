
var countriesPromise = d3.json("countries.json")
var WSvMSPromise = d3.csv("WSvMS.csv")  
countriesPromise.then(function(countries)
    {
        WSvMSPromise.then(function(teams)
    {
        console.log("worked",teams);
        drawMap(countries, teams);
        displayStackLayout(countries,teams,"#stacklayout");
    });
    (function(err){console.log("failed",err)})
       
    });
    (function(err){console.log("failed",err)})

var blank = " "

var info = function(teams)
             {
        return teams.Team + blank + "_" + blank + "Ranking:" + teams.Ranking + ";" + blank + "Olympic Wins:" + teams.Olympics + ";" + blank + "World Cup Wins:" + teams.WorldCup + ";" + blank + "Record:" + teams.W + "-" + teams.L + "-" + teams.T
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
    
    
    var gr = d3.select("svg")
        .selectAll("g")
        .data(["Difference in Rankings"])
        .enter()
        .append("g")
        .classed("maplegend",true)
        .attr("transform","translate("+
                "100" +","+
                "425"+")");
        
        gr.append("text")
            .text("Difference btwn M & W Rankings")
            .attr("x",15)
            .attr("y",10) 
            
        gr.append("rect")
          .attr("x",0)
          .attr("y",18)
          .attr("width",30)
          .attr("height",10)
          .attr("fill","#fff5eb")
        
        /*gr.append("line")
            .attr("y2",0)
            .attr("y1",-10)
            .attr("stroke","#444")*/
        
        gr.append("rect")
            .attr("x",22)
            .attr("y",18)
            .attr("width",29)
            .attr("height",10)
            .attr("fill","#fedfc0")
    
         gr.append("rect")
            .attr("x",44)
            .attr("y",18)
            .attr("width",30)
            .attr("height",10)
            .attr("fill","#fda35c")
    
         gr.append("rect")
            .attr("x",66)
            .attr("y",18)
            .attr("width",29)
            .attr("height",10)
            .attr("fill","#fa8a3a")
        
         gr.append("rect")
            .attr("x",88)
            .attr("y",18)
            .attr("width",30)
            .attr("height",10)
            .attr("fill","#f57724")
        
         gr.append("rect")
            .attr("x",110)
            .attr("y",18)
            .attr("width",30)
            .attr("height",10)
            .attr("fill","#e85d0e")
        
         gr.append("rect")
            .attr("x",132)
            .attr("y",18)
            .attr("width",30)
            .attr("height",10)
            .attr("fill","#dc5107")
        
        gr.append("rect")
            .attr("x",154)
            .attr("y",18)
            .attr("width",30)
            .attr("height",10)
            .attr("fill","#c54203")
        
        gr.append("text")
            .text("0")
            .attr("x",0)
            .attr("y",40) 
    
         gr.append("text")
            .text("10")
            .attr("x",14)
            .attr("y",40)
    
        gr.append("text")
            .text("20")
            .attr("x",40)
            .attr("y",40) 
    
         gr.append("text")
            .text("30")
            .attr("x",61)
            .attr("y",40) 
        
        gr.append("text")
            .text("40")
            .attr("x",83)
            .attr("y",40) 
    
        gr.append("text")
            .text("50")
            .attr("x",105)
            .attr("y",40) 
    
        gr.append("text")
            .text("60")
            .attr("x",125)
            .attr("y",40) 
        
        gr.append("text")
            .text("70+")
            .attr("x",150)
            .attr("y",40) 
            
    
    
      //choropleth for difference in ranking
    
    var color = d3.scaleQuantize()
        .domain([d3.min(teams,function(team)
                {
                    return team.Difference
                })],
                [d3.max(teams,function(team)
                {
                    return team.Difference
                })]
               )
        .range(["#fff5eb","#fff5ea","#fff4e9","#fff4e8","#fff3e7","#fff3e6","#fff2e6","#fff2e5","#fff1e4","#fff1e3","#fff0e2","#fff0e1","#ffefe0","#ffefdf","#ffeede","#ffeedd","#feeddc","#feeddb","#feecda","#feecd9","#feebd8","#feebd7","#feead6","#feead5","#fee9d4","#fee9d3","#fee8d2","#fee8d1","#fee7d0","#fee6cf","#fee6ce","#fee5cc","#fee5cb","#fee4ca","#fee4c9","#fee3c8","#fee2c7","#fee2c5","#fee1c4","#fee1c3","#fee0c2","#fedfc0","#fedfbf","#fedebe","#feddbd","#feddbb","#fedcba","#fedbb9","#fedab7","#fddab6","#fdd9b4","#fdd8b3","#fdd8b2","#fdd7b0","#fdd6af","#fdd5ad","#fdd4ac","#fdd4aa","#fdd3a9","#fdd2a7","#fdd1a6","#fdd0a4","#fdd0a3","#fdcfa1","#fdcea0","#fdcd9e","#fdcc9d","#fdcb9b","#fdca99","#fdc998","#fdc896","#fdc795","#fdc693","#fdc591","#fdc490","#fdc38e","#fdc28d","#fdc18b","#fdc089","#fdbf88","#fdbe86","#fdbd84","#fdbc83","#fdbb81","#fdba7f","#fdb97e","#fdb87c","#fdb77a","#fdb679","#fdb577","#fdb475","#fdb374","#fdb272","#fdb171","#fdb06f","#fdaf6d","#fdae6c","#fdad6a","#fdac69","#fdab67","#fdaa65","#fda964","#fda762","#fda661","#fda55f","#fda45e","#fda35c","#fda25b","#fda159","#fda058","#fd9f56","#fd9e55","#fd9d53","#fd9c52","#fd9b50","#fd9a4f","#fc994d","#fc984c","#fc974a","#fc9649","#fc9548","#fc9346","#fc9245","#fc9143","#fc9042","#fb8f40","#fb8e3f","#fb8d3e","#fb8c3c","#fb8b3b","#fa8a3a","#fa8938","#fa8837","#fa8736","#fa8534","#f98433","#f98332","#f98230","#f8812f","#f8802e","#f87f2c","#f77e2b","#f77d2a","#f77b29","#f67a27","#f67926","#f57825","#f57724","#f57623","#f47522","#f47420","#f3731f","#f3721e","#f2701d","#f26f1c","#f16e1b","#f16d1a","#f06c19","#f06b18","#ef6a17","#ef6916","#ee6815","#ed6714","#ed6614","#ec6513","#ec6312","#eb6211","#ea6110","#ea6010","#e95f0f","#e85e0e","#e85d0e","#e75c0d","#e65b0c","#e55a0c","#e4590b","#e4580b","#e3570a","#e25609","#e15509","#e05408","#df5308","#de5208","#dd5207","#dc5107","#db5006","#da4f06","#d94e06","#d84d05","#d74c05","#d64c05","#d54b04","#d44a04","#d24904","#d14804","#d04804","#cf4703","#cd4603","#cc4503","#cb4503","#c94403","#c84303","#c74303","#c54203","#c44103","#c24102","#c14002","#bf3f02","#be3f02","#bd3e02","#bb3e02","#ba3d02","#b83d02","#b73c02","#b53b02","#b43b02","#b23a03","#b13a03","#af3903","#ae3903","#ac3803","#ab3803","#aa3703","#a83703","#a73603","#a53603","#a43503","#a33503","#a13403","#a03403","#9f3303","#9d3303","#9c3203","#9b3203","#993103","#983103","#973003","#953003","#942f03","#932f03","#922e04","#902e04","#8f2d04","#8e2d04","#8d2c04","#8b2c04","#8a2b04","#892b04","#882a04","#862a04","#852904","#842904","#832804","#812804","#802704","#7f2704"])
    
    
    var changeCountry = d3.select("svg")
        .selectAll("path")
        .style("fill", function(features)
                {
                   
                    if("United States of America" == features.properties.SOVEREIGNT)
                    {
                        return "#fd9f56"
                    }
                    if("Germany" == features.properties.SOVEREIGNT)
                    {
                        return "#feddbd"
                    }
                    if("Netherlands" == features.properties.SOVEREIGNT)
                    {
                        return "#fee5cb"
                    }
                    if("France" == features.properties.SOVEREIGNT)
                    {
                        return "#fff5ea"
                    }
                    if("Sweden" == features.properties.SOVEREIGNT)
                    {
                        return "#fedebe"
                    }
                    if("United Kingdom" == features.properties.SOVEREIGNT)
                    {
                        return "#fff4e9" 
                    }
                    if("Australia" == features.properties.SOVEREIGNT)
                    {
                        return "#f98433"
                    }
                    if("Canada" == features.properties.SOVEREIGNT)
                    {
                        return "#d64c05"
                    }
                    if("Brazil" == features.properties.SOVEREIGNT)
                    {
                        return "#fecbd8"
                    }
                    if("Japan" == features.properties.SOVEREIGNT)
                    {
                        return "#fdc38e"
                    }
                    if("Belgium" == features.properties.SOVEREIGNT)
                    {
                        return "#fdc490"
                    }
                    if("Uruguay" == features.properties.SOVEREIGNT)
                    {
                        return "#cc4503"
                    }
                    if("Croatia" == features.properties.SOVEREIGNT)
                    {
                        return "#f2701d"
                    }
                    if("Portugal" == features.properties.SOVEREIGNT)
                    {
                        return "#fd9c52"
                    }
                    if("Spain" == features.properties.SOVEREIGNT)
                    {
                        return "#feebd8"
                    }
                    else
                    {
                        return "#444"
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
        .style("fill", "#9430c2")
        .style("opacity", 0.70)
       /* .append("title")
        .text(function(teams)
             {
               return teams.Team + blank + "Ranking:" + teams.Ranking
             })*/
        .on("mouseover",function(teams)
           {
            d3.select(this)
            .style("cursor","pointer")
            .style("fill","black");
            drawToolTip(teams)
           })
        .on("mouseout",function(teams)
           {
            d3.select(this)
            .style("fill", "#9430c2");
            d3.select("#tooltip")
            .classed("hidden",true);
           })
}



var createStackLayout = function(countries,teams,yScale,xScale,target)
{ 
   var stack = d3.stack()
        .keys(["W", "L", "T"]);
    
    var series = stack(teams)
    console.log("series", series)
    
    var colors = d3.scaleLinear()
        .range(["pink","gray","yellow"])
    
    
    
    var groups = d3.select("#stacklayout")
        .select(".graph")
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
        .attr("stroke","black")
        
    
    
   
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

var createLegend = function(screen,margins,graph,target)
{var legend = d3.select(target)
        .append("g")
        .classed("legend",true)
        .attr("transform","translate("+
              (margins.left+ 10) +","+
            "30"+")");
    
    var entries = legend.selectAll("g")
        .data(["Win","Loss","Tie"])
        .enter()
        .append("g")
        .classed("legendEntry",true)
    
        entries.append("rect")
                .attr("width",10)
                .attr("height",10)
                .attr("fill","pink")
                .attr("transform","translate("+
                "10" +","+
                "5"+")");
               
    
        entries.append("text")
                .text("Wins")
                .attr("x",15)
                .attr("y",10) 
                .attr("transform","translate("+
                "10" +","+
                "5"+")");
 
        entries.append("rect")
                .attr("width",10)
                .attr("height",10)
                .attr("fill","gray")
                .attr("transform","translate("+
                "10" +","+
                "25"+")");
 
        entries.append("text")
                .text("Losses")
                .attr("x",15)
                .attr("y",10) 
                .attr("transform","translate("+
                "10" +","+
                "25"+")");
 
        entries.append("rect")
                .attr("width",10)
                .attr("height",10)
                .attr("fill","#014035")
                .attr("transform","translate("+
                "10" +","+
                "45"+")");
 
        entries.append("text")
                .text("Ties")
                .attr("x",15)
                .attr("y",10) 
                 .attr("transform","translate("+
                "10" +","+
                "45"+")");
    }

var displayStackLayout = function(countries,teams,target)
{   

    var screen = {width:3000, height:600};
    
    var margins = {top:100, bottom:40, left:70, right:40};
    
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
    

    
    createStackLayout(countries,teams,yScale,xScale,target)
    createLabels(screen,margins,graph,target)
    createAxes(screen,margins,target,graph,xScale,yScale)
    createLegend(screen,margins,graph,target)
    
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

//working through choropleth

/*function(features)
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
                    }*/
        