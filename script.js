document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.onload = function() {
            const width = img.width;
            const height = img.height;
            const resolution = "72x72"; // Assuming a default resolution
            const printWidthCm = (width / 72) * 2.54; // Convert inches to cm
            const printHeightCm = (height / 72) * 2.54; // Convert inches to cm

            // Create a canvas to analyze the image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Get image data and check for transparency
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            let hasTransparency = false;

            for (let i = 3; i < data.length; i += 4) {
                if (data[i] < 255) { // Check the alpha channel
                    hasTransparency = true;
                    break;
                }
            }

            const transparencyText = hasTransparency ? "A imagem tem fundo transparente." : "A imagem não tem fundo transparente.";

            document.getElementById('imageProperties').innerHTML = `
                <p>Dimensões: ${width} x ${height} pixels</p>
                <p>Tamanho de Impressão: ${printWidthCm.toFixed(2)} x ${printHeightCm.toFixed(2)} cm</p>
                <p>Resolução: ${resolution} ppp</p>
                <p>${transparencyText}</p>
            `;
        };
        img.src = URL.createObjectURL(file);
    }
});