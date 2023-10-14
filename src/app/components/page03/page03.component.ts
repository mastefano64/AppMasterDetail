import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { MasterDetailConfig } from '../../module-masterdetail/masterdetailconfig';
import { FormMasterCreateComponent } from '../form-master-create/form-master-create.component';
import { FormMasterEditComponent } from '../form-master-edit/form-master-edit.component';
import { FormDetailCreateComponent } from '../form-detail-create/form-detail-create.component';
import { FormDetailEditComponent } from '../form-detail-edit/form-detail-edit.component';
import { MasterDto, DetailDto } from '../../model/masterdetaildto';
import { ApiMasterDetailService } from '../../service/api-masterdetail-service';
import { IColumns, IResult } from '../../module-masterdetail/interface/type-interface';
import { PagingArgs } from '../../module-masterdetail/model/paging-args';
import { TableRowsSelectionArgs } from '../../module-masterdetail/model/table-rows-selection-args';
import { TableEditActionArgs } from '../../module-masterdetail/model/table-editaction-args';

@Component({
  selector: 'app-page03',
  templateUrl: './page03.component.html',
  styleUrls: ['./page03.component.css']

})
export class Page03Component implements OnInit {
  param: string;
  config: MasterDetailConfig;
  column: IColumns[];
  datasource: IResult;
  currpage: number;

  mycolumn1: IColumns[] = [
    { name: 'detailId', display: 'DetailId', myMaxwidth: 100 },
    { name: 'masterId', display: 'MasterId', myMaxwidth: 100 },
    { name: 'name', display: 'Name' },
    { name: 'product', display: 'Product' },
    { name: 'dfield1', display: 'Dfield1' },
    { name: 'dfield2', display: 'Dfield2' },
    { name: 'dfield3', display: 'Dfield3' },
    { name: 'dfield4', display: 'Dfield4' },
    { name: 'dfield5', display: 'Dfield5' }
  ]

  constructor(private dialog: MatDialog, private service: ApiMasterDetailService) {
    this.column = this.mycolumn1;
    this.config = this.createConfig();
  }

  ngOnInit() {
    this.loadMasterDetail(false);
  }

  createConfig(): MasterDetailConfig {
    const config = new MasterDetailConfig();
    config.typeMaster = 'many';
    config.enableDetailPanel = true;
    config.enableDetailTable = true;
    config.defaultDetailViewType = 'listcard';
    config.enableDetailTableSelection = true;
    config.enableDetailTableExpansion = false;
    config.enableDetailTableEdit = true;
    config.detailTableColumnMode = 'force';
    config.detailTableExpansionType = 'none';
    config.navbarStatusStyle = 'cellpage';
    config.navbarStatusCellPageSize = 'barsize5';
    config.panelMasterSideWidth = '500px';
    config.searchField = [ 'name', 'customer' ];
    config.tableEditField.push( { action: 'edit', icon: 'edit' });
    config.tableEditField.push( { action: 'delete', icon: 'cancel' });
    config.tableEditField.push( { action: 'command1', icon: 'control_camera', tooltips: 'command-1' });
    config.tableEditField.push( { action: 'command2', icon: 'equalizer', tooltips: 'command-2' });
    return config;
  }

  onPaginationItemChanged(item: PagingArgs): void {
    const a = item;
  }

  // ------------

  onMasterCreate(): void {
    this.currpage = 0;
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
        this.loadMasterDetail(true);
      }
    });
  }

  // page index base 0
  onMasterEdit(page: number, master: MasterDto): void {
    this.currpage = page;
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
        this.loadMasterDetail(true);
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
      this.loadMasterDetail(true);
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
        this.loadMasterDetail(true);
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
        this.loadMasterDetail(true);
      }
    });
  }

  // page index base 0
  onDetailDelete(page: number, detail: DetailDto): void {
    this.currpage = page;
    if (confirm('Are you sure?') === false) {
      return;
    }
    this.service.deleteDetail(detail).subscribe(response => {
      this.loadMasterDetail(true);
    });
  }

  // ------------

  onTableRowsSelection(args: TableRowsSelectionArgs): void {
    const selected = args;
    alert('Selected ' + selected.currentSelection.length + ' items!');
    console.log(selected);
  }

  onDetailTableAction(args: TableEditActionArgs): void {
    this.currpage = args.page;
    if (args.action === 'edit') {
      this.onDetailEdit(args.page, args.row);
    }
    if (args.action === 'delete') {
      this.onDetailDelete(args.page, args.row);
    }
    if (args.action === 'command1') {
      alert('command1');
    }
    if (args.action === 'command2') {
      alert('command2');
    }
  }

  // ------------

  loadMasterDetail(fromcache: boolean): void {
    this.service.getMasterDetailMany(fromcache).subscribe(response => {
      const result = response as IResult;
      this.datasource = result;
    });
  }

}
