# Restaurante-Saboroso

# Como foi feito esse sistema ?

>  Na parte do Frond-end nós usamos o tradicional html5, css3 e javascript, o site é todo responsivo cada página
 
> Na parte do Back-end é onde faz todo o sistema funcionar, usamos o poder do node junto com o express trabalhando com rotas, banco de dados mysql, formidable para envio de formulários e uplod de imagens e para tudo isso utilizando a engine EJS.

 ### O que é a Engine EJS?

> O EJS é uma engine de visualização, com ele conseguimos de uma maneira fácil e simples transportar dados do back-end para o front-end, basicamente conseguimos utilizar códigos em javascript no html de nossas páginas.

> Exemplo de um código na engine EJS: 

>> 
```          
                <% reservas.forEach(results => { %> 
                <tr data-results="<%=JSON.stringify(results); %> ">
                  <td><%= results.id %> </td>
                  <td><%= results.name %> </td>
                  <td><%= results.email %> </td>
                  <td><%= results.people %> </td>
                  <td><%= moment(results.date).format("DD [de] MMMM [de] YYYY")  %> </td>
                  <td><%= results.time %> </td>
                  <td><button type="button" class="btn btn-xs btn-info btn-update"><i
                        class="fa fa-pencil"></i> Editar</button>&nbsp;<button type="button" class="btn btn-xs btn-danger btn-delete"><i
                        class="fa fa-trash"></i> Excluir</button></td>
                </tr>
                <%  }) %> 
                
```
                

> No código acima é trecho de código do próprio sistema pegamos variável results que foi criada no back-end e transportamos para o frond-end dessa forma, essa variável armazena os resultados que vem do banco de dados, ali na segunda linha de código usamos o dataset para armazenar os dados dessa tr e passamos os dados para string com o __JSON.stringify__ e depois em outro trecho de codigo passamos esses dados para objeto com __JSON.parse__ para poder editar ou excluir esses dados, ali nas td tem o results.alguma coisa que são colunas das tabelas do banco de dados mysql e fazemos isso em várias outras partes do sistema.

> Em umas das td tem a palavra __moment__, o moment é uma biblioteca para formatar datas da forma que você quiser e eu formatei a data que vem do banco de dados para ficar melhor para o usuário ver.
## O que oferecemos em nosso site
> O projeto restaurante saboroso é a idéia de um site mostrando os serviços que este restaurante oferece, no site também é possível cadastrar seu email para receber novidades do restaurante, você pode mandar uma mensagem passando seu feedback para nós na aba de contatos, na aba menu é possível ver nosso cardapio e esse cardapio é adicionado no site através no painel de controle e na aba reservas e na home você pode fazer uma reserva através do nosso site passando sua indentidade, o dia e o horário da sua reserva.

## O que nosso painel de controle consegue fazer ?

> Para acessar o painel é necessário fazer um login então nessa parte trabalhamos com as session em node, para usar session é necessário baixar algumas dependência via terminal com o npm ou yarn o comando é: __npm install express-session__ talvez precise do RedisStore.

> Depois que acessa o painel lá é possível ver quantas __reservas__ foram feitas, quantos __emails__ foram cadastrados, quantos __contatos__ foram enviados para nós, quantos itens tem no __menu__ e quantos __usuários__ podem acessar aquele painel e também conseguimos listar os dados que os usuários preencheu no site para poder editar ou excluir esses dados, em todas abas tem como editar e excluir as linhas que contém os dados para fazer isso tem um botão para cada ação.

![Página Inicial](img/paginaInicial.png)

> No painel na aba usuários tem um botão __alterar senha__ nesse botão tem todo aquele sistema de esqueceu sua senha, lá pede para o usuário digitar uma nova senha e confirmar em baixo e tem a validação se caso as senhas não forem iguais nos dois inputs vai gerar um erro.

> Na aba menus e reservas é possível fazer um novo cadastro então usamos o insert para fazer essa ação.

> Para trabalhar com banco de dados mysql no node precisamos baixar a dependência mysql2 o comando é: __npm install --save mysql2__ e para poder usar mesmo precisamos configurar o banco com este código:

>> 
~~~~ 
const mysql = require('mysql2');
// fazendo o node conectar com o mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'saboroso',
    password: '',
    multipleStatements: true
  });
  ~~~~
  
  > Usando as query no banco insert e update:

~~~~
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
~~~~

> no código acima usamos o método query para usar as query do banco de dados, esse comando requer a query que você vai utilizar, os parâmetros do formulário, o erro e o results que significa que deu certo sua query e retorno o que você queria, e com esse método é possivel usar qualquer query da linguagem SQL.

## Chart JS

> No painel usamos a biblioteca do chart js para inserir graficos em nosso sistema e funcionar da seguinte forma: quando você vai fazer a reserva nos pedimos a data que você quer para reserva então vem o dia, mês e ano depois pegamos a tabela  onde fica as reservas e usamos a query __SELECT__ com o __BETWEEN__ e usamos dois input para filtrar essas datas então um exemplo você pode filtrar as reservas da data 01/01/2020 entre 01/01/2021 e o resultado jogamos no gráfico ai vai pegar quantas reservas teve aquele mês daquele ano.

> query para fazer o gráfico funcionar:

>> 
~~~~
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
                    let month = [];
                    let values = [];


                    results.forEach(row=>{

                        month.push(moment(row.date).format('MMMM YYYY'))
                        values.push(row.total)

                    })

                    resolve({
                        month,
                        values
                    });
~~~~









