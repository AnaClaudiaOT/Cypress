/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {

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

        // type
        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^=Last]').type(chance.last());
        cy.get('input[ng-model^=Email]').type(chance.email());
        cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false }));

        //check -> radios e checkboxes
        cy.get('input[value=FeMale]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');


        //check -> elementos select & select 2(combos - elementos: Opçoes / Habilidades / Cidade / Estado)
        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Antarctica');
        cy.get('select#country').select('India', { force: true });
        cy.get('select#yearbox').select('1992');
        cy.get('select[ng-model^=month]').select('March');
        cy.get('select#daybox').select('16');
        cy.get('input#firstpassword').type('Agilizei123');
        cy.get('input#secondpassword').type('Agilizei123');

        // AttachFile -> input File
        cy.get('input#imagesrc').attachFile('photo.png');

        // click (submit)
        cy.get('button#submitbtn').click();

        cy.wait('@postNewtable').then((resNewtable) => {
            console.log(resNewtable.status)
            cy.log(resNewtable.status)
            expect(resNewtable.status).to.eq(200)
        })
        //chai
        cy.wait('@postUsertable').then((resUsertable) => {
            expect(resUsertable.status).to.eq(200)
        })

        cy.wait('@getNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200)
        })

        cy.url().should('contain', 'WebTable');



    });
});


// input[placeholder="First Name"]
// input[ng-model^=Last]
// input[ng-model^=Email]
// input[ng-model^=Phone]
// input[value=FeMale]
// input[type=checkbox]
// select#Skills
// select#countries
// select#country
// select#yearbox
// select[ng-model^=month]
// select#daybox
// input#firstpassword
// input#secondpassword
// input#imagesrc
// button#submitbtn


//  // type
//  cy.get('input[placeholder="First Name"]').type('Aluno')
//  cy.get('input[ng-model^=Last]').type('Agilizei')
//  cy.get('input[ng-model^=Email]').type('aluno@mail.com')
//  cy.get('input[ng-model^=Phone]').type('1198745632')

//   //check -> radios e checkboxes
//  cy.get('input[value=FeMale]').check()
//  cy.get('input[type=checkbox]').check('Cricket')
//  cy.get('input[type=checkbox]').check('Hockey')


//  //check -> elementos select & select 2(combos - elementos: Opçoes / Habilidades / Cidade / Estado)
//  cy.get('select#Skills').select('Javascript')
//  cy.get('select#countries').select('Antarctica')
//  cy.get('select#country').select('India', {force:true})
//  cy.get('select#yearbox').select('1992')
//  cy.get('select[ng-model^=month]').select('March')
//  cy.get('select#daybox').select('16')
//  cy.get('input#firstpassword').type('Agilizei123');
//  cy.get('input#secondpassword').type('Agilizei123');