

/************************************************** */


navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        console.log('Kamera zugänglich!');

        const video = document.querySelector('video');
        video.srcObject = stream;
    })
    .catch(function(err) {
        console.error('Kamera konnte nicht zugänglich gemacht werden:', err);
        alert('Kamera konnte nicht gestartet werden. Überprüfe deine Berechtigungen.');
    });

    function onScanSuccess(decodedText, decodedResult) {
        console.log(`Code scanned = ${decodedText}`, decodedResult);
        document.getElementById("QR-Link").value = decodedText;
    }
    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);


/********************************** */


    function deleteElement() {
        var element = document.getElementsByTagName("a")[0];
        var cam1= document.getElementById("scanner");
        element.remove()
        cam1.remove()
        ;
    }    deleteElement();
   

/********************************** */



    function sendungsnummer() {
        var link = document.getElementById("QR-Link").value;
        console.log("Eingegebener Link: " + link); 

        var regex = /https:\/\/dringend.ewanto\.de\/(\S{7})/;
        var result = link.match(regex);
        
        if (result && result[1]) {
          document.getElementById("Sd-Nr").value = result[1];
        } else {
          document.getElementById("QR-Link").value="";
        }
        console.log("Sendungsnummer = "+result[1])
        console.log("1s")
      } 
      setInterval(
        sendungsnummer
        , 1000
        );
    
      /*document.getElementById("QR-Link").addEventListener("input", function() {
        if (this.value.trim() !== "") {
            sendungsnummer();
        }
        });*/

