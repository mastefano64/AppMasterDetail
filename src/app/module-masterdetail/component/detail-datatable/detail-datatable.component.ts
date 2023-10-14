import { Component, ViewChild, Input, Output, EventEmitter,
      SimpleChanges, OnInit, OnChanges, OnDestroy} from '@angular/core';

import { MasterDetailConfig, DetailTableColumnMode, EditField} from '../../masterdetailconfig';
import { MasterDetailService } from '../../service/masterdetail-service';
import { TableColumn } from "../../model/table-column";
import { TableRowsSelectionArgs } from '../../model/table-rows-selection-args';
import { TableEditActionArgs } from '../../model/table-editaction-args';

// https://swimlane.gitbook.io/ngx-datatable/api/table
// https://github.com/swimlane/ngx-datatable/blob/master/docs/api/table/inputs.md
// https://github.com/swimlane/ngx-datatable/blob/master/docs/api/column/inputs.md
// https://swimlane.gitbook.io/ngx-datatable/api/column/modes

@Component({
    selector: 'app-datatable',
    templateUrl: './detail-datatable.component.html',
    styleUrls: ['./detail-datatable.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('mytable2') table: any;
  @Input() config: MasterDetailConfig;
  @Input() panelDetailExpansionTemplate: any;
  @Input() detailTableColumnMode: DetailTableColumnMode;
  @Input() columntable: TableColumn[];
  @Input() columndetail: TableColumn[];
  @Input() rows: any[];
  @Input() groupexpansiondefault = false;
  @Input() selectionenabled = false;
  @Input() detailenabled = false;
  @Input() editenabled = false;
  @Input() groupenabled = false;
  @Output() tablerowsselection = new EventEmitter<TableRowsSelectionArgs>();
  @Output() tableeditaction = new EventEmitter<TableEditActionArgs>();
  selectiontype = undefined;
  selected = [];

  _grouprowsby = '';
  @Input('grouprowsby')
  set grouprowsby(value: string) {
    this._grouprowsby = value;
    this.grouplabel = this.getGroupName();
  }
  get grouprowsby() {
    return this._grouprowsby;
  }

  editfields: EditField[] = [];
  grouplabel = '';
  pagesize = 99999;
  labelGroupNoGruping = '';

  constructor(public navigation: MasterDetailService) { }

  ngOnInit() {
    this.editfields = this.config.tableEditField;
    this.labelGroupNoGruping = this.config.labelGroupNoGruping;
    if (this.config.enableDetailTableSelection === true) {
      this.selectiontype = 'checkbox';
      this.selected = [];
    } else {
      this.selectiontype = undefined;
      this.selected = [];
    }
    if (this.groupenabled === true) {
      this.grouprowsby = '-1';
      this.groupexpansiondefault = true;
    } else {
      this.grouprowsby = undefined;
      this.groupexpansiondefault = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.groupenabled === true) {
      const current = changes['grouprowsby'];
      if (current && current.firstChange === false) {
        setTimeout(() => {
          this.recalculate();
        }, 1000);
      }
    }
  }

  getGroupName(): string {
    let valret = '';
    if (this.grouprowsby !== undefined && this.grouprowsby !== '-1') {
      for (let i = 0; i < this.columntable.length; i++) {
        if (this.columntable[i].name === this.grouprowsby) {
          valret = this.columntable[i].display;
          break;
        }
      }
    }
    return valret;
  }

  onTableEdit(row: any): void {
    const currpage = this.navigation.currentPage;
    const args = new TableEditActionArgs(currpage, 'edit', row);
    this.tableeditaction.emit(args);
  }

  onTableDelete(row: any): void {
    const currpage = this.navigation.currentPage;
    const args = new TableEditActionArgs(currpage, 'delete', row);
    this.tableeditaction.emit(args);
  }

  onTableCommand1(row: any): void {
    const currpage = this.navigation.currentPage;
    const args = new TableEditActionArgs(currpage, 'command1', row);
    this.tableeditaction.emit(args);
  }

  onTableCommand2(row: any): void {
    const currpage = this.navigation.currentPage;
    const args = new TableEditActionArgs(currpage, 'command2', row);
    this.tableeditaction.emit(args);
  }

  onTableCommand3(row: any): void {
    const currpage = this.navigation.currentPage;
    const args = new TableEditActionArgs(currpage, 'command3', row);
    this.tableeditaction.emit(args);
  }

  onSelectCheckbox(values: any): void {
    const currselection = [ ...values.selected ];
    const prevselection = [  ...this.selected  ];
    const args = new TableRowsSelectionArgs(currselection, prevselection);
    this.selected = [ ...values.selected ];
    this.tablerowsselection.emit(args);
  }

  expandAllGroups(): void {
    this.table.groupHeader.expandAllGroups();
  }

  collapseAllGroups(): void {
    this.table.groupHeader.collapseAllGroups();
  }

  toggleExpandGroup(group): void {
    this.table.groupHeader.toggleExpandGroup(group);
  }

  toggleExpandDetail(row): void {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onGroupToggle(event): void {
    // ???
  }

  onDetailToggle(event): void {
    // ???
  }

  recalculate(): void {
    this.table.recalculate();
  }

  ngOnDestroy(): void {

  }
}
