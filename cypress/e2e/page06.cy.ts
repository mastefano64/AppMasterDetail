describe('page06 - example1f', () => {
  before(() => {

  })

  it('test06.1', () => {
    cy.visit('http://localhost:4200/page06');
    cy.contains('page06 - example1f');

    // begin start page 1 - card
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').contains('1 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 1/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 1/10');
    // end start page

    // begin change view and page
    cy.get('.panelMaster .panelNavbarDx .selectView').find('.mat-button-toggle-button').contains('Card').click();
    cy.get('.panelMaster .panelNavbarDx .selectView').find('.mat-button-toggle-button').contains('Table').click();
    cy.get('.panelMaster .panelNavbar1 .btnNext').click();

    // end change view and page

    // begin start page 2 - table
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').contains('2 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 2');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('contain', '-- All --');

    cy.get('.panelDetail .datatable-group-header').should('have.length', 1);
    cy.get('.panelDetail .datatable-group-header').should('contain', 'No gruping');

    cy.get('.panelDetail .datatable-body-row').should('have.length', 15);
    cy.get('.panelDetail .datatable-body-row').first().should('contain', 'dfield1 2/1');
    cy.get('.panelDetail .datatable-body-row').last().should('contain', 'dfield1 2/15');
    // end start page

    // begin change Typedetail1
    cy.get('.panelMaster .panelNavbarCx .selectGroup').click().get('mat-option').contains('Typedetail1').click();
    cy.get('.panelDetail .datatable-body-row').should('have.length', 0);
    cy.get('.panelDetail .tableGroupExpand').should('contain', 'Expand all').and('contain', 'Collapse all');
    cy.get('.panelDetail .tableGroupExpand').contains('Expand all').click();

    cy.get('.panelDetail .datatable-group-header').should('have.length', 2);
    cy.get('.panelDetail .datatable-group-header').eq(0).should('contain', 'category2');
    cy.get('.panelDetail .datatable-group-header').eq(1).should('contain', 'category1');
    cy.get('.panelDetail .datatable-body-row').should('have.length', 15);
    cy.get('.panelDetail .datatable-body-row').eq(1).should('contain', 'name 3').and('contain', 'category2');
    cy.get('.panelDetail .datatable-body-row').eq(9).should('contain', 'name 4').and('contain', 'category1');
    // end start page

    // begin change Typedetail2
    cy.get('.panelMaster .panelNavbarCx .selectGroup').click().get('mat-option').contains('Typedetail2').click();
    cy.get('.panelDetail .datatable-body-row').should('have.length', 0);
    cy.get('.panelDetail .tableGroupExpand').should('contain', 'Expand all').and('contain', 'Collapse all');
    cy.get('.panelDetail .tableGroupExpand').contains('Expand all').click();

    cy.get('.panelDetail .datatable-group-header').should('have.length', 1);
    cy.get('.panelDetail .datatable-group-header').eq(0).should('contain', 'category3');
    cy.get('.panelDetail .datatable-body-row').should('have.length', 15);
    cy.get('.panelDetail .datatable-body-row').eq(1).should('contain', 'name 2').and('contain', 'category1');
    cy.get('.panelDetail .datatable-body-row').eq(8).should('contain', 'name 9').and('contain', 'category2');
    // end start page


  })


})
