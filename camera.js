// Função para abrir a câmera e exibir o overlay com um retângulo
async function openCameraWithOverlay() {
    try {
        // Configurações para a câmera
        const cameraSettings = {
            video: {
                facingMode: {
                    exact: "environment" // Camera frontal: "user" , Camera traseira: "environment"
                }
            }
        };
        
        // Solicita acesso à câmera do dispositivo
        
        const stream = await navigator.mediaDevices.getUserMedia(cameraSettings);

        // Obtém o elemento de vídeo
        const video = document.getElementById('video');

        // Adiciona a transmissão da câmera ao elemento de vídeo
        video.srcObject = stream;
        await video.play();
        
        // Desenha o overlay com um retângulo no centro da tela
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        const aspectRatio = videoWidth / videoHeight;

        // Tamanho e posição do retângulo centralizado
        const rectWidth = Math.min(videoWidth, videoHeight) * 0.5;
        const rectHeight = rectWidth * 0.5;
        const rectX = (videoWidth - rectWidth) / 2;
        const rectY = (videoHeight - rectHeight) / 2;

        // Calcula a altura do overlay
        const overlayHeight = window.innerHeight; // Altura total da tela menos a altura do elemento abaixo da imagem da câmera

        // Cria um elemento de div para o overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100%';
        overlay.style.height = overlayHeight + 'px'; // Define a altura do overlay
        overlay.style.pointerEvents = 'none'; // Impede que o overlay intercepte cliques
        video.parentElement.appendChild(overlay);

        // Desenha o retângulo no overlay
        const rectangle = document.createElement('div');
        rectangle.style.position = 'absolute';
        rectangle.style.left = ((window.innerWidth - rectWidth) / 2) + 'px';

        //rectangle.style.left = rectX + 'px'; // Posição inicial "X" do retângulo
        rectangle.style.top = rectY + 'px'; // Posição inicial "Y" do retângulo
        rectangle.style.width = rectWidth + 'px'; // Largura do retângulo
        rectangle.style.height = rectHeight + 'px'; // Altura do retângulo
        rectangle.style.border = '2px solid red'; // Espessura da borda, Cor do contorno do retângulo
        overlay.appendChild(rectangle);
    } catch (error) {
        console.error('Erro ao acessar a câmera:', error);
    }
}

// Chamando a função para abrir a câmera com overlay
openCameraWithOverlay();