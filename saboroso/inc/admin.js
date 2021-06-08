let connection = require('./db');

module.exports = {

    getDados(){

        return new Promise((resolve, reject)=>{

            connection.query(`
            SELECT
                (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,
                (SELECT COUNT(*) FROM tb_menus) AS nrmenus,
                (SELECT COUNT(*) FROM tb_reservations) AS nrreservations,
                (SELECT COUNT(*) FROM tb_users) AS nrusers,
                (SELECT COUNT(*) FROM tb_emails) AS nremails;
            
            `,(error,results)=>{

                if(error){
                    reject(error);

                } else {
                    resolve(results[0]);
                }

            })

        })


    },

    // criando um objeto para cada link do menu e deixando dinamico

    getMenus(req){

       let menus =  [
            {
                text: "Tela Inicial",
                href: "/admin/index",
                icon: "fa fa-home",
                active: false
            },

            {
                text: "Menu",
                href: "/admin/menu",
                icon: "fa fa-cutlery",
                active: false
            },

            {
                text: "Reservas",
                href: "/admin/reservas",
                icon: "fa fa-calendar-check-o",
                active: false
            },

            {
                text: "Contatos",
                href: "/admin/contato",
                icon: "fa fa-comments",
                active: false
            },

            {
                text: "Usuários",
                href: "/admin/usuarios",
                icon: "fa fa-users",
                active: false
            },

            {
                text: "E-mails",
                href: "/admin/email",
                icon: "fa fa-envelope",
                active: false
            },

        ]

        menus.map(menu=>{

            if(menu.href == `/admin${req.url}`) menu.active = true;
            console.log(menu, menu.href);

        })

        return menus;

       

    }

}