// https://teachablemachine.withgoogle.com/models/yEyJj1pOT/

predictionValue = "";
predictionValue2 = "";

Webcam.set({
    width: 350,
    height: 300,
    imageFormat: "png",
    pngQuality: 90,
})

camera = document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capturedImage" src="' + data_uri +'"/>';
    })
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/yEyJj1pOT/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "A primeira previsão é " + predictionValue;
    speakData2 = "A segunda previsão é " + predictionValue2;
    
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2); 
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("capturedImage");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        document.getElementById("resultEmotionName").innerHTML = results[0].label; 
        document.getElementById("resultEmotionName2").innerHTML = results[1].label; 
        predictionValue = results[0].label; 
        predictionValue2 = results[1].label; 
        speak();

        if(results[0].label == "Felicidade") { 
            document.getElementById("updateEmoji1").innerHTML = "&#128522;"; 
        } 
        else if(results[0].label == "Tristeza") { 
            document.getElementById("updateEmoji1").innerHTML = "&#128546;"; 
        }
        else if(results[0].label == "Irritação") { 
            document.getElementById("updateEmoji1").innerHTML = "&#128544;"; 
        }
        else {
            document.getElementById("updateEmoji1").innerHTML = "&#128552;"; 
        } 

        if(results[1].label == "Felicidade") { 
            document.getElementById("updateEmoji2").innerHTML = "&#128522;"; 
        } 
        else if(results[1].label == "Tristeza") { 
            document.getElementById("updateEmoji2").innerHTML = "&#128546;"; 
        }
        else if(results[1].label == "Irritação") { 
            document.getElementById("updateEmoji2").innerHTML = "&#128544;"; 
        }
        else {
            document.getElementById("updateEmoji2").innerHTML = "&#128552;"; 
        }
    }
}