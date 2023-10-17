### This is a master-detail control for Angular (it is a preview)..

<br/>

> MasterDetail is an Angular control that allows the display of data sources that are linked by a master-detail relationship. It offers various features, including pagination, list view, tabular view, insertion, editing, deletion, grouping/field (if tabular view is being used), creation of custom detail panels, etc... The various panels: "list", "tabular" or "custom"; however, they can be individually enabled/disabled.

![masterdetail1](/screenshot/image1.png)
![masterdetail2](/screenshot/image2.png)
![masterdetail3](/screenshot/image3.png)
![masterdetail4](/screenshot/image4.png)

#### Data Sources:

The data is retrieved through a REST call made to a server, and the contract of the returned data is as follows:

```
export interface IResult {
  count: number,
  items: any[],
  page: number,
  url: string
}
```

the items array has the following contract

```
export interface IMasterDetailDto {
  master: any;
  details: any[];
}
```

as you can see, it implements the IMasterDetailDto interface and has 2 properties: master and details.

#### Pagination

The control supports 2 types of pagination (internal/external):

1) The data is read all at once and then paginated through an internal navigation bar.

2) One piece of data is read at a time, passed to the MasterDetail control, and paginated through an external navigation bar. An external "datasource" is used, responsible for making the corresponding REST calls (and paginate the data).

You can enable one or the other mode through the "**typeMaster**" parameter within the configuration (see below) and it can have the following values: "**many**" or "**one**".

many => pagesize=9999 => count=N - items=0.N  
one => pagesize=1 => count=N - items=0.1 

#### Layout

The layout is managed:

1) through a configuration object that is then passed to the MasterDetail control, and with which various functionalities are enabled or disabled.

2) through templates contained between the opening and closing tags of the MasterDetail control.

Let's see an excerpt of the configuration object (the corresponding file can be viewed in the GitHub project at the following path).

AppMasterDetail\src\app\module-masterdetail\masterdetailconfig.ts

```js:
export class MasterDetailConfig {
  typeMaster: TypeMaster;
  enableDetailPanel: boolean;
  enableDetailTable: boolean;
  enableDetailPanelCustom1: boolean;
  enableDetailPanelCustom2: boolean;
  enableDetailPanelCustom3: boolean;
  enableDetailTableSelection: boolean;
  enableDetailTableExpansion: boolean;
  enableDetailTableEdit: boolean;
  enableDetailTableGroup: boolean;
  defaultDetailViewType: DetailViewType;
  detailTableColumnMode: DetailTableColumnMode;
  detailTableExpansionType: DetailTableExpansionType;
  navbarStatusStyle: NavbarStatusStyle;
  navbarStatusCellPageSize: string;
  panelMasterSideWidth: string;
  searchField: string[];
  tableEditField: EditField[];
  tableGroupField: GroupField[];

  labelNavbarOf: string;
  labelMasterSideSearch: string;
  labelDetailToggleCardPanel: string;
  labelDetailToggleCardTable: string;
  labelDetailToggleCardCustom1: string;
  labelDetailToggleCardCustom2: string;
  labelDetailToggleCardCustom3: string;
  labelTableSelection: string;
  labelGroupExpandAll: string;
  labelGroupCollapseAll: string;
  labelGroupNoGruping: string;
  labelGroupGrupingBy: string;
  navbarStatusCellPageBackgroundN: string;
  navbarStatusCellPageBackgroundA: string;

  constructor() {
    this.typeMaster = 'many';
    this.enableDetailPanel = true;
    this.enableDetailTable = true;
    this.enableDetailPanelCustom1 = false;
    this.enableDetailPanelCustom2 = false;
    this.enableDetailPanelCustom3 = false;
    this.enableDetailTableSelection = false;
    this.enableDetailTableExpansion = false;
    this.enableDetailTableEdit = false;
    this.enableDetailTableGroup = false;
    this.defaultDetailViewType = 'table';
    this.detailTableColumnMode = 'force';
    this.detailTableExpansionType = 'none';
    this.navbarStatusStyle = 'default';
    this.navbarStatusCellPageSize = 'barsize5';
    this.panelMasterSideWidth = '500px';
    this.searchField = [];
    this.tableEditField = [];
    this.tableGroupField = [];

    this.labelNavbarOf = 'of';
    this.labelMasterSideSearch = 'Search';
    this.labelDetailToggleCardPanel = 'Card';
    this.labelDetailToggleCardTable = 'Table';
    this.labelDetailToggleCardCustom1 = 'Custom1';
    this.labelDetailToggleCardCustom2 = 'Custom2';
    this.labelDetailToggleCardCustom3 = 'Custom3';
    this.labelTableSelection = 'Confirm selection';
    this.labelGroupExpandAll = 'Expand all';
    this.labelGroupCollapseAll = 'Collapse all';
    this.labelGroupNoGruping = 'No gruping';
    this.labelGroupGrupingBy = 'Gruping by';
    this.navbarStatusCellPageBackgroundN = '#828fd4';
    this.navbarStatusCellPageBackgroundA = '#3f51b5';
  }

  ...

}
```

