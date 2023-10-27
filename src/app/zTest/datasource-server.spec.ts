import { MasterDetailSearch } from "../model/masterdetailsearch";
import { MockMasterDetailDataSourceServer } from "./mock/mock-masterdetail-datasource-server";
import { MockApiMasterDetailService } from "./mock/mock-api-masterdetail-service";

describe('DataSourceServer', () => {
  let originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('TestDataSourceServer', async () => {
    let currpage = 0; let pagesize = 20;
    let lastDateTime; let currentResult;
    let currentItem;

    const search = new MasterDetailSearch();
    const service = new MockApiMasterDetailService();
    const mds = new MockMasterDetailDataSourceServer(service, search);
    const mds$ = mds.connect(null);
    console.log('DataSourceServer');

    currentResult = mds.currentResult;
    expect(mds.currentPage).toEqual(0);
    expect(mds.pageSize).toEqual(25);
    expect(mds.orderbyColumn).toEqual('');
    expect(mds.orderbyDirection).toEqual('');
    expect(mds.minPage).toEqual(-1);
    expect(mds.maxPage).toEqual(-1);
    expect(mds.hasFirstPage).toEqual(false);
    expect(mds.hasPrevPage).toEqual(false);
    expect(mds.hasNextPage).toEqual(false);
    expect(mds.hasLastPage).toEqual(false);
    expect(mds.firstPage).toEqual(-1);
    expect(mds.prevPage).toEqual(-1);
    expect(mds.nextPage).toEqual(-1);
    expect(mds.lastPage).toEqual(-1);

    // page 1
    currpage = 0;
    mds.loadPaggedData(currpage, pagesize, 'masterId');
    await sleep(1000);

    currentResult = mds.currentResult;
    currentItem = currentResult.items[0];
    expect(mds.currentPage).toEqual(0);
    expect(mds.pageSize).toEqual(20);
    expect(mds.orderbyColumn).toEqual('masterId');
    expect(mds.orderbyDirection).toEqual('asc');
    expect(mds.minPage).toEqual(0);
    expect(mds.maxPage).toEqual(4);
    expect(mds.hasFirstPage).toEqual(false);
    expect(mds.hasPrevPage).toEqual(false);
    expect(mds.hasNextPage).toEqual(true);
    expect(mds.hasLastPage).toEqual(true);
    expect(mds.firstPage).toEqual(0);
    expect(mds.prevPage).toEqual(-1);
    expect(mds.nextPage).toEqual(1);
    expect(mds.lastPage).toEqual(4);
    expect(lastDateTime).not.toEqual(mds.currentDateTime);
    expect(currentItem.master.name).toEqual('name 1');
    lastDateTime = mds.currentDateTime;
    console.log(mds.currentDateTime);
    console.log(currentItem);

    // page 2
    const ret2 = mds.gotoNextPage();
    await sleep(1000);

    currentResult = mds.currentResult;
    currentItem = currentResult.items[0];
    expect(ret2).toEqual(true);
    expect(mds.currentPage).toEqual(1);
    expect(mds.pageSize).toEqual(20);
    expect(mds.orderbyColumn).toEqual('masterId');
    expect(mds.orderbyDirection).toEqual('asc');
    expect(mds.minPage).toEqual(0);
    expect(mds.maxPage).toEqual(4);
    expect(mds.hasFirstPage).toEqual(true);
    expect(mds.hasPrevPage).toEqual(true);
    expect(mds.hasNextPage).toEqual(true);
    expect(mds.hasLastPage).toEqual(true);
    expect(mds.firstPage).toEqual(0);
    expect(mds.prevPage).toEqual(0);
    expect(mds.nextPage).toEqual(2);
    expect(mds.lastPage).toEqual(4);
    expect(lastDateTime).not.toEqual(mds.currentDateTime);
    expect(currentItem.master.name).toEqual('name 21');
    lastDateTime = mds.currentDateTime;
    console.log(mds.currentDateTime);
    console.log(currentItem);

    // page 3
    const ret3 = mds.gotoNextPage();
    await sleep(1000);

    currentResult = mds.currentResult;
    currentItem = currentResult.items[0];
    expect(ret3).toEqual(true);
    expect(mds.currentPage).toEqual(2);
    expect(mds.pageSize).toEqual(20);
    expect(mds.orderbyColumn).toEqual('masterId');
    expect(mds.orderbyDirection).toEqual('asc');
    expect(mds.minPage).toEqual(0);
    expect(mds.maxPage).toEqual(4);
    expect(mds.hasFirstPage).toEqual(true);
    expect(mds.hasPrevPage).toEqual(true);
    expect(mds.hasNextPage).toEqual(true);
    expect(mds.hasLastPage).toEqual(true);
    expect(mds.firstPage).toEqual(0);
    expect(mds.prevPage).toEqual(1);
    expect(mds.nextPage).toEqual(3);
    expect(mds.lastPage).toEqual(4);
    expect(lastDateTime).not.toEqual(mds.currentDateTime);
    expect(currentItem.master.name).toEqual('name 41');
    lastDateTime = mds.currentDateTime;
    console.log(mds.currentDateTime);
    console.log(currentItem);

    // page 4
    const ret4 = mds.gotoNextPage();
    await sleep(1000);

    currentResult = mds.currentResult;
    currentItem = currentResult.items[0];
    expect(ret4).toEqual(true);
    expect(mds.currentPage).toEqual(3);
    expect(mds.pageSize).toEqual(20);
    expect(mds.orderbyColumn).toEqual('masterId');
    expect(mds.orderbyDirection).toEqual('asc');
    expect(mds.minPage).toEqual(0);
    expect(mds.maxPage).toEqual(4);
    expect(mds.hasFirstPage).toEqual(true);
    expect(mds.hasPrevPage).toEqual(true);
    expect(mds.hasNextPage).toEqual(true);
    expect(mds.hasLastPage).toEqual(true);
    expect(mds.firstPage).toEqual(0);
    expect(mds.prevPage).toEqual(2);
    expect(mds.nextPage).toEqual(4);
    expect(mds.lastPage).toEqual(4);
    expect(lastDateTime).not.toEqual(mds.currentDateTime);
    expect(currentItem.master.name).toEqual('name 61');
    lastDateTime = mds.currentDateTime;
    console.log(mds.currentDateTime);
    console.log(currentItem);

    // page 5
    const ret5 = mds.gotoNextPage();
    await sleep(1000);

    currentResult = mds.currentResult;
    currentItem = currentResult.items[0];
    expect(ret5).toEqual(true);
    expect(mds.currentPage).toEqual(4);
    expect(mds.pageSize).toEqual(20);
    expect(mds.orderbyColumn).toEqual('masterId');
    expect(mds.orderbyDirection).toEqual('asc');
    expect(mds.minPage).toEqual(0);
    expect(mds.maxPage).toEqual(4);
    expect(mds.hasFirstPage).toEqual(true);
    expect(mds.hasPrevPage).toEqual(true);
    expect(mds.hasNextPage).toEqual(false);
    expect(mds.hasLastPage).toEqual(false);
    expect(mds.firstPage).toEqual(0);
    expect(mds.prevPage).toEqual(3);
    expect(mds.nextPage).toEqual(-1);
    expect(mds.lastPage).toEqual(4);
    expect(lastDateTime).not.toEqual(mds.currentDateTime);
    expect(currentItem.master.name).toEqual('name 81');
    lastDateTime = mds.currentDateTime;
    console.log(mds.currentDateTime);
    console.log(currentItem);

    // page first
    const retf = mds.gotoFirstPage();
    await sleep(1000);

    currentResult = mds.currentResult;
    currentItem = currentResult.items[0];
    expect(retf).toEqual(true);
    expect(mds.currentPage).toEqual(0);
    expect(mds.pageSize).toEqual(20);
    expect(mds.orderbyColumn).toEqual('masterId');
    expect(mds.orderbyDirection).toEqual('asc');
    expect(mds.minPage).toEqual(0);
    expect(mds.maxPage).toEqual(4);
    expect(mds.hasFirstPage).toEqual(false);
    expect(mds.hasPrevPage).toEqual(false);
    expect(mds.hasNextPage).toEqual(true);
    expect(mds.hasLastPage).toEqual(true);
    expect(mds.firstPage).toEqual(0);
    expect(mds.prevPage).toEqual(-1);
    expect(mds.nextPage).toEqual(1);
    expect(mds.lastPage).toEqual(4);
    expect(lastDateTime).not.toEqual(mds.currentDateTime);
    expect(currentItem.master.name).toEqual('name 1');
    lastDateTime = mds.currentDateTime;
    console.log(mds.currentDateTime);
    console.log(currentItem);

    // page last
    const retl = mds.gotoLastPage();
    await sleep(1000);

    currentResult = mds.currentResult;
    currentItem = currentResult.items[0];
    expect(retl).toEqual(true);
    expect(mds.currentPage).toEqual(4);
    expect(mds.pageSize).toEqual(20);
    expect(mds.orderbyColumn).toEqual('masterId');
    expect(mds.orderbyDirection).toEqual('asc');
    expect(mds.minPage).toEqual(0);
    expect(mds.maxPage).toEqual(4);
    expect(mds.hasFirstPage).toEqual(true);
    expect(mds.hasPrevPage).toEqual(true);
    expect(mds.hasNextPage).toEqual(false);
    expect(mds.hasLastPage).toEqual(false);
    expect(mds.firstPage).toEqual(0);
    expect(mds.prevPage).toEqual(3);
    expect(mds.nextPage).toEqual(-1);
    expect(mds.lastPage).toEqual(4);
    expect(lastDateTime).not.toEqual(mds.currentDateTime);
    expect(currentItem.master.name).toEqual('name 81');
    lastDateTime = mds.currentDateTime;
    console.log(mds.currentDateTime);
    console.log(currentItem);

    // page refresh
    const retx = mds.refresh();
    await sleep(1000);

    currentResult = mds.currentResult;
    currentItem = currentResult.items[0];
    //expect(retx).toEqual(true);
    expect(mds.currentPage).toEqual(4);
    expect(mds.pageSize).toEqual(20);
    expect(mds.orderbyColumn).toEqual('masterId');
    expect(mds.orderbyDirection).toEqual('asc');
    expect(mds.minPage).toEqual(0);
    expect(mds.maxPage).toEqual(4);
    expect(mds.hasFirstPage).toEqual(true);
    expect(mds.hasPrevPage).toEqual(true);
    expect(mds.hasNextPage).toEqual(false);
    expect(mds.hasLastPage).toEqual(false);
    expect(mds.firstPage).toEqual(0);
    expect(mds.prevPage).toEqual(3);
    expect(mds.nextPage).toEqual(-1);
    expect(mds.lastPage).toEqual(4);
    expect(lastDateTime).not.toEqual(mds.currentDateTime);
    expect(currentItem.master.name).toEqual('name 81');
    lastDateTime = mds.currentDateTime;
    console.log(mds.currentDateTime);
    console.log(currentItem);
  });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
});
