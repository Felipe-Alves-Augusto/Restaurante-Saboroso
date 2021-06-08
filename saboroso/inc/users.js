
var connection = require("./db");

module.exports = {

    render(req,res,error){

        res.render('admin/login',{

            body:req.body,
            error

        })

    },

    /* 
        sistema de login
        verificando se tem o email
    */
    login(email,senha){

        return new Promise((resolve,reject)=>{

            connection.query(`

                SELECT * FROM tb_users WHERE email = ?
            
            `,[
                email

            ],(error, results)=>{

                if(error){
                    reject(error);

                } else {

                    // se o email for valido vamos validar a senha
                    
                    if(!results.length > 0){
                        reject("Usuario/ou senha incorretos !");

                    } else {

                        let row = results[0];
                        //aqui estamos verificando a senha, se o campo for diferente da senha gravado no banco exibir o erro
                        if(row.password !== senha) {
                            reject("Usuario/ou senha incorretos !");

                        } else{
                            resolve(row);
                        }
                    }

                };

            });

        });

    },

    getUsers(){

        return new Promise((resolve, reject)=>{

            connection.query(`
            
                SELECT * FROM tb_users ORDER BY id
            
            `,(error,results)=>{

                if(error){
                    reject(error);

                } else {

                    resolve(results);

                }

            })

        })


    },

    save(fields){

        return new Promise((resolve,reject)=>{


            let query,params = [
                fields.name,
                fields.email
            ];

        if(parseInt(fields.id) > 0){

            params.push(fields.id);

            query = `
            
                UPDATE tb_users SET name = ?,
                email = ? WHERE id = ?
            
            `;
            
            

        } else {

            query = `

                INSERT INTO tb_users (name, email, password) VALUES(?, ?, ?)
            
            
            `;
            params.push(fields.password);

        }

            connection.query(query,params, (error,results)=>{

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
            
                DELETE FROM tb_users WHERE id = ?
            
            `,[
                id
            ],(error, results)=>{

                if(error){
                    reject(error);

                } else {

                    resolve(results);
                }

            });

        })

    },

    changePassword(req){

        return new Promise((resolve,reject)=>{

            if(!req.fields.password) {

                reject("Preencha uma nova senha !");


            } else if(req.fields.password !== req.fields.passwordConfirm){

                reject("Confirme a senha corretamente !");

            } else {

                connection.query(`

                    UPDATE tb_users SET password = ? WHERE id = ?
                
                `,[
                    req.fields.password,
                    req.fields.id
                ],(error, results)=>{

                    if(error){

                        reject(error);

                    } else {

                        resolve(results);

                    }

                })

            }

        })

    }

}