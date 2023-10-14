import { TableEditAction } from "../masterdetailconfig";

export class TableEditActionArgs {

  constructor(public page: number, public action: TableEditAction, public row: any) { }
}
