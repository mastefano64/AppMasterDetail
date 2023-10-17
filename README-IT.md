
### Questo è un controllo master-deteil per Angular (it is a preview).

<br/>

> MasterDetail è un controllo Angular che permette la visualizzazione di fonti di dati che sono legati da una relazione master-detail. Offre diverse funzionalità tra le quali: paginazione, visualizzazione lista, visualizzazione tabellare, inserimento, modifica, cancellazione, raggruppamenti/campo (se si stà utilizzando la visualizzazione tabellare), creazione di pannnelli di dettaglo ad hoc, etc... I vari pannelli: "lista", "tabellare" o "custom"; sono comunque singolarmente abiltabili/disabilitabili. 

<br/>

#### Fonti di dati:

I dati vengono recuperati attraverso una chiamata rest fatta ad un server ed il contrato dei dati ritornati è il seguente

```
export interface IResult {
  count: number,
  items: any[],
  page: number,
  url: string
}
```

l'array items ha il seguente contratto 

```
export interface IMasterDetailDto {
  master: any;
  details: any[];
}
```

come si può vedere implementa l'interfaccia IMasterDetailDto ed ha 2 proprietà: master e details.

#### Paginazione

Il controllo supporta 2 tipi di paginazione (interna/esterna): 

1) i dati vengono letti tutti insieme per poi paginarli attraverso una barra di navigazione interna.

2) viene letto un dato alla volta, passato al controllo MasterDetail e paginato attraverso una barra di navigazione esterna. Viene utilizzato un "datasource" esterno al controllo, che si occupa di fare le relative chiamate rest (e paginare i dati).

E' quindi possibile abiltare l'una o l'altra modatità attraverso il parametro "**typeMaster**" all'interno della configurazione (vedi sotto) e può avere i seguenti valori: "**many**" o "**one**".

many => pagesize=9999 => count=N - items=0.N  
one => pagesize=1 => count=N - items=0.1 

#### Layout

Il layout è gestito:

1) attraverso un oggetto di configurazione che viene poi passato al controllo MasterDetail, e mediante il quale si attivano o si disabilitano le varie funzionalità.

2) attraverso dei template contenuti tra il tag di apertura e chiusura del controllo MasterDetail.

Vediamo ora un estratto dell'oggetto di configurazione (è possibile vedere il relativo file all'interno del progetto GitHub al seguente percorso).

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

Per brevità sono state ommesse alcune parti.

Di seguito è possibile vedere i template gestiti dal controllo MasterDetail: "**panelMasterHead**", "**panelMasterSide**", "**panelDetail**", "**panelDetailCustom1**", "**panelDetailCustom2**",  "**panelDetailCustom3**", "**panelDetailExpansion**".

La visualizzazione della componente master è gestita dal template "panelMasterHead" ed abilitata di default (non è possibile disabilitarla). Nel caso vega usata la paginazione interna (ovvero vengano letti tutti insieme i dati), sulla sinisra compare un icona di menu che apre un pannello che mostra tutti dati letti. E' possibile selezionare un valore piuttosto che fare ricerche. I campi oggetto di ricerca sono definiti tramite l'array "*searchField*". Di seguito verranno mostrate le proprietà principali.

**enableDetailPanel** (abilita il panello di dettaglio definito nel template "*panelDetail*")

**enableDetailTable** (abilita il panello di dettaglio tabellare, non esiste un template ed internamente utiizza la tabella ngx-datatable)

**enableDetailPanelCustom1** (abilita un panello di dettaglio custom definito nel template "*panelDetailCustom1*")

**enableDetailPanelCustom2** (abilita un panello di dettaglio custom definito nel template "*panelDetailCustom2*")

**enableDetailPanelCustom3** (abilita un panello di dettaglio custom definito nel template "*panelDetailCustom3*")

**enableDetailTableSelection** (nel caso sia stato selezionato un panello di dettaglio tabellare, abilita la selezione delle righe mediante checkbox)

