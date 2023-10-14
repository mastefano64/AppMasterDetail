import { MasterDetailSearch } from '../model/masterdetailsearch';
import { MasterDetailDto } from '../model/masterdetaildto';
import { BaseDataSourceServer } from '../appcore/datasource/basedatasourceserver';
import { ApiMasterDetailService } from '../service/api-masterdetail-service';

export class MasterDetailDataSource extends BaseDataSourceServer<MasterDetailSearch, MasterDetailDto, ApiMasterDetailService> {
  constructor(service: ApiMasterDetailService, search?: MasterDetailSearch) {
    super(service, search);
    this.result = { count: 0 };
  }
}
