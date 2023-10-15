import { Component, SecurityContext, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  _htmlProperty01 = `createConfig(): MasterDetailConfig {
    const config = new MasterDetailConfig();
    config.typeMaster = 'many';
    config.enableDetailPanel = true;
    config.enableDetailTable = false;
    config.defaultDetailViewType = 'listcard';
    config.enableDetailTableSelection = false;
    config.enableDetailTableExpansion = false;
    config.detailTableExpansionType = 'none';
    config.panelMasterSideWidth = '500px';
    return config;
  }`;

  _htmlProperty02 = `createConfig(): MasterDetailConfig {
    const config = new MasterDetailConfig();
    config.typeMaster = 'many';
    config.enableDetailPanel = false;
    config.enableDetailTable = true;
    config.defaultDetailViewType = 'table';
    config.enableDetailTableSelection = false;
    config.enableDetailTableExpansion = false;
    config.detailTableExpansionType = 'none';
    config.panelMasterSideWidth = '500px';
    return config;
  }`;

  _htmlProperty03 = `createConfig(): MasterDetailConfig {
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
  }`;

  _htmlProperty04 = `createConfig(): MasterDetailConfig {
    const config = new MasterDetailConfig();
    config.typeMaster = 'many';
    config.enableDetailPanel = true;
    config.enableDetailTable = true;
    config.defaultDetailViewType = 'listcard';
    config.enableDetailTableSelection = false;
    config.enableDetailTableExpansion = true;
    config.enableDetailTableEdit = true;
    config.detailTableColumnMode = 'force';
    config.detailTableExpansionType = 'default';
    config.navbarStatusStyle = 'cellpage';
    config.navbarStatusCellPageSize = 'barsize7';
    config.panelMasterSideWidth = '500px';
    config.searchField = [ 'name', 'customer' ];
    config.tableEditField.push( { action: 'edit', icon: 'edit' });
    config.tableEditField.push( { action: 'delete', icon: 'cancel' });
    return config;
  }`;

  _htmlProperty05 = `createConfig(): MasterDetailConfig {
    const config = new MasterDetailConfig();
    config.typeMaster = 'many';
    config.enableDetailPanel = true;
    config.enableDetailTable = true;
    config.defaultDetailViewType = 'listcard';
    config.enableDetailTableSelection = false;
    config.enableDetailTableExpansion = true;
    config.enableDetailTableEdit = true;
    config.detailTableColumnMode = 'force';
    config.detailTableExpansionType = 'template';
    config.panelMasterSideWidth = '500px';
    config.searchField = [ 'name', 'customer' ];
    config.tableEditField.push( { action: 'edit', icon: 'edit' });
    config.tableEditField.push( { action: 'delete', icon: 'cancel' });
    return config;
  }`;

  _htmlProperty06 = `createConfig(): MasterDetailConfig {
    const config = new MasterDetailConfig();
    config.typeMaster = 'many';
    config.enableDetailPanel = true;
    config.enableDetailTable = true;
    config.defaultDetailViewType = 'listcard';
    config.enableDetailTableSelection = false;
    config.enableDetailTableExpansion = false;
    config.enableDetailTableGroup = true;
    config.detailTableColumnMode = 'force';
    config.detailTableExpansionType = 'none';
    config.panelMasterSideWidth = '500px';
    config.searchField = [ 'name', 'customer' ];
    config.tableGroupField.push( { display: 'Typedetail1', name: 'typedetail1' });
    config.tableGroupField.push( { display: 'Typedetail2', name: 'typedetail2' });
    return config;
  }`;

  _htmlProperty07 = `createConfig(): MasterDetailConfig {
    const config = new MasterDetailConfig();
    config.typeMaster = 'many';
    config.enableDetailPanel = true;
    config.enableDetailTable = true;
    config.enableDetailPanelCustom1 = true;
    config.enableDetailPanelCustom2 = true;
    config.defaultDetailViewType = 'table';
    config.enableDetailTableSelection = false;
    config.enableDetailTableExpansion = true;
    config.enableDetailTableEdit = true;
    config.detailTableColumnMode = 'force';
    config.detailTableExpansionType = 'template';
    config.panelMasterSideWidth = '500px';
    config.searchField = [ 'name', 'customer' ];
    config.tableEditField.push( { action: 'edit', icon: 'edit' });
    config.tableEditField.push( { action: 'delete', icon: 'cancel' });
    return config;
  }`;

  _htmlProperty11 = `createConfig(): MasterDetailConfig {
    const config = new MasterDetailConfig();
    config.typeMaster = 'one';
    config.enableDetailPanel = true;
    config.enableDetailTable = true;
    config.defaultDetailViewType = 'listcard';
    config.enableDetailTableSelection = false;
    config.enableDetailTableExpansion = true;
    config.enableDetailTableEdit = true;
    config.detailTableColumnMode = 'force';
    config.detailTableExpansionType = 'default';
    config.navbarStatusStyle = 'cellpage';
    config.navbarStatusCellPageSize = 'barsize7';
    config.panelMasterSideWidth = '500px';
    config.searchField = [ 'name', 'customer' ];
    config.tableEditField.push( { action: 'edit', icon: 'edit' });
    config.tableEditField.push( { action: 'delete', icon: 'cancel' });
    return config;
  }`;

  _htmlProperty12 = `createConfig(): MasterDetailConfig {
    const config = new MasterDetailConfig();
    config.typeMaster = 'one';
    config.enableDetailPanel = true;
    config.enableDetailTable = true;
    config.defaultDetailViewType = 'listcard';
    config.enableDetailTableSelection = false;
    config.enableDetailTableExpansion = true;
    config.enableDetailTableEdit = true;
    config.detailTableColumnMode = 'force';
    config.detailTableExpansionType = 'template';
    config.panelMasterSideWidth = '500px';
    config.searchField = [ 'name', 'customer' ];
    config.tableEditField.push( { action: 'edit', icon: 'edit' });
    config.tableEditField.push( { action: 'delete', icon: 'cancel' });
    return config;
  }`;

  _htmlProperty13 = `createConfig(): MasterDetailConfig {
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
  }`;

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  public get htmlProperty01() : SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this._htmlProperty01);
  }

  public get htmlProperty02() : SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this._htmlProperty02);
  }

  public get htmlProperty03() : SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this._htmlProperty03);
  }

  public get htmlProperty04() : SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this._htmlProperty04);
  }

  public get htmlProperty05() : SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this._htmlProperty05);
  }

  public get htmlProperty06() : SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this._htmlProperty06);
  }

  public get htmlProperty07() : SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this._htmlProperty07);
  }

  public get htmlProperty11() : SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this._htmlProperty11);
  }

  public get htmlProperty12() : SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this._htmlProperty12);
  }

  public get htmlProperty13() : SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this._htmlProperty13);
  }

  ngOnInit(): void {

  }

}
