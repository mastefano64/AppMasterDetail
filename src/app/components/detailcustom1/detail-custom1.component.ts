import { Component, Input, OnInit } from '@angular/core';
import { MasterDetailDto } from 'src/app/model/masterdetaildto';

@Component({
  selector: 'app-detailcustom1',
  templateUrl: './detail-custom1.component.html',
  styleUrls: ['./detail-custom1.component.scss']
})
export class DetailCustom1Component implements OnInit {
  @Input() title: string;
  @Input() record: MasterDetailDto;

  constructor() { }

  ngOnInit(): void {

  }

}
