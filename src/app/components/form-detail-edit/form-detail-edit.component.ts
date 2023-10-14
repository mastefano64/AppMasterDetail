import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DetailDto } from '../../model/masterdetaildto';
import { Utility } from '../../appcore/utility';

@Component({
  selector: 'app-formdetailedit',
  templateUrl: './form-detail-edit.component.html',
  styleUrls: ['./form-detail-edit.component.css']
})
export class FormDetailEditComponent implements OnInit {
  @Output() confirm = new EventEmitter<DetailDto>();
  form = new DetailDto();

  constructor(private dialogRef: MatDialogRef<FormDetailEditComponent>,
               @Inject(MAT_DIALOG_DATA) private data: any) {
    this.form = data.detail;
  }

  ngOnInit(): void {
    // ???
  }

  onSubmit(form: NgForm): void {
    if (form.invalid === true) {
      return;
    }
    const vm = new DetailDto();
    vm.detailId = Utility.toInteger(this.form.detailId);
    vm.masterId = Utility.toInteger(this.form.masterId);
    vm.name = Utility.toString(form.value.name);
    vm.product = Utility.toString(form.value.product);
    vm.dfield1 = Utility.toString(form.value.dfield1);
    vm.dfield2 = Utility.toString(form.value.dfield2);
    vm.dfield3 = Utility.toString(form.value.dfield3);
    vm.dfield4 = Utility.toString(form.value.dfield4);
    vm.dfield5 = Utility.toString(form.value.dfield5);
    //
    this.confirm.emit(vm);
  }

  onClose(): void {
    this.dialogRef.close('no');
  }
}
