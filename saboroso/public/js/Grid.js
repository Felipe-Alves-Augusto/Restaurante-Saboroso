class Grid {

    constructor(configs){


        this.options = Object.assign({}, {
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnEdit: '.btn-update',
            btnDelete: '.btn-delete'
        },configs);
        
        this.rows = [...document.querySelectorAll('table tbody tr')];

        this.initButtons();
        this.initForms();

      
    }

    initForms(){

        let formCreate = document.querySelector(this.options.formCreate);

        formCreate.save().then(json=>{
    
          window.location.reload();
    
        }).catch(error=>{
              console.log(error);
        });
    
        /* fim do script para fazer o insert via ajax */

        this.formUpdate = document.querySelector(this.options.formUpdate);

        this.formUpdate.save().then(json=>{
  
          window.location.reload();
  
          }).catch(error=>{
              console.log(error);
          })
    

    }


    initButtons(){

 
     let btnDelete = document.querySelectorAll(this.options.btnDelete);

      btnDelete.forEach(deletar=>{

        deletar.addEventListener('click',e=>{

          // pegando a tr clicada
          let tr = e.path.find(el => {

            return (el.tagName.toUpperCase() === 'TR');

            });

             //os dados estão vindo como string precisamos passar para objeto;
             let data = JSON.parse(tr.dataset.dados);
              console.log(data.id);
            if(confirm(eval('`' + this.options.mgsDelete + '`'))){
              
              fetch(eval('`' + this.options.deleteUrl + '`'),{
                method: 'DELETE'

              }).then(response => response.json())
                .then(json => {
                   window.location.reload();
                })
            }
            

          });

      });

     

    let btnEdit = document.querySelectorAll(this.options.btnEdit);

    btnEdit.forEach(btn => {

      btn.addEventListener('click', e =>{

        //pegando a tr clicada
        let tr = e.path.find(el => {

          return (el.tagName.toUpperCase() === 'TR');

        });

        //os dados estão vindo como string precisamos passar para objeto;
        let data = JSON.parse(tr.dataset.dados);
        
        console.log(data);


        /* 
          aqui vai pegar todos os name que tiver em data
          o laço vai percorrer todos e se caso achar
          criamos uma variavel input dentro dela selecionamos os inputs do formCreate
          e se o input existir colocamos o value com o data[name]
        */
        for(let name in data){

          switch(name){

            case 'photo':
              this.formUpdate.querySelector("img").src = '/'+data[name];

            break;
            default:
              let input = this.formUpdate.querySelector(`[name=${name}]`);
            
              if(input) input.value = data[name];
            break;

          }
        }

        $('#modal-update').modal('show');

      });

    });

    }



}