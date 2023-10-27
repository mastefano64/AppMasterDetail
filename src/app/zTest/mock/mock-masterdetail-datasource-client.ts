import { MasterDetailSearch } from '../../model/masterdetailsearch';
import { MasterDetailDto } from '../../model/masterdetaildto';
import { BaseDataSourceClient } from '../../appcore/datasource/basedatasourceclient';
import { MockApiMasterDetailService } from './mock-api-masterdetail-service';

export class MockMasterDetailDataSourceClient extends BaseDataSourceClient<MasterDetailSearch,
                         MasterDetailDto, MockApiMasterDetailService> {
  constructor(service: MockApiMasterDetailService, search?: MasterDetailSearch) {
    super(service, search);
    this.result = { count: 0 };
  }
}
