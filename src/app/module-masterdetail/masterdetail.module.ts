import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MasterDetailMaterialModule } from './masterdetail-material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MasterDetailComponent } from './component/masterdetail/masterdetail.component';
import { MasterNavbarComponent } from './component/master-navbar/master-navbar.component';
import { MasterNavbarStatusComponent } from './component/master-navbar-status/master-navbar-status.component';
import { MasterInputSearchComponent } from './component/master-input-search/master-input-search.component';
import { MasterListSideComponent } from './component/master-list-side/master-list-side.component';
import { DataTableComponent } from './component/detail-datatable/detail-datatable.component';
import { PanelMasterHeadDirective } from './directive/panel-master-head.directive';
import { PanelMasterSideDirective } from './directive/panel-master-side.directive';
import { PanelDetailDirective } from './directive/panel-detail.directive';
import { PanelDetailCustom1Directive } from './directive/panel-detail-custom1.directive';
import { PanelDetailCustom2Directive } from './directive/panel-detail-custom2.directive';
import { PanelDetailCustom3Directive } from './directive/panel-detail-custom3.directive';
import { PanelDetailExpansionDirective } from './directive/panel-detail-expansion.directive';

@NgModule({
  declarations: [
    MasterDetailComponent,
    MasterNavbarComponent,
    MasterNavbarStatusComponent,
    MasterInputSearchComponent,
    MasterListSideComponent,
    DataTableComponent,
    PanelMasterHeadDirective,
    PanelMasterSideDirective,
    PanelDetailDirective,
    PanelDetailCustom1Directive,
    PanelDetailCustom2Directive,
    PanelDetailCustom3Directive,
    PanelDetailExpansionDirective
  ],
  exports: [
    MasterDetailComponent,
    MasterNavbarComponent,
    MasterNavbarStatusComponent,
    MasterInputSearchComponent,
    MasterListSideComponent,
    DataTableComponent,
    PanelMasterHeadDirective,
    PanelMasterSideDirective,
    PanelDetailDirective,
    PanelDetailCustom1Directive,
    PanelDetailCustom2Directive,
    PanelDetailCustom3Directive,
    PanelDetailExpansionDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MasterDetailMaterialModule,
    NgxDatatableModule
  ]
})
export class MasterDetailModule { }
