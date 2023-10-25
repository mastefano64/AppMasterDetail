import { BehaviorSubject } from "rxjs";

import { MasterDetailConfig } from "../masterdetailconfig";
import { TableColumn } from "../model/table-column";
import { IColumns, IResult, TypeOperation, TypePagination } from "../interface/type-interface";
import { PagingArgs } from "../model/paging-args";
import { IMasterDetailDto } from "../interface/imasterdetaildto";

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

export class MasterDetailService {
  private notifyPaging = new BehaviorSubject<any>(null);
  public notifyPaging$ = this.notifyPaging.asObservable();
  private config: MasterDetailConfig;
  private typepagination: TypePagination;
  private columntable: TableColumn[];
  private columndetail: TableColumn[];
  private selectedmasterpage: number;
  private datasource: IMasterDetailDto[];
  private currentrecord: IMasterDetailDto;

  private startpage = 0;
  private currentpage = 0;
  private minpage = -1;
  private maxpage = -1;
  private totalcount = -1;
  private pagesize = -1;

  constructor() { }

  //

  get typePagination(): string {
    return this.typepagination;
  }

  get columnTable(): TableColumn[] {
    return this.columntable;
  }

  get columnDetail(): TableColumn[] {
    return this.columndetail;
  }

  get allMasterDetail(): any[] {
    return this.datasource;
  }

  get currentRecord(): any {
    return this.currentrecord;
  }

  get currentPage(): number {
    return this.currentpage;
  }

  get minPage(): number {
    return this.minpage;
  }

  get maxPage(): number {
    return this.maxpage;
  }

  get totalCount(): number {
    return this.totalcount;
  }

  get pageSize(): number {
    return this.pagesize;
  }

  get selectedMasterPage(): number {
    return this.selectedmasterpage;
  }

  get hasFirstPage(): boolean {
    let value = false;
    if (this.minpage !== -1 && this.currentpage !== this.minpage) {
      value = true;
    }
    return value;
  }

  get hasPrevPage(): boolean {
    let value = false;
    if (this.minpage !== -1 && this.currentpage > this.minpage) {
      value = true;
    }
    return value;
  }

  get hasNextPage(): boolean {
    let value = false;
    if (this.maxpage !== -1 && this.currentpage < this.maxpage) {
      value = true;
    }
    return value;
  }

  get hasLastPage(): boolean {
    let value = false;
    if (this.maxpage !== -1 && this.currentpage !== this.maxpage) {
      value = true;
    }
    return value;
  }

  get firstPage(): number {
    return this.minpage;
  }

  get prevPage(): number {
    let value = -1;
    if (this.minpage !== -1 && this.currentpage > this.minpage) {
      value = this.currentpage - 1;
    }
    return value;
  }

  get nextPage(): number {
    let value = -1;
    if (this.maxpage !== -1 && this.currentpage < this.maxpage) {
      value = this.currentpage + 1;
    }
    return value;
  }

  get lastPage(): number {
    return this.maxpage;
  }

  //

  setConfig(config: MasterDetailConfig) {
    this.config = config;
    this.pagesize = 1;
  }

  setColumn(columns1: IColumns[]): void {
    const columns2: IColumns[] = [];
    for (let col1 of columns1) {
      const col2 = new TableColumn(col1.name, col1.display);
      if (col1.visibleTableField === undefined) {
        col2.visibleTableField = true;
      } else {
        col2.visibleTableField = col1.visibleTableField;
      }
      if (!col1.orderDetailTable) {
        col2.orderDetailTable = 999;
      } else {
        col2.orderDetailTable = col1.orderDetailTable;
      }
      if (!col1.orderDetailPanel) {
        col2.orderDetailPanel = 999;
      } else {
        col2.orderDetailPanel = col1.orderDetailPanel;
      }
      if (col1.formatDatetime) {
        col2.formatDatetime = col1.formatDatetime;
      } else {
        col2.formatDatetime = undefined;
      }
      if (col1.formatDecimal) {
        col2.formatDecimal = col1.formatDecimal;
      } else {
        col2.formatDecimal = undefined;
      }
      this.setColumnWith(col1, col2);

      columns2.push(col2);
    }
    this.columntable = columns2.filter(x => x.visibleTableField).sort((a, b) => {
      const vala = +a; const valb = +b;
      if (vala < valb) {
        return -1;
      }
      if (vala > valb) {
        return 1;
      }
      return 0;
    });
    this.columndetail = columns2.filter(x => !x.visibleTableField).sort((a, b) => {
      const vala = +a; const valb = +b;
      if (vala < valb) {
        return -1;
      }
      if (vala > valb) {
        return 1;
      }
      return 0;
    });
  }

