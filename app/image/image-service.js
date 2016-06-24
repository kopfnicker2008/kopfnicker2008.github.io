"use strict";

(function () {

    var app = angular.module( 'myApp.image', ['firebase', 'firebase.utils', 'firebase.auth'] );

    app.factory('imageService', ['user', 'fbutil', '$firebaseObject'], function(user, fbutil, $firebaseObject){
        var profile = $firebaseObject(fbutil.ref('users', user.uid));
        var f = function f(ctx, token) {
            var dataURL = ctx.canvas.toDataURL( "image/jpg", 0.1 );
            var data = atob( dataURL.substring( "data:image/png;base64,".length ) ),
                asArray = new Uint8Array(data.length);

            for( var i = 0, len = data.length; i < len; ++i ) {
                asArray[i] = data.charCodeAt(i);
            }

            var blob = new Blob( [ asArray.buffer ], {type: "image/jpg"} );

            var uploader = new MediaUploader({
                file: new File([blob], "testfile"),
                token: token,
                onComplete: function(data) {
                    //var element = document.createElement("pre");
                    //element.appendChild(document.createTextNode(data));
                    //document.getElementById('results').appendChild(element);
                    //var thumpImg = document.createElement('img');
                    //thumpImg.src = JSON.parse(data).thumbnailLink;
                    //document.getElementById('thumpImg').appendChild(thumpImg);
                    var bigImg = document.createElement('img');
                    var src = 'https://drive.google.com/uc?id='+JSON.parse(data).id;
                    profile.profile_image = src;
                    bigImg.src = src;
                    document.getElementById('canvas-container').appendChild(bigImg);
                },
                onProgress: function(data){
                    console.log(((data.loaded/data.total)*100)+'%');
                }
            });
            uploader.upload();
        };

        var encodeImageFileAsURL = function(e, token) {

            var ctx = document.getElementById('canvas').getContext('2d');
            var reader  = new FileReader();
            var file = e.target.files[0];
            window.name = file.name;
            // load to image to get it's width/height
            var img = new Image();
            img.onload = function() {
                // scale canvas to image
                ctx.canvas.width = 500;
                ctx.canvas.height = 500;
                // draw image
                ctx.drawImage(img, 0, 0
                    , ctx.canvas.width, ctx.canvas.height
                );
            };
            // this is to setup loading the image
            reader.onloadend = function () {
                img.src = reader.result;
                setTimeout(function(){
                    f(ctx, token);
                }, 100);
            };
            // this is to read the file
            reader.readAsDataURL(file);
        };



        var imageService = {
            encodeImageFileAsURL: encodeImageFileAsURL
        };

        return imageService;
    });



})();