import { inject } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { PagingData } from './pagingdata';
import { EventDispatcher, IEvent } from '../events';
import { QueryBackup } from './querybackup';
import { LoadingService } from '../service/loading.service';

export class BaseDataSourceClient<J, K, Z> implements DataSource<K>, IBaseDataSource {
  private page = 0;
  private minpage = -1;
  private maxpage = -1;
  private pagesize = 25;
  private orderbycolumn = '';
  private orderbydirection = '';
  private loadingservice = inject(LoadingService);
  private responseSubject = new BehaviorSubject<K[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public datetime = new Date();
  public result: any;
  public count = -1;

  private loaded: EventDispatcher<BaseDataSourceClient<J, K, Z>, any> = new EventDispatcher<BaseDataSourceClient<J, K, Z>, any>();

  constructor(protected service: Z, public search?: J) {}

  connect(collectionViewer: CollectionViewer): Observable<K[]> {
    return this.responseSubject.asObservable();
  }

  //

  get currentPage(): number {
    return this.page;
  }

  get pageSize(): number {
    return this.pagesize;
  }

  get orderbyColumn(): string {
    return this.orderbycolumn;
  }

  get orderbyDirection(): string {
    return this.orderbydirection;
  }

  //

  get hasFirstPage(): boolean {
    let value = false;
    if (this.page !== this.minpage) {
      value = true;
    }
    return value;
  }

  get hasPrevPage(): boolean {
    let value = false;
    if (this.minpage !== -1 && this.page > this.minpage) {
      value = true;
    }
    return value;
  }

  get hasNextPage(): boolean {
    let value = false;
    if (this.maxpage !== -1 && this.page < this.maxpage) {
      value = true;
    }
    return value;
  }

  get hasLastPage(): boolean {
    let value = false;
    if (this.page !== this.maxpage) {
      value = true;
    }
    return value;
  }

  get firstPage(): number {
    return this.minpage;
  }

  get prevPage(): number {
    let value = -1;
    if (this.minpage !== -1 && this.page > this.minpage) {
      value = this.page - 1;
    }
    return value;
  }

  get nextPage(): number {
    let value = -1;
    if (this.maxpage !== -1 && this.page < this.maxpage) {
      value = this.page + 1;
    }
    return value;
  }

  get lastPage(): number {
    return this.maxpage;
  }

  //

  get onDataLoaded(): IEvent<BaseDataSourceClient<J, K, Z>, any> {
    return this.loaded;
  }

  queryBackup(): string {
    return QueryBackup.backup(this.search, this.page, this.pagesize, this.orderbycolumn, this.orderbydirection);
  }

  loadPaggedData(page: number, pagesize: number, orderbycolumn: string, orderbydirection = 'asc'): void {
    this.loadingSubject.next(true);

    (this.service as any).fetchAllData(this.search, orderbycolumn, orderbydirection).pipe(
      catchError((e) =>  {
        //this.loadingservice?.resetLoading();
        alert('Si è verifcato un problema oppure non hai i permesso necessati!');
        return of([]);
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((response: { count: number; }) => {
      this.page = 0;
      this.pagesize = pagesize;
      this.orderbydirection = orderbydirection;
      this.orderbycolumn = orderbycolumn;
      this.setPageCount(response.count);
      this.result = response;
      this.goToPage(this.page);
      this.datetime = new Date();
      this.dispatchDataLoaded();
    });
  }

  gotoFirstPage(): boolean {
    if (this.hasFirstPage === false) {
      return false;
    }
    this.goToPage(this.firstPage);
    return true;
  }

  gotoPrevPage(): boolean {
    if (this.hasPrevPage === false) {
      return false;
    }
    this.goToPage(this.prevPage);
    return true;
  }

  gotoNextPage(): boolean {
    if (this.hasNextPage === false) {
      return false;
    }
    this.goToPage(this.nextPage);
    return true;
  }

  gotoLastPage(): boolean {
    if (this.hasLastPage === false) {
      return false;
    }
    this.goToPage(this.lastPage);
    return true;
  }

  refresh(): void {
    if (this.minpage === -1 && this.maxpage === -1) {
      return;
    }
    this.loadPaggedData(this.page, this.pagesize, this.orderbycolumn, this.orderbydirection);
  }

  goToPage(index: number) {
    this.page = index;
    const skip = this.page * this.pagesize;
    const pagged = this.result.items.slice(skip, skip + this.pagesize);
    this.responseSubject.next([ ...pagged ]);
  }

  getPagingData(): PagingData {
    const pd = new PagingData();
    pd.page = this.page;
    pd.pagesize = this.pagesize;
    pd.minPage = this.minpage;
    pd.maxPage = this.maxpage;
    pd.count = this.count;
    pd.hasFirstPage = this.hasFirstPage;
    pd.hasPrevPage = this.hasPrevPage;
    pd.hasNextPage = this.hasNextPage;
    pd.hasLastPage = this.hasLastPage;
    return pd;
  }

  getItems(): K[] {
    return this.result.items;
  }

  private setPageCount(count: number): void {
    if (count === 0) {
      this.count = 0;
      this.minpage = 0;
      this.maxpage = 0;
      return;
    }
    this.count = count;
    const value = this.count / this.pagesize;
    this.minpage = 0;
    this.maxpage = Math.ceil(value) - 1;
  }

  private dispatchDataLoaded(): void {
    const pd = new PagingData();
    pd.page = this.page;
    pd.minPage = this.minpage;
    pd.maxPage = this.maxpage;
    pd.count = this.count;
    pd.hasFirstPage = this.hasFirstPage;
    pd.hasPrevPage = this.hasPrevPage;
    pd.hasNextPage = this.hasNextPage;
    pd.hasLastPage = this.hasLastPage;
    this.loaded.dispatch(this, pd);
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.responseSubject.complete();
    this.loadingSubject.complete();
    this.responseSubject.unsubscribe();
    this.loadingSubject.unsubscribe();
    this.loaded.dispose();
  }
}

export interface IBaseDataSource {
  loading$: Observable<boolean>;
  currentPage: number;
  pageSize: number;
  orderbyColumn: string;
  orderbyDirection: string;
  hasFirstPage: boolean;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  hasLastPage: boolean;
  firstPage: number;
  prevPage: number;
  nextPage: number;
  lastPage: number;
  loadPaggedData(page: number, pagesize: number, orderbycolumn: string, orderbydirection: string): void;
  gotoFirstPage(): boolean;
  gotoPrevPage(): boolean;
  gotoNextPage(): boolean;
  gotoLastPage(): boolean;
  refresh(): void;
}
