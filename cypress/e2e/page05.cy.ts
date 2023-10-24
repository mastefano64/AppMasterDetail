describe('page05 - example1d', () => {
  before(() => {

  })

  it('test05.1', () => {
    cy.visit('http://localhost:4200/page05');
    cy.contains('page05 - example1e');

    // begin start page 1 - card
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 1/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 1/10');
    // end start page

    // begin start page 1 - table
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').find('.mat-button-toggle-button').contains('Table').click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');

    cy.get('.panelDetail .datatable-row-wrapper').children().should('have.length', 10);
    cy.get('.panelDetail .datatable-row-wrapper').children().first().should('contain', 'dfield1 1/1');
    cy.get('.panelDetail .datatable-row-wrapper').children().last().should('contain', 'dfield1 1/10');
    // end start page 1 -table

    // begin open table extension panel
    //cy.get('.panelDetail .datatable-row-wrapper').children().eq(3).find('.tableExpansionAnchor').click();
    //cy.get('.panelDetail .datatable-row-wrapper').children().eq(3).find('.datatable-row-detail').should('exist');
    cy.get('.panelDetail .datatable-row-wrapper').eq(3).find('.tableExpansionAnchor').click();
    cy.get('.panelDetail .datatable-row-wrapper').eq(3).find('.datatable-row-detail').contains('dfield3 1/4');
    // end sopen table extension panel

     // begin change view
     cy.get('.panelMaster .panelNavbarDx .selectView').find('.mat-button-toggle-button').contains('Card').click();
     cy.get('.panelMaster .panelNavbarDx .selectView').find('.mat-button-toggle-button').contains('Table').click();
     // end change view

    // begin open table extension panel
    //cy.get('.panelDetail .datatable-row-wrapper').children().eq(5).find('.tableExpansionAnchor').click();
    //cy.get('.panelDetail .datatable-row-wrapper').children().eq(5).find('.datatable-row-detail').should('exist');
    cy.get('.panelDetail .datatable-row-wrapper').eq(5).find('.tableExpansionAnchor').click();
    cy.get('.panelDetail .datatable-row-wrapper').eq(5).find('.datatable-row-detail').contains('dfield3 1/6');
    // end sopen table extension panel
  })


})
