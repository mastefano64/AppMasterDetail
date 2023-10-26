import { MasterDetailConfig } from '../../src/app/module-masterdetail/masterdetailconfig';
import { MasterDetailService } from '../../src/app/module-masterdetail/service/masterdetail-service';
import { MasterDetailDto, MasterDto, DetailDto } from '../../src/app/model/masterdetaildto';

describe('MasterDetailService', () => {
  before(() => {

  })

  it('test1.1', () => {
    const s = new MasterDetailService();

    const config = new MasterDetailConfig();
    config.typeMaster = 'many';

    const list = getAllMasterDetail(99);
    const result = {
      count: list.length,
      items: list,
      page: 0,
      url: ''
    }

    cy.log('step 1');
    expect(s.currentPage).to.equal(0);
    expect(s.minPage).to.equal(-1);
    expect(s.maxPage).to.equal(-1);
    expect(s.totalCount).to.equal(-1);
    expect(s.pageSize).to.equal(-1);
    expect(s.firstPage).to.equal(-1);
    expect(s.prevPage).to.equal(-1);
    expect(s.nextPage).to.equal(-1);
    expect(s.lastPage).to.equal(-1);
    expect(s.hasFirstPage).to.equal(false);
    expect(s.hasPrevPage).to.equal(false);
    expect(s.hasNextPage).to.equal(false);
    expect(s.hasLastPage).to.equal(false);

    cy.log('step 2');
    s.setConfig(config);
    s.setDataSource(result);

    expect(s.currentPage).to.equal(0);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(-1);
    expect(s.nextPage).to.equal(1);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(false);
    expect(s.hasPrevPage).to.equal(false);
    expect(s.hasNextPage).to.equal(true);
    expect(s.hasLastPage).to.equal(true);

    cy.log('step 3');
    const first1 = s.getFirstPage();
    expect(s.currentPage).to.equal(0);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(-1);
    expect(s.nextPage).to.equal(1);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(false);
    expect(s.hasPrevPage).to.equal(false);
    expect(s.hasNextPage).to.equal(true);
    expect(s.hasLastPage).to.equal(true);
    expect(first1.master.name).to.equal('name 1');

    cy.log('step 4');
    const next1 = s.getNextPage();
    expect(s.currentPage).to.equal(1);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(0);
    expect(s.nextPage).to.equal(2);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(true);
    expect(s.hasPrevPage).to.equal(true);
    expect(s.hasNextPage).to.equal(true);
    expect(s.hasLastPage).to.equal(true);
    expect(next1.master.name).to.equal('name 2');

    cy.log('step 5');
    const next2 = s.getNextPage();
    expect(s.currentPage).to.equal(2);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(1);
    expect(s.nextPage).to.equal(3);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(true);
    expect(s.hasPrevPage).to.equal(true);
    expect(s.hasNextPage).to.equal(true);
    expect(s.hasLastPage).to.equal(true);
    expect(next2.master.name).to.equal('name 3');

    cy.log('step 6');
    const last = s.getLastPage();
    expect(s.currentPage).to.equal(98);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(97);
    expect(s.nextPage).to.equal(-1);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(true);
    expect(s.hasPrevPage).to.equal(true);
    expect(s.hasNextPage).to.equal(false);
    expect(s.hasLastPage).to.equal(false);
    expect(last.master.name).to.equal('name 99');

    cy.log('step 7');
    const prev1 = s.getPrevPage();
    expect(s.currentPage).to.equal(97);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(96);
    expect(s.nextPage).to.equal(98);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(true);
    expect(s.hasPrevPage).to.equal(true);
    expect(s.hasNextPage).to.equal(true);
    expect(s.hasLastPage).to.equal(true);
    expect(prev1.master.name).to.equal('name 98');

    cy.log('step 8');
    const prev2 = s.getPrevPage();
    expect(s.currentPage).to.equal(96);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(95);
    expect(s.nextPage).to.equal(97);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(true);
    expect(s.hasPrevPage).to.equal(true);
    expect(s.hasNextPage).to.equal(true);
    expect(s.hasLastPage).to.equal(true);
    expect(prev2.master.name).to.equal('name 97');

    cy.log('step 9');
    const first2 = s.getFirstPage();
    expect(s.currentPage).to.equal(0);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(-1);
    expect(s.nextPage).to.equal(1);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(false);
    expect(s.hasPrevPage).to.equal(false);
    expect(s.hasNextPage).to.equal(true);
    expect(s.hasLastPage).to.equal(true);
    expect(first2.master.name).to.equal('name 1');

    cy.log('step 10');
    const next3 = s.getNextPage();
    expect(s.currentPage).to.equal(1);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(0);
    expect(s.nextPage).to.equal(2);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(true);
    expect(s.hasPrevPage).to.equal(true);
    expect(s.hasNextPage).to.equal(true);
    expect(s.hasLastPage).to.equal(true);
    expect(next3.master.name).to.equal('name 2');
  })

  it('test1.2', () => {
    const s = new MasterDetailService();

    const config = new MasterDetailConfig();
    config.typeMaster = 'many';

    const list = getAllMasterDetail(99);
    const result = {
      count: list.length,
      items: list,
      page: 0,
      url: ''
    }

    cy.log('step 1');
    s.setConfig(config);
    s.setDataSource(result);

    expect(s.currentPage).to.equal(0);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(-1);
    expect(s.nextPage).to.equal(1);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(false);
    expect(s.hasPrevPage).to.equal(false);
    expect(s.hasNextPage).to.equal(true);
    expect(s.hasLastPage).to.equal(true);

    cy.log('step 2');
    const page2 = s.goToPage(2);
    expect(s.currentPage).to.equal(2);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(1);
    expect(s.nextPage).to.equal(3);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(true);
    expect(s.hasPrevPage).to.equal(true);
    expect(s.hasNextPage).to.equal(true);
    expect(s.hasLastPage).to.equal(true);
    expect(page2.master.name).to.equal('name 3');

    cy.log('step 3');
    const page4 = s.goToPage(4);
    expect(s.currentPage).to.equal(4);
    expect(s.minPage).to.equal(0);
    expect(s.maxPage).to.equal(98);
    expect(s.totalCount).to.equal(99);
    expect(s.pageSize).to.equal(1);
    expect(s.firstPage).to.equal(0);
    expect(s.prevPage).to.equal(3);
    expect(s.nextPage).to.equal(5);
    expect(s.lastPage).to.equal(98);
    expect(s.hasFirstPage).to.equal(true);
    expect(s.hasPrevPage).to.equal(true);
    expect(s.hasNextPage).to.equal(true);
    expect(s.hasLastPage).to.equal(true);
    expect(page4.master.name).to.equal('name 5');
  })
})

