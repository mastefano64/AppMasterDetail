export type TypeOperation = 'start' | 'first' | 'prev' | 'next' | 'last' | 'page' | 'cellpage' | 'selected';

export type TypePagination = 'internal' | 'external';

import { IMasterDetailDto } from "./imasterdetaildto";

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

export interface IColumns {
  name: string;
  display: string;
  visibleTableField?: boolean;
  orderDetailTable?: number;
  orderDetailPanel? : number;
  sortable?: boolean;
  hasWidth?: boolean;
  myWidth?: number;
  myMinwidth?: number;
  myMaxwidth?: number;
}

export interface IResult {
  count: number,
  items: IMasterDetailDto[],
  page: number,
  url: string
}
