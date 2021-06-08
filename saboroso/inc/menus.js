let path = require('path');
let connection = require('./db');

module.exports = {

    getMenus(){

        return new Promise((resolve,reject)=>{

            //listando os dados da tabela menus
            connection.query("SELECT * FROM tb_menus ORDER BY id",(err, results)=>{

                //se der o erro mostrar no console o erro
                if(err){
            
                  reject(err);
            
                }
            
                resolve(results);
            })

        })

    },

    save(fields, files){


        return new Promise((resolve, reject)=>{

            

            fields.photo = `images/${path.parse(files.photo.path).base}`;

            

            let query, queryPhoto = '', params = [
                fields.title,
                fields.description,
                fields.price
              
            ];

            if(files.photo.name){
                /*
                    se existir a foto fazemos um push no params para adicionar ela

                */
                queryPhoto = ',photo = ?';
                params.push(fields.photo);

            }

            // se no formulario existir um input id maior que 0 fazemos o update se não fazemos o insert
            if(parseInt(fields.id) > 0){

                // se for um update precisamos adicionar o id na variavel params
                params.push(fields.id);

                query = `

                    UPDATE tb_menus
                    SET title = ?,
                    description = ?,
                    price = ?
                    ${queryPhoto}
                    WHERE id = ?

                `;
                

            } else {

                // aqui eu estou falando que quando for fazer o insert a foto é obrigatoria
                if(!files.photo.name){
                    reject('Foto do prato obrigatoria');
                };

                query = `

                    INSERT INTO tb_menus (title,description,price,photo) VALUES (?,?,?,?);
                
                `;
            
            }

            connection.query(query,params,(error, results)=>{


                if(error){
                    reject(error);

                } else {

                    resolve(results);

                }
                
            });

        });

    },

    delete(id){

        return new Promise((resolve,reject)=>{

            connection.query(`

                DELETE FROM tb_menus WHERE id = ?

            
            `,[
                id
            ],(error,results)=>{

                if(error){
                    reject(error);

                } else {

                    resolve(results);

                }

            })

        })

    }

}