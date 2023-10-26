import { PagingData } from '../../src/app/appcore/datasource/pagingdata';

// https://stackoverflow.com/questions/43430558/how-can-i-bind-data-to-the-html-attribute-in-angular4
// $( "div" ).data( "test", { first: 16, last: "pizza!" } );

describe('FoormEdit - page03', () => {
  before(() => {

  })

  it('test1.1', () => {
    cy.visit('http://localhost:4200/page03');
    cy.contains('page03 - example1c');

    // begin page page 2 - add details
    cy.log('begin page next 2');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains(3);
    cy.get('.panelMaster .navbarStatus').find('.navbarCells').eq(2).click();
    // end page page 2 - add details

    // begin change view
    cy.log('begin change view');
    cy.get('.panelMaster .panelNavbarDx .selectView').find('.mat-button-toggle-button').contains('Card').click();
    // end change view

    // begin open insert detail form
    cy.log('begin open insert detail form');
    cy.get('.panelMaster .actionsMaster').contains('New detail').click();
    cy.get('.detailFormCreate').contains('New detail');
    cy.get('.detailFormCreate').find('input[name=name]').type('a1');
    cy.get('.detailFormCreate').find('input[name=product]').type('a2');
    cy.get('.detailFormCreate').find('input[name=dfield1]').type('a3');
    cy.get('.detailFormCreate').find('input[name=dfield2]').type('a4');
    cy.get('.detailFormCreate').find('input[name=dfield3]').type('a5');
    cy.get('.detailFormCreate').find('input[name=dfield4]').type('a6');
    cy.get('.detailFormCreate').find('input[name=dfield5]').type('a7');
    cy.get('.detailFormCreate').find('button').contains('Save').click();
    // end open insert detail form

    // begin open insert detail form
    cy.log('begin open insert detail form');
    cy.get('.panelMaster .actionsMaster').contains('New detail').click();
    cy.get('.detailFormCreate').contains('New detail');
    cy.get('.detailFormCreate').find('input[name=name]').type('b1');
    cy.get('.detailFormCreate').find('input[name=product]').type('b2');
    cy.get('.detailFormCreate').find('input[name=dfield1]').type('b3');
    cy.get('.detailFormCreate').find('input[name=dfield2]').type('b4');
    cy.get('.detailFormCreate').find('input[name=dfield3]').type('b5');
    cy.get('.detailFormCreate').find('input[name=dfield4]').type('b6');
    cy.get('.detailFormCreate').find('input[name=dfield5]').type('b7');
    cy.get('.detailFormCreate').find('button').contains('Save').click();
    // end open insert detail form

    // begin list inserted item
    cy.log('begin list inserted item');
    cy.get('.panelDetail').children().should('have.length', 12);
    cy.get('.panelDetail').children().eq(10).should('contain', 'a1');
    cy.get('.panelDetail').children().eq(11).should('contain', 'b1');
    // end inserted item

    // begin open edit detail form
    cy.log('begin open edit detail form');
    cy.get('.panelDetail .panelDetailRows .actionsDetail').eq(10).as('row');
    cy.get('@row').contains('edit').click();
    cy.get('.detailFormEdit').contains('Edit detail');
    cy.get('.detailFormEdit').find('input[name=name]').clear().type('a11');
    cy.get('.detailFormEdit').find('input[name=product]').clear().type('a21');
    cy.get('.detailFormEdit').find('input[name=dfield1]').clear().type('a31');
    cy.get('.detailFormEdit').find('input[name=dfield2]').clear().type('a41');
    cy.get('.detailFormEdit').find('input[name=dfield3]').clear().type('a51');
    cy.get('.detailFormEdit').find('input[name=dfield4]').clear().type('a61');
    cy.get('.detailFormEdit').find('input[name=dfield5]').clear().type('a71');
    cy.get('.detailFormEdit').find('button').contains('Save').click();
    // end open edit detail form

    // begin list inserted item
    cy.log('begin list inserted item');
    cy.get('.panelDetail').children().should('have.length', 12);
    cy.get('.panelDetail').children().eq(10).should('contain', 'a11');
    cy.get('.panelDetail').children().eq(11).should('contain', 'b1');
    // end inserted item

    // begin delete item
    cy.log('begin delete item1');
    cy.get('.panelDetail .panelDetailRows .actionsDetail').eq(10).as('row');
    cy.get('@row').contains('cancel').click();
    cy.on('window:confirm', () => true);
    // end delete item

    // begin list inserted item
    cy.log('begin list inserted item');
    cy.get('.panelDetail').children().should('have.length', 11);
    cy.get('.panelDetail').children().eq(10).should('contain', 'b1');
    // end inserted item
  })

  it('test1.2', () => {
    cy.visit('http://localhost:4200/page03');
    cy.contains('page03 - example1c');

    // begin page page 2 - add details
    cy.log('begin page next 2');
    cy.get('.panelMaster .navbarStatus').children().eq(2).contains(3);
    cy.get('.panelMaster .navbarStatus').find('.navbarCells').eq(2).click();
    // end page page 2 - add details

    // begin change view
    cy.log('begin change view');
    cy.get('.panelMaster .panelNavbarDx .selectView').find('.mat-button-toggle-button').contains('Table').click();
    // end change view

    // begin open insert detail form
    cy.log('begin open insert detail form');
    cy.get('.panelMaster .actionsMaster').contains('New detail').click();
    cy.get('.detailFormCreate').contains('New detail');
    cy.get('.detailFormCreate').find('input[name=name]').type('a1');
    cy.get('.detailFormCreate').find('input[name=product]').type('a2');
    cy.get('.detailFormCreate').find('input[name=dfield1]').type('a3');
    cy.get('.detailFormCreate').find('input[name=dfield2]').type('a4');
    cy.get('.detailFormCreate').find('input[name=dfield3]').type('a5');
    cy.get('.detailFormCreate').find('input[name=dfield4]').type('a6');
    cy.get('.detailFormCreate').find('input[name=dfield5]').type('a7');
    cy.get('.detailFormCreate').find('button').contains('Save').click();
    // end open insert detail form

    // begin open insert detail form
    cy.log('begin open insert detail form');
    cy.get('.panelMaster .actionsMaster').contains('New detail').click();
    cy.get('.detailFormCreate').contains('New detail');
    cy.get('.detailFormCreate').find('input[name=name]').type('b1');
    cy.get('.detailFormCreate').find('input[name=product]').type('b2');
    cy.get('.detailFormCreate').find('input[name=dfield1]').type('b3');
    cy.get('.detailFormCreate').find('input[name=dfield2]').type('b4');
    cy.get('.detailFormCreate').find('input[name=dfield3]').type('b5');
    cy.get('.detailFormCreate').find('input[name=dfield4]').type('b6');
    cy.get('.detailFormCreate').find('input[name=dfield5]').type('b7');
    cy.get('.detailFormCreate').find('button').contains('Save').click();
    // end open insert detail form

    // begin list inserted item
    cy.log('begin list inserted item');
    cy.get('.panelDetail .datatable-row-wrapper').children().should('have.length', 12);
    cy.get('.panelDetail .datatable-row-wrapper').children().eq(10).should('contain', 'a1');
    cy.get('.panelDetail .datatable-row-wrapper').children().eq(11).should('contain', 'b1');
    // end inserted item

    // begin open edit detail form
    cy.log('begin open edit detail form');
    cy.get('.panelDetail .datatable-row-wrapper .actionsButton').eq(10).as('row');
    cy.get('@row').contains('edit').click();
    cy.get('.detailFormEdit').contains('Edit detail');
    cy.get('.detailFormEdit').find('input[name=name]').clear().type('a11');
    cy.get('.detailFormEdit').find('input[name=product]').clear().type('a21');
    cy.get('.detailFormEdit').find('input[name=dfield1]').clear().type('a31');
    cy.get('.detailFormEdit').find('input[name=dfield2]').clear().type('a41');
    cy.get('.detailFormEdit').find('input[name=dfield3]').clear().type('a51');
    cy.get('.detailFormEdit').find('input[name=dfield4]').clear().type('a61');
    cy.get('.detailFormEdit').find('input[name=dfield5]').clear().type('a71');
    cy.get('.detailFormEdit').find('button').contains('Save').click();
    // end open edit detail form

    // begin list inserted item
    cy.log('begin list inserted item');
    cy.get('.panelDetail .datatable-row-wrapper').children().should('have.length', 12);
    cy.get('.panelDetail .datatable-row-wrapper').children().eq(10).should('contain', 'a1');
    cy.get('.panelDetail .datatable-row-wrapper').children().eq(11).should('contain', 'b1');
    // end inserted item

    // begin delete item
    cy.log('begin delete item1');
    cy.get('.panelDetail .datatable-row-wrapper .actionsButton').eq(10).as('row');
    cy.get('@row').contains('cancel').click();
    cy.on('window:confirm', () => true);
    // end delete item

     // begin list inserted item
     cy.log('begin list inserted item');
     cy.get('.panelDetail .datatable-row-wrapper').children().should('have.length', 12);
     cy.get('.panelDetail .datatable-row-wrapper').children().eq(10).should('contain', 'a1');
     cy.get('.panelDetail .datatable-row-wrapper').children().eq(11).should('contain', 'b1');
     // end inserted item
  })
})


