
export class PagingData {
  _datasource: any;
  datetime: Date;
  page: number;
  pagesize: number;
  minPage: number;
  maxPage: number;
  count: number;
  hasFirstPage: boolean;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  hasLastPage: boolean;

  constructor(datasource: any) {
    this._datasource = datasource;
    this.datetime = undefined;
    this.page = -1;
    this.pagesize = -1;
    this.minPage = -1;
    this.maxPage = -1;
    this.count = -1;
    this.hasFirstPage = false;
    this.hasPrevPage = false;
    this.hasNextPage = false;
    this.hasLastPage = false;
  }
}
