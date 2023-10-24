import { IMasterDetailDto } from "../module-masterdetail/interface/imasterdetaildto";

export class MasterDetailDto implements IMasterDetailDto {
  master: MasterDto;
  details: DetailDto[] = [];
}

export class MasterDto {
  masterId: number;
  name: string;
  customer: string;
  mfield1: string;
  mfield2: string;
  mfield3: string;
  mfield4: string;
  mfield5: string;
}

export class DetailDto {
  detailId: number;
  masterId: number;
  name: string;
  product: string;
  typedetail1: string;
  typedetail2: string;
  dfieldD: Date;
  dfieldN: number;
  dfield1: string;
  dfield2: string;
  dfield3: string;
  dfield4: string;
  dfield5: string;
}
