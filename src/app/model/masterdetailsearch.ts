
export class MasterDetailSearch {
  fulltext: string;

  constructor() {
    this.fulltext = '';
  }

  trimAll() {
    this.fulltext = this.fulltext.trim();
  }

  clear() {
    this.fulltext = '';
  }
}
