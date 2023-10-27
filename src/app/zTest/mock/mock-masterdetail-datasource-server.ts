import { MasterDetailSearch } from '../../model/masterdetailsearch';
import { MasterDetailDto } from '../../model/masterdetaildto';
import { BaseDataSourceServer } from '../../appcore/datasource/basedatasourceserver';
import { MockApiMasterDetailService } from './mock-api-masterdetail-service';

export class MockMasterDetailDataSourceServer extends BaseDataSourceServer<MasterDetailSearch,
                         MasterDetailDto, MockApiMasterDetailService> {
  constructor(service: MockApiMasterDetailService, search?: MasterDetailSearch) {
    super(service, search);
    this.result = { count: 0 };
  }
}
