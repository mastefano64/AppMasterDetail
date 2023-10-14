
export class QueryBackup {

  public static backup(search: any, page: number, pagesize: number, orderbycolumn: string, orderbydirection: string): string {
    // tslint:disable-next-line:max-line-length
    const qb = { search: JSON.stringify(search), page: page, pagesize: pagesize, orderbycolumn: orderbycolumn, orderbydirection: orderbydirection };
    const param = window.btoa(JSON.stringify(qb));
    return param;
  }

  public static restore(param: string): any {
    const qb = JSON.parse(window.atob(param));
    // tslint:disable-next-line:max-line-length
    const p = { search: JSON.parse(qb.search), page: qb.page, pagesize: qb.pagesize, orderbycolumn: qb.orderbycolumn, orderbydirection: qb.orderbydirection };
    return p;
  }

}
