describe('page03 - example1a', () => {
  before(() => {

  })

  it('test03.1', () => {
    cy.visit('http://localhost:4200/page03');
    cy.contains('page03 - example1c');

    // begin start page 1 - card
    cy.log('begin start page 1 - card');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    //cy.get('.panelMaster .navbarStatus').contains('1 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 1/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 1/10');
    // end start page

    // begin start page 1 -table
    cy.log('begin start page 1 -table');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').find('.mat-button-toggle-button').contains('Table').click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    //cy.get('.panelMaster .navbarStatus').contains('1 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');

    cy.get('.panelDetail .datatable-row-wrapper').children().should('have.length', 10);
    cy.get('.panelDetail .datatable-row-wrapper').children().first().should('contain', 'dfield1 1/1');
    cy.get('.panelDetail .datatable-row-wrapper').children().last().should('contain', 'dfield1 1/10');
    // end start page 1 -table

    // begin start page 1 - card
    cy.log('begin start page 1 - card');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').find('.mat-button-toggle-button').contains('Table').click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    //cy.get('.panelMaster .navbarStatus').contains('1 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');

    cy.get('.panelDetail .datatable-row-wrapper').children().should('have.length', 10);
    cy.get('.panelDetail .datatable-row-wrapper').children().first().should('contain', 'dfield1 1/1');
    cy.get('.panelDetail .datatable-row-wrapper').children().last().should('contain', 'dfield1 1/10');
    // end start page 1 - card

  })

  it('test03.2', () => {
    cy.visit('http://localhost:4200/page03');
    cy.contains('page03 - example1c');

    // begin start page 1
    cy.log('begin start page 1');
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('1');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('2');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('3');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('4');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('5');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    // end start page 1

    // begin start page 2
    cy.log('begin start page 2');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 2');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('1');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('2');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('3');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('4');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('5');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    // end start page 2

    // begin start page 3
    cy.log('begin start page 3');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 3');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('1');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('2');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('3');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('4');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('5');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    // end start page 3

    // begin start page 4
    cy.log('begin start page 4');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 4');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('1');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('2');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('3');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('4');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('5');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    // end start page 4

    // begin start page 5
    cy.log('begin start page 5');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 5');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('3');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('4');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('5');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('6');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('7');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    // end start page 5

    // begin start page 99
    cy.log('begin start page 99');
    cy.get('.panelMaster .panelNavbar1 .btnLast').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 99');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.disabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('95');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('96');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('97');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('98');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('99');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    // end start page 99

    // begin start page 98
    cy.log('begin start page 98');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 98');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('95');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('96');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('97');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('98');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('99');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    // end start page 98

    // begin start page 97
    cy.log('begin start page 97');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 97');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('95');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('96');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('97');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('98');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('99');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    // end start page 97

    // begin start page 96
    cy.log('begin start page 96');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 96');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('95');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('96');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('97');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('98');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('99');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    // end start page 96

    // begin start page 95
    cy.log('begin start page 95');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 95');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('93');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('94');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('95');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('96');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('97');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    // end start page 95

    // begin start page 1
    cy.log('begin start page 1');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('1');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('2');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('3');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('4');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('5');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    // end start page 1
  })

  it('test03.3', () => {
    cy.visit('http://localhost:4200/page03');
    cy.contains('page03 - example1c');

    // begin start page 1
    cy.log('begin start page 1');
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').children().should('have.length', 5);
    cy.get('.panelMaster .navbarStatus').children().eq(0).contains('1');
    cy.get('.panelMaster .navbarStatus').children().eq(0).find('.navbarCellNum').should('have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(1).contains('2');
    cy.get('.panelMaster .navbarStatus').children().eq(1).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains('3');
    cy.get('.panelMaster .navbarStatus').children().eq(2).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains('4');
    cy.get('.panelMaster .navbarStatus').children().eq(3).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains('5');
    cy.get('.panelMaster .navbarStatus').children().eq(4).find('.navbarCellNum').should('not.have.class', 'navbarCellsActive');
    // end start page 1

    // begin menu
    cy.log('begin menu');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').click();

    cy.get('.panelMasterListSide .listSideMaster').children().should('have.length', 99);
    cy.get('.panelMasterListSide .listSideMaster').children().first().should('contain', 'name 1');
    cy.get('.panelMasterListSide .listSideMaster').children().last().should('contain', 'name 99');

    cy.get('.panelMasterListSide .inputsearch input').clear();
    cy.get('.panelMasterListSide .inputsearch input').type('1234');
    cy.get('.panelMasterListSide .listSideMaster').should('not.exist');

    cy.get('.panelMasterListSide .inputsearch input').clear();
    cy.get('.panelMasterListSide .inputsearch input').type('name 2');
    cy.get('.panelMasterListSide .listSideMaster').children().should('have.length', 11);

    cy.get('.panelMasterListSide .inputsearch input').clear();
    cy.get('.panelMasterListSide .inputsearch input').type('name 20');
    cy.get('.panelMasterListSide .listSideMaster').children().should('have.length', 1);

    cy.get('.panelMasterListSide .inputsearch input').clear();
    cy.get('.panelMasterListSide .inputsearch input').type('name 30');
    cy.get('.panelMasterListSide .listSideMaster').children().should('have.length', 1);

    cy.get('.panelMasterListSide .inputsearch input').clear();
    cy.get('.panelMasterListSide .inputsearch input').type(' ');
    cy.get('.panelMasterListSide .listSideMaster').children().should('have.length', 99);
    // end menu

    // begin click menu 3
    cy.log('begin click menu 3');
    cy.get('.panelMasterListSide .inputsearch input').clear();
    cy.get('.panelMasterListSide .inputsearch input').type(' ');
    cy.get('.panelMasterListSide .listSideMaster').children().should('have.length', 99);
    cy.get('.panelMasterListSide .listSideMaster').children().eq(2).click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 3');
    cy.get('.panelDetail .panelDetailRows').children().should('have.length', 10);
    cy.get('.panelDetail .panelDetailRows').children().first().should('contain', 'dfield1 3/1');
    cy.get('.panelDetail .panelDetailRows').children().last().should('contain', 'dfield1 3/10');
    // end click menu 3

    // begin click menu 4
    cy.log('begin click menu 4');
    cy.get('.panelMasterListSide .inputsearch input').clear();
    cy.get('.panelMasterListSide .inputsearch input').type(' ');
    cy.get('.panelMasterListSide .listSideMaster').children().should('have.length', 99);
    cy.get('.panelMasterListSide .listSideMaster').children().eq(3).click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 4');
    cy.get('.panelDetail .panelDetailRows').children().should('have.length', 15);
    cy.get('.panelDetail .panelDetailRows').children().first().should('contain', 'dfield1 4/1');
    cy.get('.panelDetail .panelDetailRows').children().last().should('contain', 'dfield1 4/15');
    // end click menu 4

    // begin click menu 1
    cy.log('begin click menu 1');
    cy.get('.panelMasterListSide .inputsearch input').clear();
    cy.get('.panelMasterListSide .inputsearch input').type(' ');
    cy.get('.panelMasterListSide .listSideMaster').children().should('have.length', 99);
    cy.get('.panelMasterListSide .listSideMaster').children().eq(0).click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelDetail .panelDetailRows').children().should('have.length', 10);
    cy.get('.panelDetail .panelDetailRows').children().first().should('contain', 'dfield1 1/1');
    cy.get('.panelDetail .panelDetailRows').children().last().should('contain', 'dfield1 1/10');
    // end click menu 1
  })
})
