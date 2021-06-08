const connection = require('./db');

class Pagination {

    constructor(query, params = [], itensPerPage = 10){


        this.query = query;
        this.params = params;
        this.itensPerPage = itensPerPage;
        this.currentPage = 1;

    }


    getPage(page){

        this.currentPage = page - 1;

        this.params.push(
            this.currentPage * this.itensPerPage,
            this.itensPerPage
        )

        return new Promise((resolve,reject)=>{

            connection.query([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(";"),this.params,(error, results)=>{

                if(error){
                    reject(error);

                } else {

                    this.data = results[0];
                    this.total = results[1][0].FOUND_ROWS;
                    this.totalPages = Math.ceil(this.total / this.itensPerPage);
                    this.currentPage++

                    resolve(this.data);

                }

            });

        })

    }

    getTotal(){

        return this.total;

    }

    getCurrentPage(){

        return this.currentPage;

    }

    getTotalPages(){

        return this.totalPages;

    }

    getNavegation(params){

       
        let limitPagesNav = 5;  // variavel que guarda o tanto de links na paginas devem mostrar
        let links = [];
        let start = 0;
        let end = 0;

        if(this.getTotalPages() < limitPagesNav ){

            limitPagesNav = this.getTotalPages();

        }

        //se estamos na primeira pagina
        if((this.getCurrentPage() - parseInt(limitPagesNav/2)) < 1){

            start = 1;
            end = limitPagesNav;

        } else if((this.getCurrentPage() + parseInt(limitPagesNav/1)) > this.getTotalPages()){

            start = this.getTotalPages() - limitPagesNav;
            end = this.getTotalPages();

        } else {

            start = this.getCurrentPage() - parseInt(limitPagesNav/2);
            end = this.getCurrentPage() + parseInt(limitPagesNav/2);

        }

    
        if(this.getCurrentPage() > 1){

            links.push({
                text: '<',
                href: '?' + this.getQueryString(Object.assign({}, params, {page: this.getCurrentPage() - 1}))
            })

        }

        for(let x = start; x <= end; x++){

            links.push({
                text: x,
                href: '?' + this.getQueryString(Object.assign({}, params, {page: x})),
                active: (x == this.getCurrentPage())
            })

        }

        if(this.getCurrentPage() < this.getTotalPages()){

            links.push({
                text: '>',
                href: '?' + this.getQueryString(Object.assign({}, params, {page: this.getCurrentPage() + 1}))
            })


        }

   
        return links;




    }

    getQueryString(params){
        
        let queryString = [];

        for(let name in params){

            queryString.push(`${name}=${params[name]}`);

            return queryString.join("&")

        }
    }


}


module.exports = Pagination;