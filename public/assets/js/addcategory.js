/*jslint plusplus: true, evil: true/ //>> for (i++)
global console, alert, prompt,Array*/
// Initialize Firebase
var config = {
  apiKey: "AIzaSyA2z4EIexs9AdX8TORg9Xf_7uqJlulDH24",
  authDomain: "matgary-e26c5.firebaseapp.com",
  databaseURL: "https://matgary-e26c5.firebaseio.com",
  projectId: "matgary-e26c5",
  storageBucket: "matgary-e26c5.appspot.com",
  messagingSenderId: "577522285236"
};
firebase.initializeApp(config);
console.log("firebase");
"use strict";

document.getElementById("submit_btn").disabled = true;
var storage = firebase.storage();
console.log("firebase")
var fileChooser = document.getElementById("upload");
var pic;


// check state of chooser of image
function uploadPic() {
    pic = this.files[0];
    console.log("success");
    var uploadTask = storage.ref().child("magary/" + new Date()+'.jpg').put(pic);

    uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        document.getElementById("bar").style.width = progress + '%';
    }, function (error) {
        console.log(error.message);
    }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            document.getElementById('url').value = downloadURL;


            document.getElementById("submit_btn").disabled = false;


        });
    });

}
window.fileChooser.onchange = uploadPic;
