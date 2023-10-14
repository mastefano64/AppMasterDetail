import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, switchMap } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { MasterDetailConfig } from '../../module-masterdetail/masterdetailconfig';
import { FormMasterCreateComponent } from '../form-master-create/form-master-create.component';
import { FormMasterEditComponent } from '../form-master-edit/form-master-edit.component';
import { FormDetailCreateComponent } from '../form-detail-create/form-detail-create.component';
import { FormDetailEditComponent } from '../form-detail-edit/form-detail-edit.component';
import { MasterDetailSearch } from 'src/app/model/masterdetailsearch';
import { MasterDto, DetailDto } from '../../model/masterdetaildto';
import { ApiMasterDetailService } from '../../service/api-masterdetail-service';
import { IColumns, IResult } from '../../module-masterdetail/interface/type-interface';
import { TableEditActionArgs } from '../../module-masterdetail/model/table-editaction-args';
import { MasterDetailDataSource } from '../../datasource/masterdetail-datasource';
import { PagingData } from '../../appcore/datasource/pagingdata';
import { NavbarPagingArgs } from '../../model/navbarpagingargs';

@Component({
  selector: 'app-page13',
  templateUrl: './page13.component.html',
  styleUrls: ['./page13.component.css']

})
export class Page13Component implements OnInit {
  config: MasterDetailConfig;
  search: MasterDetailSearch;
  column: IColumns[];
  datasource: IResult;
  currpage: number;
  pagesize: number;
  pagstatus: PagingData;
  mds: MasterDetailDataSource;
  first = true;
  mds$;

  destroy: Subject<boolean> = new Subject<boolean>();

  mycolumn1: IColumns[] = [
    { name: 'detailId', display: 'DetailId', visibleTableField: true, myMaxwidth: 100 },
    { name: 'masterId', display: 'MasterId', visibleTableField: true, myMaxwidth: 100 },
    { name: 'name', display: 'Name', visibleTableField: true },
    { name: 'product', display: 'Product', visibleTableField: true },
    { name: 'dfield1', display: 'Dfield1', visibleTableField: true },
    { name: 'dfield2', display: 'Dfield2', visibleTableField: false },
    { name: 'dfield3', display: 'Dfield3', visibleTableField: false },
    { name: 'dfield4', display: 'Dfield4', visibleTableField: false },
    { name: 'dfield5', display: 'Dfield5', visibleTableField: false }
  ]

  constructor(private dialog: MatDialog, private service: ApiMasterDetailService) {
    this.search = new MasterDetailSearch();
    this.service.firstFetchFromCache = true;
    this.mds = new MasterDetailDataSource(this.service, this.search);
    this.column = this.mycolumn1;
    this.config = this.createConfig();
    this.currpage = 0;
    this.pagesize = 1;
  }

  ngOnInit() {
    const first = true;
    this.mds$ = this.mds.connect(null);
    this.mds$.subscribe((items: any[]) => {
      if (this.first === false) {
        // The first is ignored because the BehaviorSubject sends an empty array
        this.pagstatus = this.mds.getPagingData();
        const result = this.mds.result; // only for compare!
        const source = {
          count: this.pagstatus.count,
          items: items,
          page: this.pagstatus.page,
          url: ''
        }
        this.datasource = source;
      }
      this.first = false;
    });
    this.loadMasterDetail();
  }

  createConfig(): MasterDetailConfig {
    const config = new MasterDetailConfig();
    config.typeMaster = 'one';
    config.enableDetailPanel = true;
    config.enableDetailTable = true;
    config.enableDetailPanelCustom1 = true;
    config.enableDetailPanelCustom2 = true;
    config.defaultDetailViewType = 'listcard';
    config.enableDetailTableSelection = false;
    config.enableDetailTableExpansion = true;
    config.enableDetailTableEdit = true;
    config.defaultDetailViewType = 'table';
    config.detailTableColumnMode = 'force';
    config.detailTableExpansionType = 'template';
    config.panelMasterSideWidth = '500px';
    config.searchField = [ 'name', 'customer' ];
    config.tableEditField.push( { action: 'edit', icon: 'edit' });
    config.tableEditField.push( { action: 'delete', icon: 'cancel' });
    return config;
  }

