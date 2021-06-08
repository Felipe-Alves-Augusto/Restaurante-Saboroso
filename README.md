# Restaurante-Saboroso

# Como foi feito esse sistema ?

>  Na parte do Frond-end nós usamos o tradicional html5, css3 e javascript, o site é todo responsivo cada página
 
> Na parte do Back-end é onde faz todo o sistema funcionar, usamos o poder do node junto com o express trabalhando com rotas, banco de dados mysql, formidable para envio de formulários e uplod de imagens e para tudo isso utilizando a engine EJS.

 ### O que é a Engine EJS?

> O EJS é uma engine de visualização, com ele conseguimos de uma maneira fácil e simples transportar dados do back-end para o front-end, basicamente conseguimos utilizar códigos em javascript no html de nossas páginas.

> Exemplo de um código na engine EJS: 

>> ```          <% reservas.forEach(results => { %> 
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
                <%  }) %> ```
                

> No código acima é trecho de código do próprio sistema pegamos variável results que foi criada no back-end e transportamos para o frond-end dessa forma, essa variável armazena os resultados que vem do banco de dados, ali na segunda linha de código usamos o dataset para armazenar os dados dessa tr e passamos os dados para string com o __JSON.stringify__ e depois em outro trecho de codigo passamos esses dados para objeto com __JSON.parse__ para poder editar ou excluir esses dados, ali nas td tem o results.alguma coisa que são colunas das tabelas do banco de dados mysql.

> Em umas das td tem a palavra __moment__, o moment é uma biblioteca para formatar datas da forma que você quiser e eu formatei a data que vem do banco de dados para ficar melhor para o usuário ver
## O que oferecemos em nosso site
> O projeto restaurante saboroso é a idéia de um site mostrando os serviços que este restaurante oferece, no site também é possível cadastrar seu email para receber novidades do restaurante, você pode mandar uma mensagem passando seu feedback para nós na aba de contatos, na aba menu é possível ver nosso cardapio e esse cardapio é adicionado no site através no painel de controle e na aba reservas e na home você pode fazer uma reserva através do nosso site passando sua indentidade, o dia e o horário da sua reserva

## O que nosso painel de controle consegue fazer ?

> Para acessar o painel é necessário fazer um login então nessa parte trabalhamos com as session em node, para usar session é necessário baixar algumas depêndencias via terminal com o npm ou yarn o comando é: __npm install express-session__ talvez precise do RedisStore.

> Depois que acessa o painel lá é possível ver quantas __reservas__ foram feitas, quantos __emails__ foram cadastras, quantos __contatos__ foram enviados para nós, quantos itens tem no __menu__ e quantos __usuários__ podem acessar aquele painel.

![](img/paginaInicial.png)
