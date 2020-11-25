Given(/^que o usuario acessa o site$/, () => {
    //rotas
    // POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    // POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    // GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    // Cy.route (Qual o método? , Qual a rota? **não importa qual o host / ** não importa o que vem depois API) as (salvar a routa como uma variável temporária - ALIAS?)
    cy.server();
    cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**').as('postNewtable');
    cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**').as('postUsertable');
    cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**').as('getNewtable');

    cy.visit('Register.html');

});