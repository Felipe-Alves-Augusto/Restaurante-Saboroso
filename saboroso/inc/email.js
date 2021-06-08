const connection = require('./db');
let menus = require('../inc/menus');
module.exports = {

    render(req,res,error,sucesso){

        menus.getMenus().then(results=>{

            res.render(
                'index',{
                    title: 'Restaurante Saboroso !' ,
                    menus: results,
                    body: req.body,
                    error,
                    sucesso
                });

        })

    },


    save(campo){

        return new Promise((resolve,reject)=>{

            connection.query(`
            
                INSERT INTO tb_emails (email) VALUES (?)
            
            `,[
                campo.email
            ],(error,results)=>{

                if(error){
                    reject(error);

                } else {

                    resolve(results);
                    
                }

            })

        })

    },



    getEmail(){

        return new Promise((resolve,reject)=>{

            connection.query(`
        
                SELECT * FROM tb_emails ORDER BY id
        
            `,(error, results)=>{

                if(error){
                    reject(error)

                        
                } else {
                    resolve(results);

                }

            });

        })

    },

    delete(id){

        connection.query(`
        
            DELETE FROM tb_emails WHERE id = ?
        
        `,[
            id
        ],(error, results)=>{

            if(error){

                return error;

            } else {

                return results;

            }

        })

    }


}