**enableDetailTableExpansion** (nel caso sia stato selezionato un panello di dettaglio tabellare, abilita l'espansione della riga allo scopo di fornire maggiori dettagli. Oltre ad abilitarla dobbiamo anche scegliere un tipo di espansione dellla riga tramite la proprietà "*detailTableExpansionType*" ('none' , 'default' , 'template'). Esistono 2 tipo di espansione: 1) la prima è gestita in modo automatico 2) la seconda utilizzando la proprietà "*detailTableExpansionType*" ed il template "*panelDetailExpansion*")

**enableDetailTableEdit** (nel caso sia stato selezionato un panello di dettaglio tabellare abilita l'edit delle celle mostrando i relativi bottoni. Tramite l'array "*tableEditField*" vengono dichiarate le operzioni desiderate "insert, update, delete" (e le relative icone), è anche possibile definire dei comandi custom custom1, custom2, custom3. Nota importante se vogliamo inserire dei bottoni di edit in un pannello base (*enableDetailPanel*) definito dal template "*tableEditField*", questo deve essere fatto in modo esplicito quando si cerea il template HTML "panelDetail". Non è richiesto l'uso del array "*tableEditField*".

**enableDetailTableGroup** (nel caso sia stato selezionato un panello di dettaglio tabellare è possibile abilitare il raggruppamento delle righe per colonna. Tramite l'array "*tableGroupField*" vengono dichiarate le colonne sulle quali è possibile abilitare il raggruppapento).

###MOSTRAE IMMAGINI###

Come si può vedere dalle imagini possono essere presenti più pannelli di dettaglio contemporaneamente. Prenderemo in considerazione maggiori dettagli in seguito.

#### Columns if there is a tabular detail "enableDetailTable"

Nel caso sia stato abilitato un pannello di dettaglio "*enableDetailPanel*" (quello non tabellare) il relativo template e definito tramite "*panelDetail*", visto che è il programmatore che scrive il template, è lui che decide cosa mostrare (in base ai dati forniti dal server). Nel caso sia stato abilitato un pannello di dettaglio "*enableDetailTable*" (quello tabellare, internamente viene usato ngx-datatable), è necessario definire le colonne che verrano visualizzate specificando le relative ipostazioni. Per esempio quali devono essere visuaizzate nella tabella e quali nell'eventuale panello di espansione (automatico o custom). Esistono poi altre impostazioni per le funzionaltà più comuni. I valori obbligatori sono solo "*name*" e "*display*", il campo fornito dal server ed il nome visualizzato nell'intestazione della tabelle. Gli altri sono opzionali, allo startup dell'applicazione vengono comunque creati impostanto un eventuale valore di default (vedi sotto).

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

Sotto un esempio che mostra come definire le colonne.

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

#### In questa sezione viene mostrato l'estratto di un esempio

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

Come si può vedere vengono definite le colonne e viene impostata la configurazione tramite l'oggetto "*MasterDetailConfig*"

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

Nell' template Angular sovrastante, viene definita la sezine master tramite il template "*panelMasterHead*", viene definita la sidelist tramite il template "*panelMasterSide*" infine viene definita la sezione di detail tramite il templae "*panelDetail*"

Maggiori detagli è possibile trovarli el progetto su GitHub o nella  ***live deomo***

### Appendice 1

#### In questa sezione troverete l'elenco delle proprietà di input e  output del controllo masterdetail

- **@Input config: MasterDetailConfig**: Tramite questa proprietà è possibile impostare la confgurazione corrente.

- **@Input column: IColumns[]**: Tramite questa proprietà e possibile definire le colonne nel caso sia stato abilitato un pannello di dettaglio tabellare "*enableDetailTable*" (visto che internamente viene usato ngx-datatable), è necessario definire le colonne che verrano visualizzate specificando le relative ipostazioni. 

- **@Input datasource: IResult**: Contiene i dati ritornati da una chiaata rest. Il contratto è definito da "*IResult*"

- **@Input startpage: number**: Specifica un eventuale pagina di partenza (opzionale).

- **@Output **detailtableselection: TableRowsSelectionArgs**: Quest'evento viene invocato quando vengono selezinate delle righe nella visualizzazione tabellare "*enableDetailTable*". E' necessario abilitare la funzionalità nella configurazione tramite  l'opzione "*enableDetailTableSelection*".

- **@Output detailtableaction: TableEditActionArgs**: Quest'evento viene invocato quando vengono effettauate delle operazioni di edit nella visualizzazione tabellare "*enableDetailTable*". Devono essere specificate le operazioni desiderate tramite l'array "*tableEditField*", è anche possibile definire dei comandi custom custom1, custom2, custom3.

- **@Output changepaginationitem: PagingArgs**: Quest'evento viene invocato quando viene effettuato un cambio pagina tramite paginazione interna.

#### In questa sezione troverete le proprietà dell'oggetto **MasterDetailConfig**

- **typeMaster: TypeMaster**: Il parametro "**typeMaster**" può avere i seguenti valori: "**many**" o "**one**". Nel primo caso vengono caricati tutti insieme i dati e viene poi usata la paginazione interna. Nel secondo caso viene caricato un dato alla volta e viene poi usata la paginazione esterna (many => pagesize=9999 => count=N - items=0.N - one => pagesize=1 => count=N - items=0.1). Default "many".

- **enableDetailPanel: boolean**: Abilita il panello di dettaglio definito nel template "*panelDetail*". Default "true".

- **enableDetailTable: boolean**: Abilita il panello di dettaglio tabellare, non esiste un template ed internamente utiizza la tabella ngx-datatable. Default "true".

- **enableDetailPanelCustom1: boolean**: Abilita un panello di dettaglio custom definito nel template "*panelDetailCustom1*". Default "false".

- **enableDetailPanelCustom2: boolean**: Abilita un panello di dettaglio custom definito nel template "*panelDetailCustom2*". Default "false".

- **enableDetailPanelCustom3: boolean**: Abilita un panello di dettaglio custom definito nel template "*panelDetailCustom3*". Default "false".

- **enableDetailTableSelection: boolean**: Abilita la selezione delle righe nella visualizzazione tabellare "*enableDetailTable*". Nel caso venga abilitata verra invocato anche l'evento **enableDetailTableSelection: boolean**. Default "false".

- **enableDetailTableExpansion: boolean**:  Abilita la espansione delle righe nella visualizzazione tabellare "*enableDetailTable*". Esistono 2 tipo di espansione: 1) la prima è gestita in modo automatico 2) la seconda utilizzando un template "*panelDetailExpansion*". Default "false".

- **enableDetailTableEdit: boolean**:  Abilita edit delle righe nella visualizzazione tabellare "*enableDetailTable*". Verranno creati i relativi bottoni e tramite l'array "*tableEditField*" vengono dichiarate le operzioni desiderate "insert, update, delete" (e le relative icone), è anche possibile definire dei comandi custom custom1, custom2, custom3. Nota importante se vogliamo inserire dei bottoni di edit in un pannello base (*enableDetailPanel*), questo deve essere fatto im modo esplicito quando si cerea il template HTML "panelDetail". Non è richiesto l'uso del array "*tableEditField*". Default "false".

 - **defaultDetailViewType: string**: Specifica il pannello di dettaglio sul quale posizionardi di default. Puo avere i seguenti valori: "listcell", "table", "custom1", "custom2", "custom2". Default "table".

 - **detailTableColumnMode: string**: Nella visualizzazione tabellare internamente è usato "ngx-datatable". Quasta proprietà rimappa la proprietà "columnMode" di "ngx-datatable". I valori supportai sono: "standard" e "force". Default "force".

 - **detailTableExpansionType: string**: Nella visualizzazione tabellare è possibile avere un pannello di espanzione della riga allo scopo di mostrare più dettagli. Oltre ad abilitarla tramite la proprietà "*enableDetailTableExpansion*" dobbiamo anche scegliere un tipo di espansione tramite la presente proprietà ('none' , 'default' , 'template'). Esistono 2 tipo di espansione: 1) la prima è gestita in modo automatico 2) la seconda utilizzando la proprietò "*detailTableExpansionType*" ed il template "*panelDetailExpansion*". Default "table".

