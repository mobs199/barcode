

document.getElementById('scanButton').addEventListener('click', function() {
    startScanner();
});

function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner'),  
            constraints: {
                facingMode: "environment",   //für handy 
                video: {
                    facingMode: { exact: "environment" }  
                }
            }
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader"]  // Gängige Barcode-Leser
        }
    }, function(err) {
        if (err) {
            console.error("Fehler bei der Initialisierung des Scanners:", err);
            alert("Fehler bei der Initialisierung des Scanners. Überprüfe die Kameraberechtigungen.");
            return;
        }
        console.log("Scanner ist bereit.");
        Quagga.start();  // Startet den Scan-Prozess
    });

    Quagga.onDetected(function(result) {
        console.log("Barcode erkannt: " + result.codeResult.code);
        alert("Barcode erkannt: " + result.codeResult.code);  // Zeigt den Barcode an
        Quagga.stop();  // Stoppt den Scanner nach der Erkennung
    });
}

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        console.log('Kamera zugänglich!');
        // Zeige den Stream in einem Video-Element an
        const video = document.querySelector('video');
        video.srcObject = stream;
    })
    .catch(function(err) {
        console.error('Kamera konnte nicht zugänglich gemacht werden:', err);
        alert('Kamera konnte nicht gestartet werden. Überprüfe deine Berechtigungen.');
    });