  // the loadMasterDetail() load the datasource with specified options
  onNavbarPaging(args: NavbarPagingArgs): void {
    if (args.action === 'first') {
      this.currpage = args.page;
      this.mds.gotoFirstPage();
    }
    if (args.action === 'prev') {
      this.currpage = args.page;
      this.mds.gotoPrevPage();
    }
    if (args.action === 'next') {
      this.currpage = args.page;
      this.mds.gotoNextPage();
    }
    if (args.action === 'last') {
      this.currpage = args.page;
      this.mds.gotoLastPage();
    }
    if (args.action === 'cellpage') {
      this.currpage = args.page;
      this.loadMasterDetail();
    }
  }

  // ------------

  onMasterCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '750px';
    dialogConfig.disableClose = true;
    dialogConfig.data = {  };
    const dialogRef = this.dialog.open(FormMasterCreateComponent, dialogConfig);
    //
    const sub = dialogRef.componentInstance.confirm.pipe(
      switchMap(data => this.service.insertMaster(data))
    ).subscribe(response => {
      dialogRef.close('ok');
    });
    //
    dialogRef.afterClosed().subscribe(data => {
      sub.unsubscribe();
      if (data === 'ok') {
        this.currpage = 0;
        // the loadMasterDetail() load the datasource with specified options
        this.loadMasterDetail();
      }
    });
  }

  // page index base 0
  onMasterEdit(page: number, master: MasterDto): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '750px';
    dialogConfig.disableClose = true;
    dialogConfig.data = { master }
    const dialogRef = this.dialog.open(FormMasterEditComponent, dialogConfig);
    //
    const sub = dialogRef.componentInstance.confirm.pipe(
      switchMap(data => this.service.updateMaster(data))
    ).subscribe(response => {
      dialogRef.close('ok');
    });
    //
    dialogRef.afterClosed().subscribe(data => {
      sub.unsubscribe();
      if (data === 'ok') {
        // the refresh() reload the source with current options
        this.mds.refresh();
      }
    });
  }

  // page index base 0
  onMasterDelete(page: number, master: MasterDto): void {
    this.currpage = 0;
    if (confirm('Are you sure?') === false) {
      return;
    }
    this.service.deleteMaster(master).subscribe(response => {
      this.currpage = 0;
      // the loadMasterDetail() load the datasource with specified options
      this.loadMasterDetail();
    });
  }

  // ------------

  onDetailCreate(page: number, master: MasterDto): void {
    this.currpage = page;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '750px';
    dialogConfig.disableClose = true;
    dialogConfig.data = { master };
    const dialogRef = this.dialog.open(FormDetailCreateComponent, dialogConfig);
    //
    const sub = dialogRef.componentInstance.confirm.pipe(
      switchMap(data => this.service.insertDetail(data))
    ).subscribe(response => {
      dialogRef.close('ok');
    });
    //
    dialogRef.afterClosed().subscribe(data => {
      sub.unsubscribe();
      if (data === 'ok') {
        // the refresh() reload the source with current options
        this.mds.refresh();
      }
    });
  }

  // page index base 0
  onDetailEdit(page: number, detail: DetailDto): void {
    this.currpage = page;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '750px';
    dialogConfig.disableClose = true;
    dialogConfig.data = { detail }
    const dialogRef = this.dialog.open(FormDetailEditComponent, dialogConfig);
    //
    const sub = dialogRef.componentInstance.confirm.pipe(
      switchMap(data => this.service.updateDetail(data))
    ).subscribe(response => {
      dialogRef.close('ok');
    });
    //
    dialogRef.afterClosed().subscribe(data => {
      sub.unsubscribe();
      if (data === 'ok') {
        // the refresh() reload the source with current options
        this.mds.refresh();
      }
    });
  }

  // page index base 0
  onDetailDelete(page: number, detail: DetailDto): void {
    if (confirm('Are you sure?') === false) {
      return;
    }
    this.service.deleteDetail(detail).subscribe(response => {
      // the refresh() reload the source with current options
      this.mds.refresh();
    });
  }

  // ------------

  onDetailTableAction(args: TableEditActionArgs): void {
    if (args.action === 'edit') {
      this.onDetailEdit(args.page, args.row);
    }
    if (args.action === 'delete') {
      this.onDetailDelete(args.page, args.row);
    }
  }

  // ------------

  loadMasterDetail(): void {
    this.mds.loadPaggedData(this.currpage, this.pagesize, 'masterId');
  }

  ngOnDestroy(): void {
    this.mds.disconnect(null);
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
