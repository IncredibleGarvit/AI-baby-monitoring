status = "";
objects = [];
song = "";

function preload(){
    song = loadSound("system_alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults); 
        for (i = 0; i < objects.length; i++)
        {
            if(objects[i].label=="person"){
                document.getElementById("status").innerHTML = "Status : Person Detected";
                document.getElementById("baby").innerHTML = "baby found";
                fill(r,g,b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                song.stop();
            }
            else {
                document.getElementById("status").innerHTML = "Status : Object Detected";
                document.getElementById("baby").innerHTML = "baby not found"; 
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("baby").innerHTML = "baby not found"; 
            song.play(); 
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}