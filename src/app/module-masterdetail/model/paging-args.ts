import { TypeOperation } from "../interface/type-interface";
import { IMasterDetailDto } from "../interface/imasterdetaildto";

export class PagingArgs {

  constructor(public type: TypeOperation, public currentPage: number, public minPage: number, public maxPage: number,
                public totalCount: number, public pageSize: number, public data: IMasterDetailDto) { }
}
