(function() {

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);
	var pictureSource;
	var destinationType;
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;

		document.getElementById("capturePhoto").onclick = function() {
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
				quality : 50,

				destinationType : destinationType.DATA_URL
			});
		}
		
		document.getElementById("geolocationdata").addEventListener("click", function() {
			navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError, {
				enableHighAccuracy : true
			});
		});
		
		
		
		// document.getElementById("geoLocation").onclick = function() {
		// navigator.geolocation.watchPostition(onSucess,onError,{ timeout: 30000 });
		// }

		//ITS ALWAYS ADVISABLE TO INITIATE A navigator.geolocation.watchPostition ON DEVICE LOAD INSTEAD OF BINDING IT TO THE CLICK EVENT OF A BUTTON.
		//CORRECTION BELOW
		var watchId = navigator.geolocation.watchPostition(onSucess, onError, {
			timeout : 30000
		});

		document.getElementById("clearWatchbtn").addEventListener("click", function() {
			navigator.geolocation.clearWatch(watchID);
		});

		document.getElementById('barcode').onclick = function() {
			cordova.plugins.barcodeScanner.scan(function(result) {
				alert("We got a barcode\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
			}, function(error) {
				alert("Scanning failed: " + error);
			}, {
				"preferFrontCamera" : true, // iOS and Android
				"showFlipCameraButton" : true, // iOS and Android
				"prompt" : "Place a barcode inside the scan area", // supported on Android only
				"formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
				"orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
			});
		}
	};
	var onSucess = function(position) {
		// var element=document.getElementById('geoLocation');
		// element.innerHTML='Latitude '+ position.coords.latitude +'<br />'+
		// 'Longitude:'+position.coords.longitude +'<br />'+'<hr />'+element.innerHTML;

		//YOU ARE ATTEMTIMG TO DISPLAY THE RESULTS OF YOUR navigator.geolocation.watchPostition WHICH ISNT ADVISABLE.
		//I HAVE INSTEAD CREATED A DIV WITH THE ID displayPositionWatch WITHIN WHICH WE WILL DISPLAY THE RESULTS.
		//CORRECTIONS BELOW

		var element = document.getElementById('displayPositionWatch');
		element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' + 'Longitude: ' + position.coords.longitude + '<br />' + '<hr />' + element.innerHTML;
	}
	function onError(error) {
		alert('code ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	function onPhotoDataSuccess(imageData) {

		var smallImage = document.getElementById('smallImage');

		smallImage.style.display = 'block';

		smallImage.src = "data:image/jpeg;base64," + imageData;

	}

	function onFail(message) {

		alert('Failed because: ' + message);

	}
	
	var onPositionSuccess = function(position) {
		alert('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n');
	};
	
	function onPositionError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

})();








//I WOULDN'T ADVICE THE DECLARATION OF DIFFERENT onDeviceReady() FOR EACH FUNCTIONAL CALL. ONE onDeviceReady() CAN HANDLE ALL.

//BELOW CODE IS A REPITITION OF THE ONE ABOVE WHICH WAS CORRECTED
// (function(){
// document.addEventListener('deviceready', onDeviceReady.bind(this), false);
//
//
// function onDeviceReady(){
// document.getElementById("geoLocation").onclick = function() {
// navigator.geolocation.watchPostition(onSucess,onError,{ timeout: 30000 });
//
//
//
// function onSucess(position){
// var element=document.getElementById('geoLocation');
// element.innerHTML='Latitude '+ position.coords.latitude +'<br />'+
// 'Longitude:'+position.coords.longitude +'<br />'+'<hr />'+element.innerHTML;
// }
// function onError(error){
// alert('code '+error.code + '\n'+'message: '+error.message+'\n');
// }
// };
//
// })();

// (function() {
// document.addEventListener('deviceready', onDeviceReady.bind(this), false);
//
// function onDeviceReady() {
// document.getElementById('barcode').onclick = function() {
// cordova.plugins.barcodeScanner.scan(function(result) {
// alert("We got a barcode\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
// }, function(error) {
// alert("Scanning failed: " + error);
// }, {
// "preferFrontCamera" : true, // iOS and Android
// "showFlipCameraButton" : true, // iOS and Android
// "prompt" : "Place a barcode inside the scan area", // supported on Android only
// "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
// "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
// });
// }
// };


