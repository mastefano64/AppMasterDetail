import { PagingData } from '../../src/app/appcore/datasource/pagingdata';

// https://stackoverflow.com/questions/43430558/how-can-i-bind-data-to-the-html-attribute-in-angular4
// $( "div" ).data( "test", { first: 16, last: "pizza!" } );

describe('page11 - example2h', () => {
  before(() => {

  })

  it('test11.1', () => {
    cy.visit('http://localhost:4200/page11');
    cy.contains('page11 - example2h');

    cy.get('.panelMaster .panelNavbarCx .selectGroup').should('not.exist');
    cy.get('.panelMaster .panelNavbarDx .selectView').should('exist');

    // begin start page 1
    cy.log('begin start page 1');
    cy.get('.buttonPagination .btnFirst').should('be.disabled');
    cy.get('.buttonPagination .btnPrev').should('be.disabled');
    cy.get('.buttonPagination .btnNext').should('be.enabled');
    cy.get('.buttonPagination .btnLast').should('be.enabled');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 1/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 1/10');

    //cy.get('.buttonPagination .navbarStatus').contains('1 of 99');
    cy.get('.buttonPagination').should('contain', '1 of 99').then(($param => {
      //debugger;
      const first = $param[0];
      const myproperty = (first as any).myProperty;
      const pagstatus = myproperty as PagingData;
      expect(pagstatus.page).to.equal(0);
      expect(pagstatus.pagesize).to.equal(1);
      expect(pagstatus.minPage).to.equal(0);
      expect(pagstatus.maxPage).to.equal(98);
      expect(pagstatus.count).to.equal(99);
      expect(pagstatus.hasFirstPage).to.equal(false);
      expect(pagstatus.hasPrevPage).to.equal(false);
      expect(pagstatus.hasNextPage).to.equal(true);
      expect(pagstatus.hasLastPage).to.equal(true);
    }));
    // end start page 1

    // begin page next 2
    cy.log('begin page next 2');
    cy.get('.buttonPagination .btnNext').click();
    cy.get('.buttonPagination .btnFirst').should('be.enabled');
    cy.get('.buttonPagination .btnPrev').should('be.enabled');
    cy.get('.buttonPagination .btnNext').should('be.enabled');
    cy.get('.buttonPagination .btnLast').should('be.enabled');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 2');

    cy.get('.panelDetail').children().should('have.length', 15);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 2/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 2/15');

    cy.get('.buttonPagination').should('contain', '2 of 99').then(($param => {
      //debugger;
      const first = $param[0];
      const myproperty = (first as any).myProperty;
      const pagstatus = myproperty as PagingData;
      expect(pagstatus.page).to.equal(1);
      expect(pagstatus.pagesize).to.equal(1);
      expect(pagstatus.minPage).to.equal(0);
      expect(pagstatus.maxPage).to.equal(98);
      expect(pagstatus.count).to.equal(99);
      expect(pagstatus.hasFirstPage).to.equal(true);
      expect(pagstatus.hasPrevPage).to.equal(true);
      expect(pagstatus.hasNextPage).to.equal(true);
      expect(pagstatus.hasLastPage).to.equal(true);
    }));
    // end page next 2

    // begin page next 3
    cy.log('begin page next 3');
    cy.get('.buttonPagination .btnNext').click();
    cy.get('.buttonPagination .btnFirst').should('be.enabled');
    cy.get('.buttonPagination .btnPrev').should('be.enabled');
    cy.get('.buttonPagination .btnNext').should('be.enabled');
    cy.get('.buttonPagination .btnLast').should('be.enabled');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 3');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 3/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 3/10');

    cy.get('.buttonPagination').should('contain', '3 of 99').then(($param => {
      //debugger;
      const first = $param[0];
      const myproperty = (first as any).myProperty;
      const pagstatus = myproperty as PagingData;
      expect(pagstatus.page).to.equal(2);
      expect(pagstatus.pagesize).to.equal(1);
      expect(pagstatus.minPage).to.equal(0);
      expect(pagstatus.maxPage).to.equal(98);
      expect(pagstatus.count).to.equal(99);
      expect(pagstatus.hasFirstPage).to.equal(true);
      expect(pagstatus.hasPrevPage).to.equal(true);
      expect(pagstatus.hasNextPage).to.equal(true);
      expect(pagstatus.hasLastPage).to.equal(true);
    }));
    // end page next 3

    // begin page last 99
    cy.log('begin page last 99');
    cy.get('.buttonPagination .btnLast').click();
    cy.get('.buttonPagination .btnFirst').should('be.enabled');
    cy.get('.buttonPagination .btnPrev').should('be.enabled');
    cy.get('.buttonPagination .btnNext').should('be.disabled');
    cy.get('.buttonPagination .btnLast').should('be.disabled');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 99');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 99/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 99/10');

    cy.get('.buttonPagination').should('contain', '99 of 99').then(($param => {
      //debugger;
      const first = $param[0];
      const myproperty = (first as any).myProperty;
      const pagstatus = myproperty as PagingData;
      expect(pagstatus.page).to.equal(98);
      expect(pagstatus.pagesize).to.equal(1);
      expect(pagstatus.minPage).to.equal(0);
      expect(pagstatus.maxPage).to.equal(98);
      expect(pagstatus.count).to.equal(99);
      expect(pagstatus.hasFirstPage).to.equal(true);
      expect(pagstatus.hasPrevPage).to.equal(true);
      expect(pagstatus.hasNextPage).to.equal(false);
      expect(pagstatus.hasLastPage).to.equal(false);
    }));
    // end page last 99

    // begin page prev 98
    cy.log('begin page last 98');
    cy.get('.buttonPagination .btnPrev').click();
    cy.get('.buttonPagination .btnFirst').should('be.enabled');
    cy.get('.buttonPagination .btnPrev').should('be.enabled');
    cy.get('.buttonPagination .btnNext').should('be.enabled');
    cy.get('.buttonPagination .btnLast').should('be.enabled');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 98');

    cy.get('.panelDetail').children().should('have.length', 15);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 98/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 98/15');

    cy.get('.buttonPagination').should('contain', '98 of 99').then(($param => {
      //debugger;
      const first = $param[0];
      const myproperty = (first as any).myProperty;
      const pagstatus = myproperty as PagingData;
      expect(pagstatus.page).to.equal(97);
      expect(pagstatus.pagesize).to.equal(1);
      expect(pagstatus.minPage).to.equal(0);
      expect(pagstatus.maxPage).to.equal(98);
      expect(pagstatus.count).to.equal(99);
      expect(pagstatus.hasFirstPage).to.equal(true);
      expect(pagstatus.hasPrevPage).to.equal(true);
      expect(pagstatus.hasNextPage).to.equal(true);
      expect(pagstatus.hasLastPage).to.equal(true);
    }));
    // end page prev 98

    // begin page prev 97
    cy.log('begin page last 97');
    cy.get('.buttonPagination .btnPrev').click();
    cy.get('.buttonPagination .btnFirst').should('be.enabled');
    cy.get('.buttonPagination .btnPrev').should('be.enabled');
    cy.get('.buttonPagination .btnNext').should('be.enabled');
    cy.get('.buttonPagination .btnLast').should('be.enabled');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 97');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 97/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 97/10');

    cy.get('.buttonPagination').should('contain', '97 of 99').then(($param => {
      //debugger;
      const first = $param[0];
      const myproperty = (first as any).myProperty;
      const pagstatus = myproperty as PagingData;
      expect(pagstatus.page).to.equal(96);
      expect(pagstatus.pagesize).to.equal(1);
      expect(pagstatus.minPage).to.equal(0);
      expect(pagstatus.maxPage).to.equal(98);
      expect(pagstatus.count).to.equal(99);
      expect(pagstatus.hasFirstPage).to.equal(true);
      expect(pagstatus.hasPrevPage).to.equal(true);
      expect(pagstatus.hasNextPage).to.equal(true);
      expect(pagstatus.hasLastPage).to.equal(true);
    }));
    // end page prev 97

    // begin page first 1
    cy.log('begin page first 1');
    cy.get('.buttonPagination .btnFirst').click();
    cy.get('.buttonPagination .btnFirst').should('be.disabled');
    cy.get('.buttonPagination .btnPrev').should('be.disabled');
    cy.get('.buttonPagination .btnNext').should('be.enabled');
    cy.get('.buttonPagination .btnLast').should('be.enabled');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 1');

    cy.get('.panelDetail').children().should('have.length', 10);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 1/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 1/10');

    cy.get('.buttonPagination').should('contain', '1 of 99').then(($param => {
      //debugger;
      const first = $param[0];
      const myproperty = (first as any).myProperty;
      const pagstatus = myproperty as PagingData;
      expect(pagstatus.page).to.equal(0);
      expect(pagstatus.pagesize).to.equal(1);
      expect(pagstatus.minPage).to.equal(0);
      expect(pagstatus.maxPage).to.equal(98);
      expect(pagstatus.count).to.equal(99);
      expect(pagstatus.hasFirstPage).to.equal(false);
      expect(pagstatus.hasPrevPage).to.equal(false);
      expect(pagstatus.hasNextPage).to.equal(true);
      expect(pagstatus.hasLastPage).to.equal(true);
    }));
    // end page first 1

    // begin page next 2
    cy.log('begin page next 2');
    cy.get('.buttonPagination .btnNext').click();
    cy.get('.buttonPagination .btnFirst').should('be.enabled');
    cy.get('.buttonPagination .btnPrev').should('be.enabled');
    cy.get('.buttonPagination .btnNext').should('be.enabled');
    cy.get('.buttonPagination .btnLast').should('be.enabled');

    cy.get('.panelMaster .panelMasterField').should('contain', 'mfield1 2');

    cy.get('.panelDetail').children().should('have.length', 15);
    cy.get('.panelDetail').children().first().should('contain', 'dfield1 2/1');
    cy.get('.panelDetail').children().last().should('contain', 'dfield1 2/15');

    cy.get('.buttonPagination').should('contain', '2 of 99').then(($param => {
      //debugger;
      const first = $param[0];
      const myproperty = (first as any).myProperty;
      const pagstatus = myproperty as PagingData;
      expect(pagstatus.page).to.equal(1);
      expect(pagstatus.pagesize).to.equal(1);
      expect(pagstatus.minPage).to.equal(0);
      expect(pagstatus.maxPage).to.equal(98);
      expect(pagstatus.count).to.equal(99);
      expect(pagstatus.hasFirstPage).to.equal(true);
      expect(pagstatus.hasPrevPage).to.equal(true);
      expect(pagstatus.hasNextPage).to.equal(true);
      expect(pagstatus.hasLastPage).to.equal(true);
    }));
    // end page next 2
  })
})
