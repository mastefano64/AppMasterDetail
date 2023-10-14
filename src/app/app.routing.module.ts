import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'page01', component: Page01Component },
  { path: 'page02', component: Page02Component },
  { path: 'page03', component: Page03Component },
  { path: 'page04', component: Page04Component },
  { path: 'page05', component: Page05Component },
  { path: 'page06', component: Page06Component },
  { path: 'page07', component: Page07Component },
  { path: 'page11', component: Page11Component },
  { path: 'page12', component: Page12Component },
  { path: 'page13', component: Page13Component },
  { path: '**', redirectTo: 'page1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
