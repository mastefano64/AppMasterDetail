import { Component, ContentChild, ElementRef, TemplateRef, Input, Output, EventEmitter, ViewChild,
               OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { PanelMasterHeadDirective } from '../../directive/panel-master-head.directive';
import { PanelMasterSideDirective } from '../../directive/panel-master-side.directive';
import { PanelDetailDirective } from '../../directive/panel-detail.directive';
import { PanelDetailCustom1Directive } from '../../directive/panel-detail-custom1.directive';
import { PanelDetailCustom2Directive } from '../../directive/panel-detail-custom2.directive';
import { PanelDetailCustom3Directive } from '../../directive/panel-detail-custom3.directive';
import { PanelDetailExpansionDirective } from '../../directive/panel-detail-expansion.directive';
import { DataTableComponent } from '../detail-datatable/detail-datatable.component';

import { IMasterDetailDto } from '../../interface/imasterdetaildto';
import { MasterDetailConfig, DetailViewType } from '../../masterdetailconfig';
import { MasterDetailService } from '../../service/masterdetail-service';
import { IColumns, IResult } from '../../interface/type-interface';
import { TableRowsSelectionArgs } from '../../model/table-rows-selection-args';
import { TableEditActionArgs } from '../../model/table-editaction-args';
import { PagingArgs } from '../../model/paging-args';

// https://stackoverflow.com/questions/56694657/how-to-pass-values-and-methods-to-ng-template

@Component({
  selector: 'app-masterdetail',
  templateUrl: './masterdetail.component.html',
  styleUrls: ['./masterdetail.component.scss'],
  providers: [ MasterDetailService ]
})
export class MasterDetailComponent implements OnInit, OnChanges, OnDestroy  {
  @ViewChild('mytable1') table: DataTableComponent;
  @ViewChild('panelDetailDiv') panelDetailDiv: ElementRef;
  @ContentChild(PanelMasterHeadDirective, { read: TemplateRef<any> }) panelMasterHeadTemplate;
  @ContentChild(PanelMasterSideDirective, { read: TemplateRef<any> }) panelMasterSideTemplate;
  @ContentChild(PanelDetailDirective, { read: TemplateRef<any> }) panelDetailTemplate;
  @ContentChild(PanelDetailCustom1Directive, { read: TemplateRef<any> }) panelDetailCustom1Template;
  @ContentChild(PanelDetailCustom2Directive, { read: TemplateRef<any> }) panelDetailCustom2Template;
  @ContentChild(PanelDetailCustom3Directive, { read: TemplateRef<any> }) panelDetailCustom3Template;
  @ContentChild(PanelDetailExpansionDirective, { read: TemplateRef<any> }) panelDetailExpansionTemplate;
  @Input() config: MasterDetailConfig;
  @Input() column: IColumns[];
  @Input() datasource: IResult;
  @Input() startpage: number;
  @Output() detailtableselection = new EventEmitter<TableRowsSelectionArgs>();
  @Output() detailtableaction = new EventEmitter<TableEditActionArgs>();
  @Output() changepaginationitem = new EventEmitter<PagingArgs>();
  isopensideroom = false;
  allrecord: IMasterDetailDto[];
  currpage: number;
  currmasterdetail: IMasterDetailDto;
  currmaster: any;
  currdetails: any[];
  grouprowsby: string;
  slectedview: DetailViewType;
  selectedmasterpage: number;
  selection: TableRowsSelectionArgs;
  selectioncount: number;
  panelSideWidth: string;
  panelSideHeight: string;
  sub: Subscription;

  message1 = 'You must set a defaultDetailViewType';
  message2 = 'You cannot disable enableDetailTable and enable enableDetailTableSelection';
  message3 = 'You cannot enable at the same time: enableDetailTableExpansion and enableDetailTableGroup';
  message4 = 'You cannot enable at the same time: enableDetailTableEdit and enableDetailTableGroup';

  constructor(public navigation: MasterDetailService) {
    this.selection = undefined;
    this.selectioncount = 0;
  }

  ngOnInit(): void {
    if (!this.config.enableDetailPanel && !this.config.enableDetailTable && !this.config.enableDetailPanelCustom1
                 && !this.config.enableDetailPanelCustom2 && !this.config.enableDetailPanelCustom3) {
      this.config.enableDetailTable = true;
    }
    if (!this.config.defaultDetailViewType) {
      alert(this.message1);
    }
    if (!this.config.enableDetailTable && this.config.enableDetailTableSelection) {
      alert(this.message2);
    }
    if (this.config.enableDetailTableExpansion && this.config.enableDetailTableGroup) {
      alert(this.message3);
    }
    if (this.config.enableDetailTableEdit && this.config.enableDetailTableGroup) {
      alert(this.message4);
    }
    this.slectedview = this.config.defaultDetailViewType;
    this.panelSideWidth = this.config.panelMasterSideWidth;
    this.sub = this.navigation.notifyPaging$.subscribe(response => {
      if (response) {
        const result = response as PagingArgs;
        this.currpage = this.navigation.currentPage;
        this.selectedmasterpage = this.navigation.selectedMasterPage;
        this.currmasterdetail = result.data;
        this.currmaster = result.data.master;
        this.currdetails = result.data.details;
        this.changepaginationitem.emit(result);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      if (this.config) {
        this.navigation.setConfig(this.config);
      }
    }
    if (changes['column']) {
      if (this.column) {
        this.navigation.setColumn(this.column);
      }
    }
    if (changes['startpage']) {
      this.navigation.setStartPage(this.startpage);
    }
    if (changes['datasource']) {
      if (this.datasource && this.datasource.items) {
        this.allrecord = this.datasource.items;
        this.navigation.setDataSource(this.datasource);
      }
    }
  }

  confirmCheckboxSelection(): void {
    if (this.selection && this.selection.currentSelection.length > 0) {
      this.detailtableselection.emit(this.selection);
    }
  }

  onTableRowsSelection(args: TableRowsSelectionArgs): void {
    this.selectioncount = args.currentSelection.length;
    this.selection = args;

  }

  onTableEditAction(args: TableEditActionArgs): void {
    this.detailtableaction.emit(args);
  }

  onOpenSidePanel(value: boolean): void {
    const elem = this.panelDetailDiv.nativeElement;
    this.panelSideHeight = elem.offsetHeight + 'px';
    this.isopensideroom = value;
  }

  onGroupSelectedChanged(value: string): void {
    this.grouprowsby = value;
  }

  onDetailViewChanged(value: DetailViewType): void {
    this.slectedview = value;
    this.selection = undefined;
    this.selectioncount = 0;
  }

  expandAllTable(): void {
    this.table.expandAllGroups();
  }

  collapseAllTable(): void {
    this.table.collapseAllGroups();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
