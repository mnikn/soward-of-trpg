import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from './form-control';

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
  }

}
