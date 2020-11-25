// implementação dos passos descritos na feature
/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();




When(/^o usuario informar seus dados$/, () => {
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

});

When(/^o usuario clicar em salvar$/, () => {
    cy.get('button#submitbtn').click();
});

Then(/^o usuario devera ser cadastrado com sucesso$/, () => {
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
