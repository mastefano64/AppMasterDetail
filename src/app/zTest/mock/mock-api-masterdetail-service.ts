import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, delay, of } from "rxjs";

import { MasterDetailDto, MasterDto, DetailDto } from "../../model/masterdetaildto";
import { IResult } from "../../module-masterdetail/interface/type-interface";
import { MasterDetailSearch } from "../../model/masterdetailsearch";
import { Utility } from "../../appcore/utility";
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

export class MockApiMasterDetailService {
  delay = 300;

  constructor() {}

  fetchAllData(search: MasterDetailSearch, orderbycolumn: string,
         orderbydirection: string): Observable<object> {
    const url = ''; //this.createFullUrl('/ApiArticle/GetArticleBySearch');

    if (search) {
      const params = new HttpParams()
        .set('fulltext', Utility.toString(search.fulltext))
        // .set('page', page.toString())
        // .set('pagesize', pagesize.toString())
        .set('orderbycolumn', orderbycolumn)
        .set('orderbydirection', orderbydirection);

      return this.getMasterDetail(0, 9999);
      // return this.http.get(url, { params: params });
    }
    else {
      const params = new HttpParams()
        // .set('fulltext', Utility.toString(search.fulltext))
        // .set('page', page.toString())
        // .set('pagesize', pagesize.toString())
        .set('orderbycolumn', orderbycolumn)
        .set('orderbydirection', orderbydirection);

      return this.getMasterDetail(0, 9999);
      // return this.http.get(url, { params: params });
    }
  }

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

      return this.getMasterDetail(page, pagesize);
      // return this.http.get(url, { params: params });
    }
    else {
      const params = new HttpParams()
       // .set('fulltext', Utility.toString(search.fulltext))
        .set('page', page.toString())
        .set('pagesize', pagesize.toString())
        .set('orderbycolumn', orderbycolumn)
        .set('orderbydirection', orderbydirection);

      return this.getMasterDetail(page, pagesize);
      // return this.http.get(url, { params: params });
    }
  }

  getMasterDetail(page: number, pagesize: number): Observable<object> {
    let list1: MasterDetailDto[];
    list1 = this.getAllMasterDetail(99);

    const take = page * pagesize;
    const list2 = list1.slice(take, take + pagesize)

    const result = {
      count: list1.length,
      items: list2,
      page: 0,
      url: ''
    }

    return of(result).pipe( delay(300) );
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
