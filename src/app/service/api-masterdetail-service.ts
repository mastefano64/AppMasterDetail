import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, delay, of } from "rxjs";

import { MasterDetailDto, MasterDto, DetailDto } from "../model/masterdetaildto";
import { IResult } from "../module-masterdetail/interface/type-interface";
import { MasterDetailSearch } from "../model/masterdetailsearch";
import { Utility } from "../appcore/utility";
import { cloneDeep } from 'lodash-es';

// export interface IResult {
//   count: number,
//   items: any[],
//   page: number,
//   url: string
// }

// one and internal ???

// many(internal) => pagesize=9999 - count=N - items=0.N => (count=result.count)*
// one(external) => pagesize=1 - count=N - items=0.1 => (count=result.items.length?)
// one(external) => pagesize=1 - count=N - items=0.1 => (count=result.count?)

// const count = (this.config.typeMaster === 'many') ? result.count : 1;

// * count and items=0.N forse coincidono!

// ======================

// Calls made by this service are mocks. For this reason a cache is created; so that insert, update, delete operations
// are done using the cache. In a real context the calls will be made via a rest api, and after each insert, update, delete
// operation, fresh data will be reread from the server.

@Injectable({
  providedIn: 'root',
})
export class ApiMasterDetailService {
  private cacheresult: IResult;
  public firstFetchFromCache = true;
  delay = 300;

  constructor(private http: HttpClient) {}

  fetchData(search: MasterDetailSearch, page: number, pagesize: number, orderbycolumn:
    string, orderbydirection: string): Observable<object> {
    const url = ''; //this.createFullUrl('/ApiArticle/GetArticleBySearch');

    if (search) {
      const params = new HttpParams()
        .set('fulltext', Utility.toString(search.fulltext))
        .set('page', page.toString())
        .set('pagesize', pagesize.toString())
        .set('orderbycolumn', orderbycolumn)
        .set('orderbydirection', orderbydirection);

      const fromcache = !this.firstFetchFromCache;
      if (this.firstFetchFromCache === true) {
        this.firstFetchFromCache = false;
      }
      return this.getMasterDetailOne(page, fromcache);
      // return this.http.get(url, { params: params });
    }
    else {
      const params = new HttpParams()
       // .set('fulltext', Utility.toString(search.fulltext))
        .set('page', page.toString())
        .set('pagesize', pagesize.toString())
        .set('orderbycolumn', orderbycolumn)
        .set('orderbydirection', orderbydirection);

      const fromcache = !this.firstFetchFromCache;
      if (this.firstFetchFromCache === true) {
        this.firstFetchFromCache = false;
      }
      return this.getMasterDetailOne(page, fromcache);
      // return this.http.get(url, { params: params });
    }
  }

  getMasterDetailOne(page: number, fromcache: boolean): Observable<object> {
    if (this.cacheresult && fromcache == true) {
      const items = this.cacheresult.items[page];
      const current = {
        count: this.cacheresult.items.length,
        items: [items],
        page: 0,
        url: ''
      }
      return of(current).pipe(delay(300));
    }
    let list: MasterDetailDto[];
    list = this.getAllMasterDetail(99);
    this.cacheresult = undefined;

    const result = {
      count: list.length,
      items: list,
      page: 0,
      url: ''
    }

    this.cacheresult = cloneDeep(result);

    const items = list[page];
    const current = {
      count: list.length,
      items: [ items ],
      page: 0,
      url: ''
    }

    return of(current).pipe( delay(300) );
  }

  getMasterDetailMany(fromcache: boolean): Observable<object> {
    console.log(1);
    if (this.cacheresult && fromcache == true) {
      return of(this.cacheresult).pipe( delay(300) );
    }
    let list: MasterDetailDto[];
    list = this.getAllMasterDetail(99);
    this.cacheresult = undefined;

    const result = {
      count: list.length,
      items: list,
      page: 0,
      url: ''
    }

    this.cacheresult = cloneDeep(result);

    return of(this.cacheresult).pipe( delay(300) );
  }

  insertMaster(master: MasterDto): Observable<object> {
    const result = this.cacheresult;

    let id = 1;
    const length =  result.items.length;
    if (length > 0) {
      id = result.items[length - 1].master.masterId + 1;
    }
    const md = new MasterDetailDto();
    md.master = master;
    md.master.masterId = id;
    result.items.push(md); // result.items.unshift(md);
    result.count = result.items.length;
    this.cacheresult = cloneDeep(result);
    //this.cacheresult = { ...result };

    return of(null).pipe( delay(300) );
  }

  updateMaster(master: MasterDto): Observable<object> {
    const result = this.cacheresult;

    const id = master.masterId;
    const index = this.indexOfMaster(id, result);
    result.items[index].master = master;
    this.cacheresult = cloneDeep(result);
    //this.cacheresult = { ...result };

    return of(null).pipe( delay(300) );
  }

  deleteMaster(master: MasterDto): Observable<object> {
    const result = this.cacheresult;

    const id = master.masterId;
    const index = this.indexOfMaster(id, result);
    result.items.splice(index, 1);
    result.count = result.items.length;
    this.cacheresult = cloneDeep(result);
    //this.cacheresult = { ...result };

    return of(null).pipe( delay(300) );
  }


  insertDetail(detail: DetailDto): Observable<object> {
    const result = this.cacheresult;

    const mid = detail.masterId;
    const index = this.indexOfMaster(mid, result);
    const details = result.items[index].details;

    let did = 1;
    const length =  details.length;
    if (length > 0) {
      did = details[length - 1].detailId + 1;
    }
    detail.detailId = did;
    details.push(detail);
    this.cacheresult = cloneDeep(result);
    //this.cacheresult = { ...result };

    return of(null).pipe( delay(300) );
  }

  updateDetail(detail: DetailDto): Observable<object> {
    const result = this.cacheresult;

    const mid = detail.masterId;
    const indexm = this.indexOfMaster(mid, result);
    const details = result.items[indexm].details;

    const did = detail.detailId;
    const indexd = this.indexOfDetail(did, details);
    details[indexd] = detail;
    this.cacheresult = cloneDeep(result);
    //this.cacheresult = { ...result };

    return of(null).pipe( delay(300) );
  }

  deleteDetail(detail: DetailDto): Observable<object> {
    const result = this.cacheresult;

    const mid = detail.masterId;
    const indexm = this.indexOfMaster(mid, result);
    const details = result.items[indexm].details;

    const did = detail.detailId;
    const indexd = this.indexOfDetail(did, details);
    details.splice(indexd, 1);
    this.cacheresult = cloneDeep(result);
    //this.cacheresult = { ...result };

    return of(null).pipe( delay(300) );
  }

  indexOfMaster(masterid: number, result: IResult): number {
    let index = 0;
    for (let item of result.items) {
      if (item.master.masterId === masterid) {
        break;
      }
      index++;
    }
    return index;
  }

  indexOfDetail(detailid: number, details: DetailDto[]): number {
    let index = 0;
    for (let detail of details) {
      if (detail.detailId === detailid) {
        break;
      }
      index++;
    }
    return index;
  }

  // -----

  // msize 1 or 99
  private getAllMasterDetail(msize: number): MasterDetailDto[] {
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

}
