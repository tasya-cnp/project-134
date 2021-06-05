img = "";
status = ""; 
objects = [];

function preload()
{
    img = loadImage('dog_cat.jpg');
    
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);


    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;

}

function gotResult(error, results)
{
   if (error) {
       console.error(error);
   } else 
   {
       console.log(results);
       objects = results;
       
   }
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
      for (i = 0; i < objects.lenght; i++)
      {
          document.getElementById("status").innerHTML = "Status : Object Dected";
          document.getElementById("number_of_objects").innerHTML = "Number of Objects Dected are : " + objects.lenght;
          fill (r, g, b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
          noFill();
          stroke(r, g, b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }   
    }
   
}