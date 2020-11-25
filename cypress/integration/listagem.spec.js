/// <reference types="cypress" />

context('Listagem', () => {
    it('Listagem sem registros', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fixture:webtable-get-empty'
        }).as('getNewtable');


        cy.visit('WebTable.html')

        cy.get('div[role=row').should('have.length', 1);
    });

    it('Listagem com apenas um registro', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtable-get-only'
        })
        cy.visit('WebTable.html')

        cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');
        cy.get('@gridCellPhone').should('contain.text', '0939995122')
        // tabela x posições eq(4)
        // 1 -> .first()
        // 2
        // 3 
        // 4 -> .eq(3) // posição 1 = 0//
        // 5 -> .last
    });
});
