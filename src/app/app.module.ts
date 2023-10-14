import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';

import { AppMaterialModule } from './app.material.module';
import { MasterDetailModule } from './module-masterdetail/masterdetail.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ButtonPaginationComponent } from './components/buttonpagination/button-pagination.component';
import { Page01Component } from './components/page01/page01.component';
import { Page02Component } from './components/page02/page02.component';
import { Page03Component } from './components/page03/page03.component';
import { Page04Component } from './components/page04/page04.component';
import { Page05Component } from './components/page05/page05.component';
import { Page06Component } from './components/page06/page06.component';
import { Page07Component } from './components/page07/page07.component';
import { Page11Component } from './components/page11/page11.component';
import { Page12Component } from './components/page12/page12.component';
import { Page13Component } from './components/page13/page13.component';
import { FormMasterCreateComponent } from './components/form-master-create/form-master-create.component';
import { FormMasterEditComponent } from './components/form-master-edit/form-master-edit.component';
import { FormDetailCreateComponent } from './components/form-detail-create/form-detail-create.component';
import { FormDetailEditComponent } from './components/form-detail-edit/form-detail-edit.component';
import { DetailCustom1Component } from './components/detailcustom1/detail-custom1.component';
import { DetailCustom2Component } from './components/detailcustom2/detail-custom2.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ButtonPaginationComponent,
    Page01Component,
    Page02Component,
    Page03Component,
    Page04Component,
    Page05Component,
    Page06Component,
    Page07Component,
    Page11Component,
    Page12Component,
    Page13Component,
    FormMasterCreateComponent,
    FormMasterEditComponent,
    FormDetailCreateComponent,
    FormDetailEditComponent,
    DetailCustom1Component,
    DetailCustom2Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    MasterDetailModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
