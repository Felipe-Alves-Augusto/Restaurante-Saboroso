let express = require('express');
let router = express.Router();
let menus = require('../inc/menus');
let reservations = require('./../inc/reservations');
let contact = require('./../inc/contact');
let emails = require('./../inc/email');





module.exports = (io)=>{

  /* GET home page. */
router.get('/', function(req, res, next) {

  emails.render(req,res);

});

router.post('/',(req,res,next)=>{

  if(!req.body.email){

    emails.render(req,res, "Digite um email");

  } else {

    emails.save(req.body).then(results=>{

      io.emit('Dashboard update');

      emails.render(req,res,null, "E-mail cadastrado com sucesso !");

    }).catch(error=>{

      emails.render(req,res,error);

    });

  }

});

// trabalhando com rotas com o router

router.get('/contact',(req,res,next)=>{

    contact.render(req,res);

});

router.post('/contact',(req,res,next)=>{

  if(!req.body.name){

    contact.render(req,res, "Digite seu nome!");

  } else if(!req.body.email){
    contact.render(req,res, "Digite um email!");

  } else if(!req.body.message){
      contact.render(req,res,"Escreva alguma mensagem!");

  } else{

      contact.TbContacts(req.body).then(results=>{

        req.body = {};
        
        io.emit('Dashboard update');

        contact.render(req,res, null, "Enviado com sucesso!");

      }).catch(error=>{
        contact.render(req,res,error);
      })

  }

});

router.get('/menu',(req,res,next)=>{

    menus.getMenus().then(results=>{

      res.render('menu',{
    
        title: 'Menu - Restaurante Saboroso!',
        background: 'images/img_bg_1.jpg',
        headerTitle: 'Saboreie nosso menu!',
        menus:results
        
    
      });


    });

});

router.get('/reservation',(req,res,next)=>{

    reservations.render(req,res);

});

/*
  chamando a rota post para fazer o envio do formulario para o banco de dados
  no if passamos os parametros req.body sempre precisamos usar isso quando for usar um formulario

*/

router.post('/reservation',(req,res,next)=>{

  if(!req.body.name){
      reservations.render(req,res, "Digite um nome!");
      

  } else if(!req.body.email){
      reservations.render(req,res, "Digite um email!");


  } else if(!req.body.people){
      reservations.render(req,res, "Informe o número de pessoas!");

  } else if(!req.body.date){
    reservations.render(req,res, "Informe uma data!");

  } else if(!req.body.time){
    reservations.render(req,res, "Informe um horário!");

  } else {

    reservations.save(req.body).then(results=>{

      req.body = {};

      io.emit('Dashboard update');

      reservations.render(req,res, null, "Reserva realizada com sucesso!");

    }).catch(error=>{
      reservations.render(req,res,error);
    })

  }

  

});

router.get('/services',(req,res,next)=>{

  res.render('services',{
    title: 'Serviços - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    headerTitle: 'É um prazer poder servir!'
  });

})

  return router;

};
