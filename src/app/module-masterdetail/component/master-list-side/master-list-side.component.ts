import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { MasterDetailConfig } from '../../masterdetailconfig';
import { IMasterDetailDto } from '../../interface/imasterdetaildto';
import { MasterDetailService } from '../../service/masterdetail-service';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-masterlistside',
  templateUrl: './master-list-side.component.html',
  styleUrls: ['./master-list-side.component.scss']
})
export class MasterListSideComponent implements OnInit, OnDestroy {
  @Input() config: MasterDetailConfig;
  @Input() panelMasterSideTemplate: any;
  @Input() selectedmasterpage: number;
  @Input() allrecord: IMasterDetailDto[];
  allrecordbak: IMasterDetailDto[];
  labelMasterSideSearch: string;

  constructor(public navigation: MasterDetailService) { }

  ngOnInit(): void {
    this.labelMasterSideSearch = this.config.labelMasterSideSearch;
    this.allrecordbak = this.allrecord;
  }

  onTextChanged(value: string): void {
    if (value) {
      this.allrecord = this.allrecordbak.filter(x => {
        let found = false;
        for(let search of this.config.searchField) {
          if (x.master[search].includes(value) === true) {
            found = true;
          }
        }
        return found;
      });
      return;
    }
    this.allrecord = this.allrecordbak;
  }

  onMasterSelected(record: IMasterDetailDto): void {
    this.navigation.selectMaster(record);
    this.selectedmasterpage = this.navigation.selectedMasterPage;
  }

  ngOnDestroy(): void {

  }
}
