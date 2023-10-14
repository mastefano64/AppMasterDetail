import { IColumns } from "../interface/type-interface";

export class TableColumn implements IColumns {
  name: string;
  display: string;
  visibleTableField?: boolean;
  orderDetailTable?: number;
  orderDetailPanel? : number;
  sortable?: boolean;
  hasWidth?: boolean;
  myWidth?: number;
  myMinwidth?: number;
  myMaxwidth?: number;

  constructor(name: string, display: string) {
    this.name = name;
    this.display = display;
  }

}
