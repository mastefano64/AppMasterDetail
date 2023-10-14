import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { PagingData } from '../../appcore/datasource/pagingdata';
import { NavbarPagingArgs } from '../../model/navbarpagingargs';

export type PaginationStyle = 'default' | 'cellpage';

@Component({
  selector: 'app-buttonpagination',
  templateUrl: './button-pagination.component.html',
  styleUrls: ['./button-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonPaginationComponent implements OnInit, OnChanges {
  @Input() color = "primary";
  @Input() textfirst = "First";
  @Input() textprev = "Prev";
  @Input() textof = "of";
  @Input() textnext = "Next";
  @Input() textlast = "last";
  @Input() paginationstyle: PaginationStyle;
  @Input() pagstatus: PagingData;
  @Output() navbarpaging = new EventEmitter<NavbarPagingArgs>();

  fist = false;
  barsize = 5;
  baroffset = 2;
  limitsx = -1;
  limitdx = -1;
  currpage = -1;
  pages = [];

  constructor() {
    this.paginationstyle = 'default';
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.paginationstyle === 'cellpage') {
      if (changes['pagstatus']) {
        if (this.pagstatus && !this.fist) {
          // The first is ignored because the BehaviorSubject sends an empty array
          this.initializePagingCellPage();
          this.fist = true;
        }
      }
    }
  }

  get page(): number {
    if (!this.pagstatus)
      return 0;
    return this.pagstatus.page;
  }

  get minPage(): number {
    if (!this.pagstatus)
      return 0;
    return this.pagstatus.minPage;
  }

  get maxPage(): number {
    if (!this.pagstatus)
      return 0;
    return this.pagstatus.maxPage;
  }

  get hasFirstPage(): boolean {
    if (!this.pagstatus)
      return false;
    return this.pagstatus.hasFirstPage;
  }

  get hasPrevPage(): boolean {
    if (!this.pagstatus)
      return false;
    return this.pagstatus.hasPrevPage;
  }

  get hasNextPage(): boolean {
    if (!this.pagstatus)
      return false;
    return this.pagstatus.hasNextPage;
  }

  get hasLastPage(): boolean {
    if (!this.pagstatus)
      return false;
    return this.pagstatus.hasLastPage;
  }

  onPagingFirst() {
    if (this.hasFirstPage === false) {
      return;
    }
    const page = this.pagstatus.minPage;
    if (this.paginationstyle === 'cellpage') {
      this.createPagingCellPage(page);
    }
    const args = new NavbarPagingArgs('first', page);
    this.navbarpaging.emit(args);
  }

  onPagingPrev() {
    if (this.hasPrevPage === false) {
      return;
    }
    const page = this.pagstatus.page - 1;
    if (this.paginationstyle === 'cellpage') {
      this.createPagingCellPage(page);
    }
    const args = new NavbarPagingArgs('prev', page);
    this.navbarpaging.emit(args);
  }

  onPagingNext() {
    if (this.hasNextPage === false) {
      return;
    }
    const page = this.pagstatus.page + 1;
    if (this.paginationstyle === 'cellpage') {
      this.createPagingCellPage(page);
    }
    const args = new NavbarPagingArgs('next', page);
    this.navbarpaging.emit(args);
  }

  onPagingLast() {
    if (this.hasLastPage === false) {
      return;
    }
    const page = this.pagstatus.maxPage;
    if (this.paginationstyle === 'cellpage') {
      this.createPagingCellPage(page);
    }
    const args = new NavbarPagingArgs('last', page);
    this.navbarpaging.emit(args);
  }

  onChangePage(page: number): void {
    this.createPagingCellPage(page);
    const args = new NavbarPagingArgs('cellpage', page);
    this.navbarpaging.emit(args);
  }

  initializePagingCellPage(): void {
    const currentpage = this.pagstatus.page;
    const minpage = this.pagstatus.minPage;
    const maxpage = this.pagstatus.maxPage;
    if (minpage !== -1 && maxpage !== -1) {
      if (this.barsize < maxpage) {
        this.limitsx = (minpage + this.barsize) - 1;
        this.limitdx = (maxpage - this.barsize) + 1;
      } else {
        this.limitsx = minpage;
        this.limitdx = maxpage;
      }
    }
    this.createPagingCellPage(currentpage);
  }

  createPagingCellPage(page: number): void {
    const array = [];
    let start = 0; let end = 0;
    const minpage = this.pagstatus.minPage;
    const maxpage = this.pagstatus.maxPage;
    if (page >= this.limitsx && page <= this.limitdx) {
      start = page - this.baroffset;
      end = page + this.baroffset;
      for (let i = start; i <= end; i++) {
        array.push(i);
      }
    }
    if (page < this.limitsx && page <= this.limitdx) {
      start = minpage;
      end = start + this.barsize;
      for (let i = start; i < end; i++) {
        array.push(i);
      }
    }
    if (page >= this.limitsx && page > this.limitdx) {
      end = maxpage;
      start = end - this.barsize + 1;
      for (let i = start; i <= end; i++) {
        array.push(i);
      }
    }
    this.currpage = page;
    this.pages = array;
  }
}
