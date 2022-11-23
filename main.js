status="";
user_data="";
objects=[];

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : detecting objects";
    user_data=document.getElementById("input").value;
    console.log(user_data);
}

function modelLoaded(){
    console.log("model is loaded");
    status=true;
}

function draw(){
    image(video,0,0,640,420);
    if(status != ""){
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            fill("orange");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("orange");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            document.getElementById("status").innerHTML="objects detected !";
            if(objects[i].label == user_data){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object").innerHTML=" Status : object mentioned found";
                }
                else if(objects.label != user_data){
                    document.getElementById("object").innerHTML="Status : object mentioned not found";
                }
                }
        }

    }


function gotResults(error,results){
if(error){
    console.log("error");
}
else{
    console.log(results);
    objects=results;
}
}