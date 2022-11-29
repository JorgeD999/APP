
class Camara {
    constructor(videoNode){
        this.videoNode = videoNode;
    }

    encender(){

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {width: 300, height: 300}
        }).then(stream => {
            this.videoNode.srcObject = stream;
            this.stream = stream;
        });

    }

    apagar(){

        this.videoNode.pause();

        if( this.stream ){
            this.stream.getTracks()[0].stop();
        }
    }

    tomarFoto(){

        //Crar un elemento canvas para rendezar ahi la foto
        let canvas = document.createElement('canvas');

        //Colocar las dimensiones iguales al elemento del video
        canvas.setAttribute('width', 300);
        canvas.setAttribute('height', 300);

        //Obtener el contexto del canvas
        let context = canvas.getContext('2d');  //Imagen
        
        //Dibujar la imagen dentro de canvas
        context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

        this.foto = context.canvas.toDataURL(); //string base64

        //limpieaz

        canvas = null;
        context = null;

        return this.foto;

    }
}