- **navbarStatusStyle: string**: Se si sceglie la paginazione interna tramite la proprità "*typeMaster*" - many. Verrà creata una barra di paginazione. E'possibile creare la barra in 2 formati: "default" e "cellpage". La prima ha solo i bottoni di navigazione, la seconda anche dei riquadri che identificano le pagine. Default "default".

- **navbarStatusCellPageSize: string**: Nel caso scegliamo tramite la proprietà "*navbarStatusStyle*" l'opzione "cellpage" possiamo stabilire quante cellpage visualizzare tramite la presente proprietà. Abbiamo a sisposizione 3 valori: "barsize5", "barsize7", "barsize9". Default "barsize5".

- **panelMasterSideWidth: string**: Nel caso vega usata la paginazione interna (ovvero vengano letti tutti insieme i dati), sulla sinisra compare un icona di menu che apre un pannello che mostra tutti dati letti. E' possibile selezionare un valore piuttosto che fare ricerche. I campi oggetto di ricerca sono definiti tramite l'array "*searchField*". Di seguito verranno mostrate le proprietà principali. La larghezza di questo pannello è stabilita tramite la presente proprietà. Default "500px".

- **searchField: string[]**: I campi oggetto di ricerca all'interno del pannello laterale sono definiti tramite l'array "*searchField*". Default "[]".

