import { PagingData } from '../../src/app/appcore/datasource/pagingdata';

// https://stackoverflow.com/questions/43430558/how-can-i-bind-data-to-the-html-attribute-in-angular4
// $( "div" ).data( "test", { first: 16, last: "pizza!" } );

describe('FoormEditMaster - page03', () => {
  before(() => {

  })

  it('test1.1', () => {
    cy.visit('http://localhost:4200/page03');
    cy.contains('page03 - example1c');

    // begin change view
    cy.log('begin change view');
    cy.get('.panelMaster .panelNavbarDx .selectView').find('.mat-button-toggle-button').contains('Card').click();
    // end change view

    // begin page 3 - add master
    cy.log('begin page next 2');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains(3);
    cy.get('.panelMaster .navbarStatus').find('.navbarCells').eq(2).click();
    // end page 3 - add master

    // begin open insert master form
    cy.log('begin open insert master form');
    cy.get('.actionMasterNew').contains('New master').click();
    cy.get('.masterFormCreate').contains('New master');
    cy.get('.masterFormCreate').find('input[name=name]').type('a1');
    cy.get('.masterFormCreate').find('input[name=customer]').type('a2');
    cy.get('.masterFormCreate').find('input[name=mfield1]').type('a3');
    cy.get('.masterFormCreate').find('input[name=mfield2]').type('a4');
    cy.get('.masterFormCreate').find('input[name=mfield3]').type('a5');
    cy.get('.masterFormCreate').find('input[name=mfield4]').type('a6');
    cy.get('.masterFormCreate').find('input[name=mfield5]').type('a7');
    cy.get('.masterFormCreate').find('button').contains('Save').click();
    // end open insert master form

    cy.wait(2000);

    // begin page 3 - add master
    cy.log('begin page next 3');
    cy.get('.panelMaster .panelNavbar1 .btnNext').click();
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains(3);
    cy.get('.panelMaster .navbarStatus').find('.navbarCells').eq(2).click();
    // end page 3 - add master

    // begin open insert master form
    cy.log('begin open insert master form');
    cy.get('.actionMasterNew').contains('New master').click();
    cy.get('.masterFormCreate').contains('New master');
    cy.get('.masterFormCreate').find('input[name=name]').type('b1');
    cy.get('.masterFormCreate').find('input[name=customer]').type('b2');
    cy.get('.masterFormCreate').find('input[name=mfield1]').type('b3');
    cy.get('.masterFormCreate').find('input[name=mfield2]').type('b4');
    cy.get('.masterFormCreate').find('input[name=mfield3]').type('b5');
    cy.get('.masterFormCreate').find('input[name=mfield4]').type('b6');
    cy.get('.masterFormCreate').find('input[name=mfield5]').type('b7');
    cy.get('.masterFormCreate').find('button').contains('Save').click();
    // end open insert master form

    cy.wait(2000);

    // begin page - modify master
    cy.log('begin page - modify master');
    cy.get('.panelMaster .panelNavbar1 .btnLast').click();
    cy.get('.panelMaster .navbarStatus').children().eq(4).contains(101);
    cy.get('.panelMaster .navbarStatus').find('.navbarCells').eq(4).click();
    // end page - modify master

    // begin open insert master form
    cy.log('begin open modify master form');
    cy.get('.panelMaster .actionsMaster').contains('edit').click();
    cy.get('.masterFormEdit').contains('Edit master');
    cy.get('.masterFormEdit').find('input[name=name]').clear().type('b11');
    cy.get('.masterFormEdit').find('input[name=customer]').clear().type('b21');
    cy.get('.masterFormEdit').find('input[name=mfield1]').clear().type('b31');
    cy.get('.masterFormEdit').find('input[name=mfield2]').clear().type('b41');
    cy.get('.masterFormEdit').find('input[name=mfield3]').clear().type('b51');
    cy.get('.masterFormEdit').find('input[name=mfield4]').clear().type('b61');
    cy.get('.masterFormEdit').find('input[name=mfield5]').clear().type('b71');
    cy.get('.masterFormEdit').find('button').contains('Save').click();
    // end open insert master form

    cy.wait(2000);

    // begin page - delete master
    cy.log('begin page - modify master');
    cy.get('.panelMaster .navbarStatus').children().eq(3).contains(100);
    cy.get('.panelMaster .navbarStatus').find('.navbarCells').eq(3).click();
    // end page - delete master

    // begin delete 100 item
    cy.log('begin delete 100 item');
    cy.get('.panelMaster .actionsMaster').contains('cancel').click();
    cy.on('window:confirm', () => true);
    // end delete 100 item

    cy.wait(2000);

    // begin check item
    cy.log('begin check item');
    cy.get('.panelMaster .panelNavbar1 .btnLast').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'b11');
    cy.get('.panelMaster .panelNavbar1 .btnPrev').click();
    cy.get('.panelMaster .panelMasterField').should('contain', 'name 99');
    // end check item
  })
})


