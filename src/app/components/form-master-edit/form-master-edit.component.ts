import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MasterDto } from '../../model/masterdetaildto';
import { Utility } from '../../appcore/utility';

@Component({
  selector: 'app-formmasteredit',
  templateUrl: './form-master-edit.component.html',
  styleUrls: ['./form-master-edit.component.css']
})
export class FormMasterEditComponent implements OnInit {
  @Output() confirm = new EventEmitter<MasterDto>();
  form = new MasterDto();

  constructor(private dialogRef: MatDialogRef<FormMasterEditComponent>,
               @Inject(MAT_DIALOG_DATA) private data: any) {
    this.form = data.master;
  }

  ngOnInit(): void {
    // ???
  }

  onSubmit(form: NgForm): void {
    if (form.invalid === true) {
      return;
    }
    const vm = new MasterDto();
    vm.masterId = Utility.toInteger(this.form.masterId);
    vm.name = Utility.toString(form.value.name);
    vm.customer = Utility.toString(form.value.customer);
    vm.mfield1 = Utility.toString(form.value.mfield1);
    vm.mfield2 = Utility.toString(form.value.mfield2);
    vm.mfield3 = Utility.toString(form.value.mfield3);
    vm.mfield4 = Utility.toString(form.value.mfield4);
    vm.mfield5 = Utility.toString(form.value.mfield5);
    //
    this.confirm.emit(vm);
  }

  onClose(): void {
    this.dialogRef.close('no');
  }
}
