import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { MatSelectChange } from '@angular/material/select';

import { MasterDetailConfig, DetailViewType, GroupField } from '../../masterdetailconfig';
import { MasterDetailService } from '../../service/masterdetail-service';
import { KeyValuePairStr } from '../../model/keyvaluepair';

@Component({
  selector: 'app-masternavbar',
  templateUrl: './master-navbar.component.html',
  styleUrls: ['./master-navbar.component.scss']
})
export class MasterNavbarComponent implements OnInit, OnDestroy {
  @Input() config: MasterDetailConfig;
  @Output() opensidepanel = new EventEmitter<boolean>();
  @Output() changegroupselected = new EventEmitter<string>();
  @Output() changedetailview = new EventEmitter<DetailViewType>();
  detailViewType: DetailViewType;
  isopensideroom = false;
  listradio = new Array<KeyValuePairStr>();
  tableGroupField: GroupField[];
  groupselected = '-1';

  constructor(public navigation: MasterDetailService) { }

  ngOnInit(): void {
    if (this.config.enableDetailPanel) {
      const r1 = new KeyValuePairStr('listcard', this.config.labelDetailToggleCardPanel);
      this.listradio.push(r1);
    }
    if (this.config.enableDetailTable) {
      const r2 = new KeyValuePairStr('table', this.config.labelDetailToggleCardTable);
      this.listradio.push(r2);
    }
    if (this.config.enableDetailPanelCustom1) {
      const r3 = new KeyValuePairStr('custom1', this.config.labelDetailToggleCardCustom1);
      this.listradio.push(r3);
    }
    if (this.config.enableDetailPanelCustom2) {
      const r4 = new KeyValuePairStr('custom2', this.config.labelDetailToggleCardCustom2);
      this.listradio.push(r4);
    }
    if (this.config.enableDetailPanelCustom3) {
      const r5 = new KeyValuePairStr('custom3', this.config.labelDetailToggleCardCustom3);
      this.listradio.push(r5);
    }
    this.detailViewType = this.config.defaultDetailViewType;
    this.tableGroupField= this.config.tableGroupField;
  }

  onOpenSidePanel(): void {
    this.isopensideroom = !this.isopensideroom;
    this.opensidepanel.emit(this.isopensideroom);
  }

  onViewChange(data: any): void {
    this.detailViewType = data.value;
    this.isopensideroom = false;
    this.opensidepanel.emit(this.isopensideroom);
    this.changedetailview.emit(data.value);
  }

  onGroupsChange(event: MatSelectChange): void {
    this.changegroupselected.emit(event.value);
  }

  onNavBarFirstClick(): void {
    if (this.navigation.hasFirstPage === true) {
      this.navigation.getFirstPage();
    }
  }

  onNavBarPrevClick(): void {
    if (this.navigation.hasPrevPage === true) {
      this.navigation.getPrevPage();
    }
  }

  onNavBarNextClick(): void {
    if (this.navigation.hasNextPage === true) {
      this.navigation.getNextPage();
    }
  }

  onNavBarLastClick(): void {
    if (this.navigation.hasLastPage === true) {
      this.navigation.getLastPage();
    }
  }

  ngOnDestroy(): void {

  }
}