To keep it concise, some parts have been omitted.

Below are the templates managed by the MasterDetail control:: "**panelMasterHead**", "**panelMasterSide**", "**panelDetail**", "**panelDetailCustom1**", "**panelDetailCustom2**",  "**panelDetailCustom3**", "**panelDetailExpansion**".

The visualization of the master component is done by the template "panelMasterHead" and enabled by default (it is not possible to disable it). If internal pagination is used (meaning all data is read at once), a menu icon appears on the left that opens a panel showing all the read data. You can select a value rather than searching. The fields for searching are defined through the "*searchField*" array. Below are the main properties.

**enableDetailPanel** (enables the detail panel defined in the "*panelDetail*" template)

**enableDetailTable** (enables the tabular detail panel, there is no template and it internally uses the ngx-datatable)

**enableDetailPanelCustom1** (enables a custom detail panel defined in the "*panelDetailCustom1*" template)

**enableDetailPanelCustom2** (enables a custom detail panel defined in the  "*panelDetailCustom2*" template)

**enableDetailPanelCustom3** (enables a custom detail panel defined in the  "*panelDetailCustom3*" template)

**enableDetailTableSelection** (in case a tabular detail panel is selected, it enables row selection using checkboxes)

**enableDetailTableExpansion** in case a tabular detail panel is selected, it enables expanding the row to provide more details. In addition to enabling it, you need to choose an expansion type of the row through the "*detailTableExpansionType*" property ('none', 'default', 'template'). There are 2 types of expansion: 1) the first is managed automatically, 2) the second uses the "*detailTableExpansionType*" property and the "*panelDetailExpansion*" template)

