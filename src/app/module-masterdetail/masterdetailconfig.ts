export type TypeMaster = 'one' | 'many';

export type DetailViewType = 'listcard' | 'table' | 'custom1' | 'custom2' | 'custom3';

export type DetailTableColumnMode = 'force' | 'standard';

export type DetailTableExpansionType = 'none' | 'default' | 'template';

export type NavbarStatusStyle = 'default' | 'cellpage';

export type NavbarStatusCellPageSize = 'barsize5' | 'barsize7' | 'barsize9';

export type TableEditAction = 'none' | 'edit' | 'delete' | 'command1'| 'command2'| 'command3';

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

  get hasSarchField(): boolean {
    return this.searchField.length > 0;
  }

  get hasTableEditField(): boolean {
    return this.tableEditField.length > 0;
  }

  get hasTableGroupField(): boolean {
    return this.tableGroupField.length > 0;
  }
}

export class EditField {
  action: TableEditAction;
  icon: string;
  tooltips?: string;

  constructor() {
    this.action = 'none';
    this.icon = '';
    this.tooltips = '';
  }
}

export class GroupField {
  display: string;
  name: string;

  constructor() {
    this.display = '';
    this.name = '';
  }
}
