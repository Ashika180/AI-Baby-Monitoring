status = "";
object = [];

function preload(){
   sound = loadSound("Red Alert.mp3"); 
}

function setup(){
    canvas = createCanvas(480, 480);
    canvas.position(550, 250);

    video = createCapture(VIDEO);
    video.hide();

    detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detection has started.";
}

function modelLoaded(){
console.log("Model Loaded!");
status = true;
}

function getResults(error, results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video, 0, 0, 480, 480);

    if(status != ""){
    detector.detect(video, getResults);
    

    for(i = 0; i < object.length; i++){
    if(object[i].label == 'person'){
        document.getElementById("status").innerHTML = "Baby Detected.";
        sound.stop();
    }

    else{
        document.getElementById("status").innerHTML = "Baby Not Detected.";
        sound.play();
    }
}

if(object.length == 0){
    document.getElementById("status").innerHTML = "Baby Not Detected.";
    sound.play();
}

}
}
