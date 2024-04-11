// Função para capturar a imagem
var outBase64;

function captureImageAndStoreBase64() {
    return new Promise((resolve, reject) => {
        const video = document.getElementById('video');

        const boxWidth = Math.min(video.videoWidth, video.videoHeight) * 0.5;
        const boxHeight = boxWidth * 0.5; // Altura do retângulo
        const boxX = (window.innerWidth - boxWidth) / 2;
        const boxY = (video.videoHeight - boxHeight) / 2;

        const canvas = document.createElement('canvas');
        canvas.width = boxWidth;
        canvas.height = boxHeight;
        const context = canvas.getContext('2d');
        
        /* .drawImage(ImageToUse, 
                Coordinate x to start clipping the image, 
                Coordinate y to start clipping the image, 
                Width of the image, 
                Height of the image, 
                X Coordinate where to place the image, 
                Y Coordinate where to place the image,
                The width of the image,
                The height of the image)
        */
        context.drawImage(video, boxX, boxY, boxWidth, boxHeight, 0, 0, boxWidth, boxHeight);
        
        $parameters.outBase64 =  canvas.toDataURL('image/jpeg');
        resolve();
    });
}

captureImageAndStoreBase64().then(function() {
    console.log('Imagem capturada:', outBase64);
});