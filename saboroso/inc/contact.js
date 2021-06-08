
let connection = require('./db');

module.exports = {

    render(req,res,error,sucesso){

        res.render('contact',{
            title: 'Contato - Restaurante Saboroso!',
            background: 'images/img_bg_3.jpg',
            headerTitle: 'Diga um OI !',
            body: req.body,
            error,
            sucesso

          });


    },

    TbContacts(campos){

        return new Promise((resolve, reject)=>{

            connection.query(`INSERT INTO tb_contacts (name, email, message) VALUES (?,?,?)`,
        
            [
                campos.name,
                campos.email,
                campos.message
            ],(error,results)=>{
    
                if(error){
                   reject(error);
                } else{
                    resolve(results);
                }
    
            })

        })

    

    },

    getContato(){

        return new Promise((resolve,reject)=>{

                connection.query(`

                SELECT * FROM tb_contacts ORDER BY id
            
            `,(error,results)=>{

                if(error){
                    reject(error);

                } else {

                    resolve(results);

                }

            });

        });

    },

    delete(id){

        return new Promise((resolve, reject)=>{

            connection.query(`
            
                DELETE FROM tb_contacts WHERE id = ?
            
            `,[
                id
            ],(error, results)=>{

                if(error){

                    reject(error);

                } else {

                    resolve(results);

                }

            })

        })

    }

}