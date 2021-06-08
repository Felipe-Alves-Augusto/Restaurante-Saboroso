class SaborosoFileReader {


    constructor(inputEl, imgEl){

        this.imgEl = imgEl;
        this.inputEl = inputEl;

        this.initInputEvent();

    }

    // API fileReader para ler e exibir um arquivo de imagem no input file;

    initInputEvent(){

        document.querySelector(this.inputEl).addEventListener("change",e=>{

            

            this.reader(e.target.files[0]).then(result=>{

                document.querySelector(this.imgEl).src = result;

            })

        })

    }

    reader(file){

        return new Promise((resolve,reject)=>{

            let reader = new FileReader();

            reader.onload = function(){
    
                resolve(reader.result)
    
            }

            reader.onerror = function () { 
                reject("A imagem não foi carregada");
             }

            reader.readAsDataURL(file);

        })

    }


}