**enableDetailTableEdit** (in case a tabular detail panel is selected, it enables cell editing displaying the corresponding buttons. You can define the desired operations "insert, update, delete" (and their icons) through the "*tableEditField*" array. You can also define custom commands custom1, custom2, custom3. Importantly, if you want to insert edit buttons in a basic panel (*enableDetailPanel*) defined by the template "*tableEditField*", this must be done explicitly when creating the HTML "panelDetail" template. The use of the "*tableEditField*" array is not required.

**enableDetailTableGroup** (in case a tabular detail panel is selected, you can enable grouping rows by column. You can declare the columns on which grouping is possible through the "*tableGroupField*" array).

As can be seen from the images, multiple detail panels can be present at the same time. We will consider more details later.

#### Colonne nel caso sia presente un dettaglio tabellare "enableDetailTable"

In case a detail panel "*enableDetailPanel*" (the non-tabular one) has been enabled, its template is defined through "*panelDetail*". Since it is the programmer who writes the template, they decide what to display (based on the data provided by the server). In case a tabular detail panel "*enableDetailTable*" is enabled (the tabular oneas, ngx-datatable is used internally), it is necessary to define the columns that will be displayed, specifying the corresponding settings. For example, which should be displayed in the table and which in the possible expansion panel (automatic or custom). There are also other settings for the most common functionalities. The mandatory values are only "*name*" and "*display*", the field provided by the server and the name displayed in the table header. The others are optional, and at application startup, a default value is created in any case (see below).

```js:
export interface IColumns {
  name: string;
  display: string;
  visibleTableField?: boolean; // default true
  orderDetailTable?: number; // default 9999
  orderDetailPanel? : number; // default 9999
  sortable?: boolean; // default 9999
  hasWidth?: boolean; // default false
  myWidth?: number; // default undefined
  myMinwidth?: number; // default undefined
  myMaxwidth?: number; // default undefined
}
```

Below is an example that shows how to define the columns.

```js:
mycolumn1: IColumns[] = [
    { name: 'detailId', display: 'DetailId' },
    { name: 'masterId', display: 'MasterId' },
    { name: 'product', display: 'Product' },
    { name: 'dfield1', display: 'Dfield1' },
    { name: 'dfield2', display: 'Dfield2' },
    { name: 'dfield3', display: 'Dfield3' },
    { name: 'dfield4', display: 'Dfield4' },
    { name: 'dfield5', display: 'Dfield5' }
]
```

#### In this section, an excerpt from an example is shown

```js:
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
```

As can be seen, the columns are defined, and the configuration is set using the "*MasterDetailConfig*" object.

```
<h2>page03 - example1c</h2>

<div>
  <div class="actionMasterNew">
    <button mat-raised-button type="button" color="primary" (click)="onMasterCreate()">New master</button>
  </div>
  <app-masterdetail
    [config]="config"
    [column]="column"
    [datasource]="datasource"
    [startpage]="currpage"
    (changepaginationitem)="onPaginationItemChanged($event)"
    (detailtableselection)="onTableRowsSelection($event)"
    (detailtableaction)="onDetailTableAction($event)">

    <div class="panelMasterHead" *panelMasterHead="let master; let page = page">
      <span class="masterLabel">Id: </span><span class="masterField">{{ master.masterId }}</span><br>
      <span class="masterLabel">Name: </span><span class="masterField">{{ master.name }}</span><br>
      <span class="masterLabel">Customer: </span><span class="masterField">{{ master.customer }}</span><br>
      <span class="masterLabel">Field1: </span><span class="masterField">{{ master.mfield1 }}</span><br>
      <span class="masterLabel">Field2: </span><span class="masterField">{{ master.mfield2 }}</span><br>
      <span class="masterLabel">Field3: </span><span class="masterField">{{ master.mfield3 }}</span><br>
      <span class="masterLabel">Field4: </span><span class="masterField">{{ master.mfield4 }}</span><br>
      <span class="masterLabel">Field5: </span><span class="masterField">{{ master.mfield5 }}</span><br>
      <div class="actionsMaster">
        <button mat-raised-button type="button" color="primary" (click)="onDetailCreate(page, master)">
          New detail
        </button>&nbsp;
        <button mat-icon-button type="button" (click)="onMasterEdit(page, master)">
          <mat-icon>edit</mat-icon>
        </button>&nbsp;
        <button mat-icon-button type="button" (click)="onMasterDelete(page, master)">
          <mat-icon>cancel</mat-icon>
        </button>&nbsp;
      </div>
    </div>

    <div class="panelMasterSide" *panelMasterSide="let record; let selected = selectedMaster; let action = actionSelected; let i = index">
      <mat-card [ngClass]="{ 'masterSideSelected': i === selected }" (click)="action(record.master)">
        <mat-card-content>
          <span class="masterLabel">Id: </span><span class="masterField">{{ record.master.masterId }}</span><br>
          <span class="masterLabel">Name: </span><span class="masterField">{{ record.master.name }}</span><br>
          <span class="masterLabel">Customer: </span><span class="masterField">{{ record.master.customer }}</span><br>
        </mat-card-content>
      </mat-card>
    </div>

    <div class="panelDetailRows" *panelDetail="let detail; let page = page; let i = index">
      <mat-card>
        <mat-card-content>
          <span class="masterLabel">{{ i + 1 }} ) </span>
          <span class="masterLabel">Id: </span><span class="masterField">{{ detail.detailId }}</span><br>
          <span class="masterLabel">Name: </span><span class="masterField">{{ detail.name }}</span><br>
          <span class="masterLabel">Product: </span><span class="masterField">{{ detail.product }}</span><br>
          <span class="masterLabel">Field1: </span><span class="masterField">{{ detail.dfield1 }}</span><br>
          <span class="masterLabel">Field2: </span><span class="masterField">{{ detail.dfield2 }}</span><br>
          <span class="masterLabel">Field3: </span><span class="masterField">{{ detail.dfield3 }}</span><br>
          <span class="masterLabel">Field4: </span><span class="masterField">{{ detail.dfield4 }}</span><br>
          <span class="masterLabel">Field5: </span><span class="masterField">{{ detail.dfield5 }}</span><br>
          <div class="actionsDetail">
            <button mat-icon-button type="button" (click)="onDetailEdit(page, detail)">
              <mat-icon>edit</mat-icon>
            </button>&nbsp;
            <button mat-icon-button type="button" (click)="onDetailDelete(page, detail)">
              <mat-icon>cancel</mat-icon>
            </button>&nbsp;
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  </app-masterdetail>
</div>
```

In the above Angular template, the master section is defined using the "*panelMasterHead*" template. The side list is defined using the "*panelMasterSide*" template, and the detail section is defined using the "*panelDetail*" template.

For further details, you can find the project on GitHub or in the live demo.

### Appendix 1

#### In this section, you'll find the list of input and output properties of the master-detail control.

- **@Input config: MasterDetailConfig**: Use this property to set the current configuration.

- **@Input column: IColumns[]**: Use this property to define the columns if a tabular detail panel "*enableDetailTable*" has been enabled (as it uses ngx-datatable internally). Define the columns that will be displayed, specifying their settings.

- **@Input datasource: IResult**: Contains the data returned from a REST call. The contract is defined by "*IResult*"

- **@Input startpage: number**: Specifies an optional starting page.

- **@Output detailtableselection: TableRowsSelectionArgs**: This event is triggered when rows are selected in the tabular view "*enableDetailTable*" It is necessary to enable this functionality in the configuration using the "*enableDetailTableSelection*" option.

- **@Output detailtableaction: TableEditActionArgs**: This event is triggered when edit operations are performed in the tabular view "*enableDetailTable*" Specify the desired operations using the "*tableEditField*" array. You can also define custom commands custom1, custom2, custom3.

- **@Output changepaginationitem: PagingArgs**: This event is triggered when a page change is made using internal pagination.

#### In this section you will find the properties of the **MasterDetailConfig** object

- **typeMaster: TypeMaster**: The "**typeMaster**" parameter can have the following values: "**many**" or "**one**" In the first case, data is loaded all at once and then internal pagination is used. In the second case, one data item is loaded at a time, and external pagination is used (many => pagesize=9999 => count=N - items=0.N - one => pagesize=1 => count=N - items=0.1). Default is "many."

- **enableDetailPanel: boolean**: Enables the detail panel defined in the "*panelDetail*" template. Default is "true."

- **enableDetailTable: boolean**: Enables the tabular detail panel. There is no template; it uses ngx-datatable internally. Default is "true."

- **enableDetailPanelCustom1: boolean**: Enables a custom detail panel defined in the "*panelDetailCustom1*" template. Default is "false."

- **enableDetailPanelCustom2: boolean**: Enables a custom detail panel defined in the "*panelDetailCustom2*" template. Default is "false."

- **enableDetailPanelCustom3: boolean**: Enables a custom detail panel defined in the "*panelDetailCustom3*" template. Default is "false."

- **enableDetailTableSelection: boolean**: Enables row selection in the tabular view "*enableDetailTable*" If enabled, the **detailtableselection: TableRowsSelectionArgs** event is also triggered. Default is "false."

- **enableDetailTableExpansion: boolean**: Enables row expansion in the tabular view "*enableDetailTable*" There are two types of expansion: 1) the first is automatically managed, and 2) the second uses the "*panelDetailExpansion*" template. Default is "false."

