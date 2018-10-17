import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from './form-control';
import * as _ from 'lodash';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formControls: FormControl[];

  constructor() { }

  ngOnInit() {
    _.forEach(this.formControls, control => {
      control.colSpan = control.colSpan ? control.colSpan : 12;
    });
  }

}
