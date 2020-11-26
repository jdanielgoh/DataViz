var table;

function preload(){
	table=loadTable("./datos/spotify.csv","csv","header"); 
}


var w = $("#visSpoti").width()




var h = w*.65;
var parseDateSecs = d3.timeParse("%Y-%m-%d %H:%M:%S");

var horas =[]
for (var i =0;i<24;i++){
	horas.push("2019-09-11 "+i+":00:00")
}
var meses={
	"2019-10-01 00:00:00":"Oct-19",
	"2019-11-01 00:00:00":"Nov-19",
	"2019-12-01 00:00:00":"Dic-19",
	"2020-01-01 00:00:00":"Ene-20",
	"2020-02-01 00:00:00":"Feb-20",
	"2020-03-01 00:00:00":"Mar-20",
	"2020-04-01 00:00:00":"Abr-20",
	"2020-05-01 00:00:00":"May-20",
	"2020-06-01 00:00:00":"Jun-20",
	"2020-07-01 00:00:00":"Jul-20",
	"2020-08-01 00:00:00":"Ago-20",
	"2020-09-01 00:00:00":"Sep-20"
}



function setup(){
	textFont("Electrolize")
	var n=table.getRowCount()
	var scalaDias=d3.scaleTime()
	    .domain([dias("2019-09-11"),dias("2020-09-23")])
	    .range([ w *.07, w*.95 ]);
	var scalaSegundos=d3.scaleTime()
	    .domain([segundos("2020-01-01 00:00:00"),segundos("2020-01-01 23:59:59.99999")])
	    .range([ h*.17, h*.87 ]);
 	var canvas =createCanvas(w,h*1.);
 	noLoop();
 	canvas.parent("visSpoti");
 	background(18)
 	 	textSize(h*.013)

 	for (var i =0;i<24;i++){
 		textAlign(RIGHT, CENTER);
 		if(i%2==0){
			stroke(86)
			fill(86)
 		}else{
 			stroke(64)
			fill(64)
 		}
 		
 		line(w*.07,
	 		scalaSegundos(segundos(horas[i])),
	 		w*.95,
	 		scalaSegundos(segundos(horas[i]))
 			)
 		noStroke()
 		fill(30, 215, 96,150)

 		text(segundos(horas[i]).getHours(),.07*w,
	 		scalaSegundos(segundos(horas[i])))
 	}
 	for (var i =0;i<12;i++){
 		textAlign(CENTER, TOP);
 		if(i%2==0){
			stroke(86)
			fill(86)
 		}else{
 			stroke(64)
			fill(64)
 		}
 		
 		line(scalaDias(dias(Object.keys(meses)[i])),
 			h*.17,
 			scalaDias(dias(Object.keys(meses)[i]))
	 		,
	 		h*.9 			)
 		noStroke()
 		 	 	fill(30, 215, 96,150)

 		text(Object.values(meses)[i],
	 		scalaDias(dias(Object.keys(meses)[i])),.9*h)
 	}
 	///Ejes
 	 	fill(86)

 	textAlign(CENTER, CENTER);
 	 	textSize(h*.04)

 	text("Días del último año, de septiembre de 2019 a 2020",w*.5,h*.95)
 	push();
    translate(w*.025,h*.5);
    rotate( radians(-90) );
     	text("Horario del día reproduciendo música",0,0)

	pop();





 	textAlign(LEFT, CENTER);

 	textSize(h*.1)
 	text("RUTINA MUSICAL",w*.07,h*.06)
 	textSize(h*.02)
 	 	fill(30, 215, 96,100)

 	text(" Más de 17,000 reproducciones de spotify en un año; \n patrones de sueño, de trabajo o de simple apreciación.",w*.07,h*.12)









 	strokeWeight(w/470)
 	stroke(30, 215, 96,100)
 	for(var i = 0 ; i<n;i++){
 		if(dias(table.getRow(i).obj.startTime).getTime()==dias(table.getRow(i).obj.endTime).getTime()){
 			line(
	 			scalaDias(dias(table.getRow(i).obj.startTime)),
	 			scalaSegundos(segundos(table.getRow(i).obj.startTime)),
	 			scalaDias(dias(table.getRow(i).obj.endTime)),
	 			scalaSegundos(segundos(table.getRow(i).obj.endTime)),

 			)

 		}else{
 			line(
	 			scalaDias(dias(table.getRow(i).obj.startTime)),
	 			scalaSegundos(segundos(table.getRow(i).obj.startTime)),
	 			scalaDias(dias(table.getRow(i).obj.startTime)),
	 			scalaSegundos(segundos("2020-01-01 23:59:59.99999")),

 			)

 			line(
	 			scalaDias(dias(table.getRow(i).obj.endTime)),
	 			scalaSegundos(segundos("2020-01-01 00:00:00")),
	 			scalaDias(dias(table.getRow(i).obj.endTime)),
	 			scalaSegundos(segundos(table.getRow(i).obj.endTime)),

 			)




 		}
 		

 	}
}



function draw(){
	
}
function dias(str){
	str=str.split(" ")[0]

	return d3.timeParse("%Y-%m-%d")(str)
}
function segundos(str){
	str=str.split(" ")[1].split(".")[0]
	return d3.timeParse("%Y-%m-%d %H:%M:%S")("2020-01-01 "+str)
}