- **enableDetailTableEdit: boolean**: Enables editing rows in the tabular view "*enableDetailTable*". It creates the necessary buttons, and you can declare desired operations (insert, update, delete) and their icons through the "*tableEditField*" array. You can also define custom commands custom1, custom2, custom3. Importantly, if you want to insert edit buttons in a basic panel (*enableDetailPanel*), this must be done explicitly when creating the HTML "panelDetail" template. Default is "false."

- **defaultDetailViewType: string**: Specifies the default detail panel to be displayed. It can have the following values: "listcell," "table," "custom1," "custom2," "custom3." Default is "table."

- **detailTableColumnMode: string**: In the tabular view, ngx-datatable is used internally. This property remaps the "columnMode" property of ngx-datatable. Supported values are "standard" and "force." Default is "force."

- **detailTableExpansionType: string**: In the tabular view, you can have an expansion panel for showing more details. In addition to enabling it through the "*enableDetailTableExpansion*" property, you need to choose the type of expansion using this property ('none,' 'default,' 'template'). There are two types of expansion: 1) the first is automatically managed, and 2) the second uses the "*detailTableExpansionType*" property and the "*panelDetailExpansion*" template. Default is "table."

- **navbarStatusStyle: string**:  If internal pagination is chosen through the "*typeMaster*" property (many), a pagination bar is created. You can create the bar in two formats: "default" and "cellpage". The former has only navigation buttons, and the latter also has boxes that identify the pages. Default is "default."

