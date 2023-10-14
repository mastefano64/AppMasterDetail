import { Component, Input, OnInit } from '@angular/core';
import { MasterDetailDto } from 'src/app/model/masterdetaildto';

@Component({
  selector: 'app-detailcustom2',
  templateUrl: './detail-custom2.component.html',
  styleUrls: ['./detail-custom2.component.scss']
})
export class DetailCustom2Component implements OnInit {
  @Input() title: string;
  @Input() record: MasterDetailDto;

  constructor() { }

  ngOnInit(): void {

  }

}