  setColumnWith(col1: IColumns, col2: TableColumn): void {
    if (col1.myWidth || col1.myMinwidth || col1.myMaxwidth) {
      col2.hasWidth = true;
    } else {
      col2.hasWidth = false;
    }
    if (col1.myWidth) {
      col2.myWidth = col1.myWidth;
      col2.myMinwidth = undefined;
      col2.myMaxwidth = undefined;
      return;
    } else {
      col2.myWidth = undefined;
    }
    if (col1.myMinwidth) {
      col2.myMinwidth = col1.myMinwidth;
      col2.myWidth = undefined;
      col2.myMaxwidth = undefined;
      return;
    } else {
      col2.myMinwidth = undefined;
    }
    if (col1.myMaxwidth) {
      col2.myMaxwidth = col1.myMaxwidth;
      col2.myWidth = undefined;
      col2.myMinwidth = undefined;
      return;
    } else {
      col2.myMaxwidth = undefined;
    }
  }

  setDataSource(result: IResult): void {
    if (this.config.typeMaster === 'one' && result.items.length > 1) {
      this.datasource = undefined; this.totalcount = -1;
      alert('TypeMaster "one" require only 1 result');
      return;
    }
    this.datasource = result.items;
    this.typepagination = (this.config.typeMaster === 'many') ? 'internal' : 'external';
    const count = (this.config.typeMaster === 'many') ? result.count : result.count;
    //const count = (this.config.typeMaster === 'many') ? result.count : 1;
    this.setPageCount(count);
    this.startPagination();
  }

  setStartPage(page: number): void {
    if (this.config.typeMaster === 'many') {
      if (page === undefined) {
        this.startpage = 0;
      } else {
        this.startpage = page;
      }
    } else {
      this.startpage = 0;
    }
  }

  startPagination(): IMasterDetailDto {
    this.resetForChangePage();
    this.currentpage = this.startpage;
    this.currentrecord = this.datasource[this.currentpage];
    const args = this.createPagingArg('start', this.currentrecord);
    this.notifyPaging.next(args);
    return this.currentrecord;
  }

  getFirstPage(): IMasterDetailDto {
    this.resetForChangePage();
    if (this.minpage === -1) {
      return undefined;
    }
    this.currentpage = this.firstPage;
    this.currentrecord = this.datasource[this.currentpage];
    const args = this.createPagingArg('first', this.currentrecord);
    this.notifyPaging.next(args);
    return this.currentrecord;
  }

  getPrevPage(): IMasterDetailDto {
    this.resetForChangePage();
    if (this.hasPrevPage === false) {
      return undefined;
    }
    this.currentpage = this.prevPage;
    this.currentrecord = this.datasource[this.currentpage];
    const args = this.createPagingArg('prev', this.currentrecord);
    this.notifyPaging.next(args);
    return this.currentrecord;
  }

  getNextPage(): IMasterDetailDto {
    this.resetForChangePage();
    if (this.hasNextPage === false) {
      return undefined;
    }
    this.currentpage = this.nextPage;
    this.currentrecord = this.datasource[this.currentpage];
    const args = this.createPagingArg('next', this.currentrecord);
    this.notifyPaging.next(args);
    return this.currentrecord;
  }

  getLastPage(): IMasterDetailDto {
    this.resetForChangePage();
    if (this.maxpage === -1) {
      return undefined;
    }
    this.currentpage = this.lastPage;
    this.currentrecord = this.datasource[this.currentpage];
    const args = this.createPagingArg('last', this.currentrecord);
    this.notifyPaging.next(args);
    return this.currentrecord;
  }

  goToPage(page: number, type = 'page'): IMasterDetailDto {
    this.resetForChangePage();
    if (page >= this.minpage && page <= this.maxpage) {
      this.currentpage = page;
      this.currentrecord = this.datasource[this.currentpage];
      const currtype = (type === 'page') ? 'page' : 'cellpage'
      const args = this.createPagingArg(currtype, this.currentrecord);
      this.notifyPaging.next(args);
      return this.currentrecord;
    }
    return undefined;
  }

  selectMaster(master: IMasterDetailDto): any {
    this.selectedmasterpage = -1;
    const index = this.findMasterIndex(master);
    if (index !== -1) {
      this.currentpage = this.selectedmasterpage = index;
      this.currentrecord = this.datasource[index];
      const args = this.createPagingArg('selected', this.currentrecord);
      this.notifyPaging.next(args);
      return this.currentrecord;
    }
  }

  //

  private setPageCount(count: number): void {
    if (count === 0) {
      this.currentrecord = undefined;
      this.selectedmasterpage = -1;
      this.currentpage = 0;
      this.totalcount = 0;
      this.minpage = -1;
      this.maxpage = -1;
      return;
    }
    this.selectedmasterpage = -1;
    this.currentpage = 0;
    this.totalcount = count;
    const value = this.totalcount / this.pagesize;
    this.minpage = 0;
    this.maxpage = Math.ceil(value) - 1;
    // this.maxpage = Math.ceil(value);
  }

  private createPagingArg(type: TypeOperation, currentrecord: any): PagingArgs {
    const args = new PagingArgs(type, this.currentPage, this.minPage,
      this.maxPage, this.totalCount, this.pageSize, currentrecord);
    return args;
  }

  private resetForChangePage(): void {
    this.selectedmasterpage = -1;
  }

  private findMasterIndex(master: any): number {
    let index = -1;
    for(let item of this.datasource) {
      index = this.datasource.indexOf(item);
      if (item.master === master) {
        break;
      }
    }
    return index;
  }
}