- **navbarStatusCellPageSize: string**: If "cellpage" is chosen through the "*navbarStatusStyle*" property, you can set how many cell pages to display using this property. Available values are "barsize5," "barsize7," "barsize9." Default is "barsize5."

- **panelMasterSideWidth: string**: If internal pagination is used (i.e., all data is read at once), a menu icon appears on the left and opens a panel that display all the data. You can select a value or perform searches. The fields subject to search are defined using the "*searchField*" array. The width of this panel is set using this property. Default is "500px."

- **searchField: string[]**:  The fields subject to search within the side panel are defined using the "*searchField*" array. Default is an empty array.

- **tableEditField: EditField[]**: In the "enableDetailTable" tabular view, buttons will be created, and the desired operations "insert, update, delete" (along with their respective icons) are declared using the "*tableEditField*" array. It is also possible to define custom commands custom1, custom2, custom3. Default "[]".

- **tableGroupField: GroupField[]**: In the "enableDetailTable" tabular view, you can perform grouping, and the fields subject to grouping are defined using the "tableGroupField" array. Default "[]".

With these properties, labels for language translations are defined.

- **labelNavbarOf: string**: Default "of".

- **labelMasterSideSearch: string**: Default "Search".

- **labelDetailToggleCardPanel: string**: Default "Card".

- **labelDetailToggleCardTable: string**: Default "Table".

- **labelDetailToggleCardCustom1: string**: Default "Custom1".

- **labelDetailToggleCardCustom2: string**: Default "Custom2".

- **labelDetailToggleCardCustom3: string**: Default "Custom3".

- **labelTableSelection: string**: Default "Confirm selection".

- **labelGroupExpandAll: string**: Default "Expand all".

- **labelGroupCollapseAll: string**: Default "Collapse all".

- **labelGroupNoGruping: string**: Default "No gruping".

- **labelGroupGrupingBy: string**: Default "Gruping by".

- **navbarStatusCellPageBackgroundN: string**: Default "#828fd4".

- **navbarStatusCellPageBackgroundA: string**: Default "#3f51b5".

Properties of the "**PagingArgs**" object passed when the "**changepaginationitem**" event is triggered. This is present in operations related to pagination.

- **type: TypeOperation**: Can have the following values: "start," "first," "prev," "next," "last," "page," "cellpage," "selected."

- **currentPage: number**: Current page.

- **minPage: number**: Minimum number of pages.

 **maxPage: number**: Maximum number of pages.

- **totalCount: number**: Total number of records returned by the query.

- **pageSize: number**: Pagesize value for the query.

- **data: IMasterDetailDto[]**: The data returned by the query is contained in the data.

Properties of the "**TableRowsSelectionArgs**" object passed when the "**detailtableselection**" event is triggered. This is present only in operations related to a table.

- **currentSelection: any[]**: Contains the current selected items.

- **previousSelection: any[]**: Contains the previous selected items.

Properties of the "**TableEditActionArgs**" object passed when the "**detailtableaction**" event is triggered. This is present only in operations related to a table.

- **page: number**: Current page.

- **action: TableEditAction**: Indicates the current operation. Can have the following values: "none," "edit," "delete," "command1," "command2," "command3."

- **row: any**: Contains the current row subject to modification, deletion, or another operation.