function getAllMasterDetail(msize: number): MasterDetailDto[] {
  const array = new Array<MasterDetailDto>();
  let md: MasterDetailDto;
  let m: MasterDto; let d: DetailDto;
  let flag = true; let dsize = 0;

  for (let im = 1; im <= msize; im++) {
    md = new MasterDetailDto();
    m = new MasterDto();
    m.masterId = im;
    m.name = `name ${im}`;
    m.customer = `customer ${im}`;
    m.mfield1 = `mfield1 ${im}`;
    m.mfield2 = `mfield2 ${im}`;
    m.mfield3 = `mfield3 ${im}`;
    m.mfield4 = `mfield4 ${im}`;
    m.mfield5 = `mfield5 ${im}`;
    md.master = m;
    md.details = [];

    dsize = (flag === true) ? 10 : 15;
    for (let id = 1; id <= dsize; id++) {
      d = new DetailDto();
      d.masterId = im;
      d.detailId = id;
      d.name = `name ${id}`;
      d.product = `product ${im}/${id}`;
      if(id % 2 === 0) {
        d.typedetail1 = 'category1';
      } else {
        d.typedetail1 = 'category2';
      }
     // if(id % 2 !== 0) {
     //   d.typedetail2 = 'category3';
     // } else {
     //   d.typedetail2 = 'category4';
     // }
      d.typedetail2 = 'category3';
      if(id % 2 === 0) {
        d.dfieldD = new Date('2023-10-15');
      } else {
        d.dfieldD = new Date('2023-10-25');
      }
      if(id % 2 === 0) {
        d.dfieldN = 10.15;
      } else {
        d.dfieldN = 20.25;
      }
      d.dfield1 = `dfield1 ${im}/${id}`;
      d.dfield2 = `dfield2 ${im}/${id}`;
      d.dfield3 = `dfield3 ${im}/${id}`;
      d.dfield4 = `dfield4 ${im}/${id}`;
      d.dfield5 = `dfield5 ${im}/${id}`;
      md.details.push(d);
    }
    flag = !flag;
    array.push(md);
  }

  return array;
}
