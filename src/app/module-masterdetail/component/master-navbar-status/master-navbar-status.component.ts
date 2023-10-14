import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MasterDetailConfig } from '../../masterdetailconfig';
import { MasterDetailService } from '../../service/masterdetail-service';
import { PagingArgs } from '../../model/paging-args';

@Component({
  selector: 'app-masternavbarstatus',
  templateUrl: './master-navbar-status.component.html',
  styleUrls: ['./master-navbar-status.component.scss']
})
export class MasterNavbarStatusComponent implements OnInit, OnDestroy {
  @Input() config: MasterDetailConfig;
  barsize = 5;
  baroffset = 2;
  limitsx = -1;
  limitdx = -1;
  currpage = -1;
  pages = [];
  sub: Subscription;

  constructor(public navigation: MasterDetailService) { }

  ngOnInit(): void {
    if (this.config.navbarStatusStyle === 'cellpage') {
      const cps = this.config.navbarStatusCellPageSize;
      const currentpage = this.navigation.currentPage;
      const minpage = this.navigation.minPage;
      const maxpage = this.navigation.maxPage;
      if (cps === 'barsize5') {
        this.barsize = 5;
        this.baroffset = 2;
      }
      if (cps === 'barsize7') {
        this.barsize = 7;
        this.baroffset = 3;
      }
      if (cps === 'barsize9') {
        this.barsize = 9;
        this.baroffset = 4;
      }
      if (minpage !== -1 && maxpage !== -1) {
        if (this.barsize < maxpage) {
          this.limitsx = (minpage + this.barsize) - 1;
          this.limitdx = (maxpage - this.barsize) + 1;
        } else {
          this.limitsx = minpage;
          this.limitdx = maxpage;
        }
        this.sub = this.navigation.notifyPaging$.subscribe(response => {
          if (response) {
            const result = response as PagingArgs;
            if (result.type !== 'cellpage') {
              this.createPagingCellPage(result.currentPage);
            }
          }
        });
      }
    }
  }

  onChangePage(page: number): void {
    this.createPagingCellPage(page);
    this.navigation.goToPage(page, 'cellpage');
  }

  createPagingCellPage(page: number): void {
    const array = [];
    let start = 0; let end = 0;
    const minpage = this.navigation.minPage;
    const maxpage = this.navigation.maxPage;
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

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
