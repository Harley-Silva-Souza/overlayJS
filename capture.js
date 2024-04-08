// Função para capturar a imagem e armazenar o base64 em uma variável
var outBase64; // Variável para armazenar o base64 da imagem capturada

function captureImageAndStoreBase64() {
    return new Promise((resolve, reject) => {
        const video = document.getElementById('video');
        
        /*
        const boxX = (video.videoWidth - Math.min(video.videoWidth, video.videoHeight) * 0.5) / 2;
        const boxY = (video.videoHeight - Math.min(video.videoWidth, video.videoHeight) * 0.5) / 2;
        const boxWidth = Math.min(video.videoWidth, video.videoHeight) * 0.5;
        const boxHeight = Math.min(video.videoWidth, video.videoHeight) * 0.5; // Altura do retângulo
        */

        const boxWidth = Math.min(video.videoWidth, video.videoHeight) * 0.5;
        const boxHeight = boxWidth * 0.5; // Altura do retângulo
        const boxX = ((window.innerWidth - boxWidth) / 2);
        
        //const boxX = (video.videoWidth - boxWidth) / 2;
        const boxY = (video.videoHeight - boxHeight) / 2;

        const canvas = document.createElement('canvas');
        canvas.width = boxWidth;
        canvas.height = boxHeight;
        const context = canvas.getContext('2d');
        
        /* .drawImage(ImageToUse, 
                Coordinate x to start clipping, 
                Coordinate y to start clipping, 
                Width of the Image, 
                Height of the Image, 
                X Coordinate where to place the image, 
                Y Coordinate where to place the image,
                The Width of the image,
                The Height of the image)
        */
        context.drawImage(video, boxX, boxY, boxWidth, boxHeight, 0, 0, boxWidth, boxHeight);
        
        $parameters.outBase64 =  canvas.toDataURL('image/jpeg');
        resolve(); // Resolvemos a promessa sem passar nenhum valor
    });
}


captureImageAndStoreBase64().then(function() {
    // Agora a variável 'outBase64' contém o base64 da imagem capturada
    console.log('Imagem capturada:', outBase64);
    // Agora você pode fazer o que quiser com 'outBase64', como enviá-lo para o servidor
});