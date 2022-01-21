
status = "";
object = [];
alarm = "";

function preload(){
   alarm = loadSound("sound.wav");
}

function setup(){
    canvas = createCanvas(380,380); 
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function modelLoaded(){
    console.log("Cocossd is Initialized!");
    status = true;
}

function gotResults(error,results){
    if (error){
        console.error(error);
    }

    if (results){
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video,0,0,380,380);
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML = "Status = Baby Detected";
            fill(r,g,b);
            percent = floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x + 15,object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label == "person"){
                document.getElementById("status").innerHTML = "Status = Baby Detected";
                console.log("stop");
                alarm.stop();
            }
            else {
                document.getElementById("status").innerHTML = "Status = Baby NOT Detected";
                console.log("play");
                alarm.play();
            }
        }
    }
    if(object.length<0){
        document.getElementById("status").innerHTML = "Status = Baby Not Detected";
        alarm.play();
    }
}