describe('page01 - example1a', () => {
  before(() => {

  })

  it('test01.1', () => {
    cy.visit('http://localhost:4200/page01');
    cy.contains('page01 - example1a');

    // begin start page 1
    cy.log('begin start page 1');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').contains('1 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('not.exist');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 1/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 1/10');
    // end start page 1

    // begin page next 2
    cy.log('begin page next 2');
    cy.get('.panelMaster .panelNavbar1 .btnNext').click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').contains('2 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 2');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('not.exist');

    cy.get('.panelDetail').children().should('have.length', 15);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 2/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 2/15');
    // end page next 2

    // begin page next 3
    cy.log('begin page next 3');
    cy.get('.panelMaster .panelNavbar1 .btnNext').click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').contains('3 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 3');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('not.exist');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 3/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 3/10');
    // end page next 3

    // begin page last 99
    cy.log('begin page last 99');
    cy.get('.panelMaster .panelNavbar1 .btnLast').click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.disabled');
    cy.get('.panelMaster .navbarStatus').contains('99 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 99');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('not.exist');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 99/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 99/10');
    // end page last 99

    // begin page prev 98
    cy.log('begin page last 98');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').contains('98 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 98');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('not.exist');

    cy.get('.panelDetail').children().should('have.length', 15);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 98/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 98/15');
    // end page prev 98

    // begin page prev 97
    cy.log('begin page last 97');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').contains('97 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 97');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('not.exist');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 97/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 97/10');
    // end page prev 97

    // begin page first 1
    cy.log('begin page first 1');
    cy.get('.panelMaster .panelNavbar1 .btnFirst').click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.disabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').contains('1 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('not.exist');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 1/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 1/10');
    // end page first 1

    // begin page next 2
    cy.log('begin page next 2');
    cy.get('.panelMaster .panelNavbar1 .btnNext').click();
    cy.get('.panelMaster .panelNavbar1 .btnFirst').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnNext').should('be.enabled');
    cy.get('.panelMaster .panelNavbar1 .btnLast').should('be.enabled');
    cy.get('.panelMaster .navbarStatus').contains('2 of 99');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 2');
    cy.get('.panelMaster .panelNavbarSx .btnMenu').should('contain', 'menu');
    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('not.exist');

    cy.get('.panelDetail').children().should('have.length', 15);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 2/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 2/15');
    // end page next 2
  })
})
