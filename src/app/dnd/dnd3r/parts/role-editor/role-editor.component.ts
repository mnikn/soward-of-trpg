import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../../models/role';

@Component({
  selector: 'app-dnd3r-role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.css']
})
export class RoleEditorComponent implements OnInit {

  @Input() role: Role;

  constructor() { }

  ngOnInit() {
  }

}
