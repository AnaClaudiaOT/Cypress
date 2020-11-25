/// <reference types="cypress" />


Given(/^que o site nao possui registros$/, () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fixture:webtable-get-empty'
    }).as('getNewtable');
});

When(/^o usuario acessar a listagem$/, () => {
    cy.visit('WebTable.html')

});

Then(/^o usario deve visualizar a lista vazia$/, () => {
    cy.get('div[role=row').should('have.length', 1);
});

Given(/^que o site possua apenas um registro$/, () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fx:webtable-get-only'
    })
});

Then(/^o usuario devera visualizar apenas um registro$/, () => {
    cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');
    cy.get('@gridCellPhone').should('contain.text', '0939995122')
});

