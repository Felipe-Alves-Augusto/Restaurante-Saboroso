# Restaurante-Saboroso

# Como foi feito esse sistema ?

>  Na parte do Frond-end nós usamos o tradicional html5, css3 e javascript, o site é todo responsivo cada página
 
> Na parte do Back-end é onde faz todo o sistema funcionar, usamos o poder do node junto com o express trabalhando com rotas, banco de dados mysql, formidable para envio de formulários e uplod de imagens e para tudo isso utilizando a engine EJS.

 ### O que é a Engine EJS?

>> O EJS é uma engine de visualização, com ele conseguimos de uma maneira fácil e simples transportar dados do back-end para o front-end, basicamente conseguimos utilizar códigos em javascript no html de nossas páginas.

> Exemplo de um código na engine EJS: 

> ~~~~           <% reservas.forEach(results => { %> 
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
                <%  }) %> ~~~~


## O que oferecemos em nosso site
> O projeto restaurante saboroso é a idéia de um site mostrando os serviços que este restaurante oferece, no site também é possível cadastrar seu email para receber novidades do restaurante, você pode mandar uma mensagem passando seu feedback para nós na aba de contatos, na aba menu é possível ver nosso cardapio e esse cardapio é adicionado no site através no painel de controle e na aba reservas e na home você pode fazer uma reserva através do nosso site passando sua indentidade, o dia e o horário da sua reserva
