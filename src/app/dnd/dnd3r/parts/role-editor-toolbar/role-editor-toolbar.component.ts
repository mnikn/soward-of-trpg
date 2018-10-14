import { Component, Input, OnInit } from '@angular/core';
import { ToolButton } from '../../../../base/components/tool-button/tool-button';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { RoleDataService } from '../../services/role-data.service';

@Component({
  selector: 'app-dnd3r-role-editor-toolbar',
  templateUrl: './role-editor-toolbar.component.html',
  styleUrls: ['./role-editor-toolbar.component.css']
})
export class RoleEditorToolbarComponent implements OnInit {

  @Input() role: Role;
  toolButtons: ToolButton[] = [
    new ToolButton('anticon anticon-left', 'Back to home', () => {
      this.router.navigate(['']);
    }),
    new ToolButton('anticon anticon-save', '保存', () => {
      console.log(this.role);
      this.dateService.updateRole(this.role).subscribe();
    })];

  constructor(private router: Router,
              private dateService: RoleDataService) {
  }

  ngOnInit() {
  }

}