- **tableEditField: EditField[]**: Nella visualizzazione tabellare "*enableDetailTable*", verranno creati dei bottoni e tramite l'array "*tableEditField*" vengono dichiarate le operzioni desiderate "insert, update, delete" (e le relative icone), è anche possibile definire dei comandi custom custom1, custom2, custom3. Default "[]".

- **tableGroupField: GroupField[]**: Nella visualizzazione tabellare "*enableDetailTable*", è possibile effettuare dei raggruppamenti e tramite l'array "*tableGroupField*" vengono definti i campi oggetto di raggruppamento. Default "[]".

Con le presenti proprietà vengono definite le labels per le traduzioni linguistiche.

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

Proprietà dell'oggetto "**PagingArgs**" passato quando l'evento "**changepaginationitem**" viene invocato. Presente nelle operazioni che riguardano paginazione.

- **type: TypeOperation**: Può avere i seguenti valori: "start", "first", "prev", "next", "last", "page", "cellpage", "selected".

- **currentPage: number**: Pagina corrente.

- **minPage: number**: Numero minimo di pagine.

- **maxPage: number**: Numero massimo di pagine.

- **totalCount: number**: Numero totale di record ritornati dalla query.

- **pageSize: number**: Valore pagesize per la query.

- **data: IMasterDetailDto[]**: All' interno di data sono contenuti i dati restituiti dalla query.

Proprietà dell'oggetto "**TableRowsSelectionArgs**" passato quando l'evento "**detailtableselection**" viene invocato. Presente solo nelle operazioni che riguardano una tabella.

- **currentSelection: any[]**: Contiene gli elementi correnti selezionati.

- **previousSelection: any[]**: Contiene gli elementi precedenti selezionati.

Proprietà dell'oggetto "**TableEditActionArgs**" passato quando l'evento "**detailtableselection**" viene invocato. Presente solo nelle operazioni che riguardano una tabella.

- **page: number**: Pagina corrente.

- **action: TableEditAction**: Indica l'operazione corrente. Può avere i seguenti valori:  "none", "edit", "delete", "command1", "command2", "command3".

- **row: any**: Contiene la riga corrente oggetto di modifica, cancellazione o altra operazione.
