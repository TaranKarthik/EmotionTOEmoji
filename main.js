//https://teachablemachine.withgoogle.com/models/6t2XiKaGp/

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
var Camera = document.getElementById("camera");
Webcam.attach(Camera);
const ButtonCapture = document.getElementById("CapIMg");
ButtonCapture.addEventListener("click", snapshot);

function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='capturedimg' src='" + data_uri + "'>"
    });
}
console.log("Ml5 Version:" + " " + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MuPF4V8uj/model.json", modelLoaded);
//https://teachablemachine.withgoogle.com/models/6t2XiKaGp/ <-- Dumber Alternative;
function modelLoaded() {
    console.log("Model is Loaded");
}

function check() {
    var img = document.getElementById("capturedimg");
    classifier.classify(img, getChecked);
}


function getChecked(error, results) {
    if (error) {
        console.error("Awwww Crap Error Came :(");
    } else {
        console.log(results);

        var Prediction1 = results[0].label;
        var Prediction2 = results[1].label;

        speak(Prediction1,Prediction2);

        document.getElementById('Emotion1').innerHTML = Prediction1;
        document.getElementById('Emotion2').innerHTML = Prediction2;

        if (Prediction1 == "Angry") {
            //&#128545;
            document.getElementById("Emoji1").innerHTML = "&#128545;";
        }
        //DUll - &#128532;
        //SAd - &#128546;
        //Happy - &#128522;
        if (Prediction1 == "Sad") {
            //&#128545;
            document.getElementById("Emoji1").innerHTML = "&#128546;";
        }
        if (Prediction1 == "Happy") {
            //&#128545;
            document.getElementById("Emoji1").innerHTML = "&#128522;";
        }

        if (Prediction2 == "Angry") {
            //&#128545;
            document.getElementById("Emoji2").innerHTML = "&#128545;";
        }
        if (Prediction2 == "Sad") {
            //&#128545;
            document.getElementById("Emoji2").innerHTML = "&#128546;";
        }
        if (Prediction2 == "Happy") {
            //&#128545;
            document.getElementById("Emoji2").innerHTML = "&#128522;";
        }



    }
}


function speak(one, two) {
   
    var speakDataone = one;
    var speakDatatwo = two;
    let speech = new SpeechSynthesisUtterance();

    speech.lang = "en-US";
    speech.text = "The first prediction is- " + speakDataone + " And the second prediction is- " + speakDatatwo;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 3;

    window.speechSynthesis.speak(speech);

}