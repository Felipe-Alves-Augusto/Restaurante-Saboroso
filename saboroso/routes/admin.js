let express = require('express');
let router = express.Router();
let users = require('./../inc/users');
let admin = require('./../inc/admin');
let menus = require('./../inc/menus');
const reservations = require('../inc/reservations');
const contacts = require('./../inc/contact');
const emails = require('./../inc/email');
let moment = require("moment");


moment.locale("pt-br");

// esse router.use verifica em todas as rotas menos a rota de login, se o usuario fez o login se não redireciona para a tela de login
router.use((req,res,next)=>{

    //colocando a rota login como essecão não precisa estar logado 
    //o / vai para o pagina de logir 
    if(['/'].indexOf(req.url) === -1 && !req.session.user){

        res.redirect("/admin");


    } else {
        next();
    }
});

router.use((req,res,next)=>{

    req.menus = admin.getMenus(req);

    next();
});

router.get('/',(req,res,next)=>{

    users.render(req,res,null,{
        menus: req.menus,
        user: req.session.user
    });

});


// sistema de loggout
router.get('/logout', (req,res,next)=>{

    delete req.session.user;

    res.redirect('/admin');

})



router.post('/',(req,res,next)=>{

    if(!req.body.email){

        users.render(req,res, "Preencha o campo email!");

    } else if(!req.body.password){
        users.render(req,res, "Informe sua senha !");

    } else {
        //sistema de login
        //no metodo login passamos dois parametros e aqui na rota precisamos pegar o body do email e senha
        users.login(req.body.email, req.body.password).then(user=>{

            // linha que contem a session e dados do usuario logado
            req.session.user = user;
            
            res.redirect('/admin/index');

        }).catch(error=>{
            
            users.render(req,res,error.message || error);
        });
    };

});



router.get('/index',(req,res,next)=>{

    //chamando a promessa do metodo getDados
    admin.getDados().then(results=>{

        res.render("admin/index",{
            menus: req.menus,
            user: req.session.user, // pegando os dados da session do usuario e colocando na variavel user
            results
            
        });

    }).catch(error=>{
        console.log(error);
    });

  
 
 });



router.get('/email',(req,res,next)=>{

    emails.getEmail().then(results=>{

        res.render("admin/emails",{
            menus: req.menus,
            user: req.session.user,
            email: results
        });

    })

 
});

router.delete('/email/:id',(req,res,next)=>{

    emails.delete(req.params.id);
    

})

router.get('/contato',(req,res,next)=>{

    contacts.getContato().then(results=>{

        res.render("admin/contacts",{
            menus: req.menus,
            user: req.session.user,
            contatos: results
        });

    })

  

});

router.delete('/contato/:id',(req,res,next)=>{


    contacts.delete(req.params.id).then(results=>{

        res.send(results);

    }).catch(error=>{

        res.send(error);

    })
  

});


router.get('/menu',(req,res,next)=>{

    menus.getMenus().then(results=>{

        res.render("admin/menus",{
            //menu sidebar
            menus: req.menus,
            user: req.session.user,
            results
        });
    })
});

router.post('/menu',(req,res,next)=>{

  menus.save(req.fields, req.files).then(results=>{

    res.send(results);
   

  }).catch(error=>{
      res.send(error);
  })

})

router.delete("/menu/:id",(req,res,next)=>{
    //passamos o a id como parametro na url então precisamos fazer o req.params
    menus.delete(req.params.id).then(results=>{

        res.send(results);

    }).catch(error=>{

        res.send(error);

    })
})

router.get('/reservas',(req,res,next)=>{

    let start = (req.query.start) ? req.query.start : moment().subtract(1, "year").format("YYYY-MM-DD");
    let end = (req.query.end) ? req.query.end : moment().format("YYYY-MM-DD");

    reservations.getReservation(req).then(pag=>{

        
    res.render("admin/reservations",{
        date: {start, end},
        menus: req.menus,
        user: req.session.user,
        reservas: pag.data,
        links: pag.links,
        moment,
        

    });

    })


});


router.get('/reservas/chart', (req,res,next)=>{

  req.query.start = (req.query.start) ? req.query.start : moment().subtract(1, "year").format("YYYY-MM-DD");
   req.query.end = (req.query.end) ? req.query.end : moment().format("YYYY-MM-DD");

    reservations.chart(req).then(chartData=>{

        res.send(chartData);

    })

})

router.post('/reservas',(req,res,next)=>{

    reservations.save(req.fields).then(results=>{

        res.send(results);

    }).catch(error=>{

        res.send(error);

    })

});

router.delete('/reservas/:id',(req,res,next)=>{

    reservations.delete(req.params.id).then(results=>{

        res.send(results);

    }).catch(error=>{

        res.send(error);

    });

});

router.get('/usuarios',(req,res,next)=>{

    users.getUsers().then(results=>{

        res.render("admin/users",{
            menus: req.menus,
            user: req.session.user,
            loginUser: results
        });

    })

});

router.post('/usuarios',(req,res,next)=>{

    users.save(req.fields).then(results=>{

        res.send(results);

    }).catch(error=>{

        res.send(error);

    })

});

router.post('/usuarios/password-change',(req,res,next)=>{

    users.changePassword(req).then(results=>{

        res.send(results);


    }).catch(error=>{

        res.send(error);

    });

})

router.delete('/usuarios/:id',(req,res,next)=>{

    users.delete(req.params.id).then(results=>{

        res.send(results);

    }).catch(error=>{
        
        res.send(error);
    })

})


module.exports = router;