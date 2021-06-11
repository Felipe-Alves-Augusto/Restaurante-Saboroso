let connection = require('./db');
let Pagination = require("./../inc/Pagination");
let moment = require("moment");


module.exports = {

    /*
        metodo render com quatro parametros
        o req é a requisição do formulario que está no body
        o res é a resposta ent vai junto com o render para monstrar na tela
        error é a mensagem de erro
        sucesso é a mensagem de sucesso
    */

    render(req,res, error,sucesso){

        res.render('reservation',{
            title: 'Reserva - Restaurante Saboroso!',
            background: 'images/img_bg_2.jpg',
            headerTitle: 'Reserve uma Mesa!',
            body: req.body,
            error,
            sucesso
          });
    },

    /*
        o metodo save com o parametro campos que são os campos do formulario
        estamos retornando uma promisa porque o formulario requer um processo
        usando a query e inserindo com o INSERT
    */

    save(campos){
        
        return new Promise((resolve, reject)=>{

            let date = campos.date.split('/');

            campos.date = `${date[2]}-${date[1]}-${date[0]}`;

            let query, params;

            if(parseInt(campos.id) > 0){

                query = `
                
                    UPDATE tb_reservations SET name = ?,
                    email = ?,
                    people = ?,
                    date = ?,
                    time = ?
                    WHERE id = ?
                
                `;
                params = [
                    campos.name,
                    campos.email,
                    campos.people,
                    campos.date,
                    campos.time,
                    campos.id
                ];

            } else {

                query = `
                    INSERT INTO tb_reservations (name, email, people, date, time) VALUES (?,?,?,?,?)
                
                `;
                params = [
                    campos.name,
                    campos.email,
                    campos.people,
                    campos.date,
                    campos.time
                ];

            };

            connection.query(query,params,(error,results)=>{

                if(error){
                    reject(error);
                }

                resolve(results);
                
            })

        })

    },

    getReservation(req){

        return new Promise((resolve,reject)=>{

            let page = req.query.page;
            let dtStart = req.query.start;
            let dtEnd = req.query.end;

            if(!page) page = 1;

            let params = [];
    
            if(dtStart && dtEnd) params.push(dtStart, dtEnd);
    
            let pagination = new Pagination(
                `
                    SELECT SQL_CALC_FOUND_ROWS *
                    FROM tb_reservations
                    ${(dtStart && dtEnd) ? 'WHERE date BETWEEN ? AND ?' : ''}
                    ORDER BY id LIMIT ?, ?
                
                `,
                params
            )
    
             pagination.getPage(page).then(data=>{

                resolve({
                    data,
                    links: pagination.getNavegation(req.query)
                })

             })

        });


    },

    delete(id){

        return new Promise((resolve,reject)=>{

            connection.query(`
            
                DELETE FROM tb_reservations WHERE id = ?
            
            `,[
                id
            ],(error,results)=>{

                if(error){
                    reject(error);

                } else {

                    resolve(results);

                }

            });


        });

    },

    chart(req){
        // passamos req como parametro para pegar o start e o end dos inputs das datas
        return new Promise((resolve, reject)=>{


            connection.query(`
            
            SELECT 
            concat(YEAR(date), '-', MONTH(date)) AS date,
            COUNT(*) AS total,
            SUM(people) / COUNT(*) AS avg_people
            FROM tb_reservations
            WHERE 
                date between ? AND ?
                group by YEAR(date) DESC, MONTH(date) DESC
                ORDER BY YEAR(date) DESC, MONTH(date) DESC
            
            `,[
                req.query.start,
                req.query.end
            ],(error,results)=>{

                if(error){
                    reject(error);

                } else {
                    let month = []; // para pegar o mes daquela reserva
                    let values = []; // para o valor(quantidade) de quantas reservas tem naquele mes

                    // já que vão vim varios registros precisamos fazer um forEach no resultado da query para percorrer todas as linhas e para cada um que encontrar faz um push e formata aquela data na forma ideal
                    results.forEach(row=>{

                        month.push(moment(row.date).format('MMMM YYYY'))
                        values.push(row.total)

                    })

                    // mandamos os resultados formtados e corretos
                    resolve({
                        month,
                        values
                    });

                }

            })

        })

    },


    dashboard(){

        return new Promise((resolve,reject)=>{


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

    }


}