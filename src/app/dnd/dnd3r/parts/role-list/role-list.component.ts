import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { RoleDataService } from '../../services/role-data.service';
import { ToolButton } from '../../../../base/components/tool-button/tool-button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dnd3r-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  public roles: Role[] = [];
  public actionButtons: Map<number, ToolButton[]> = new Map();

  constructor(private dataService: RoleDataService, private router: Router) {
  }

  ngOnInit() {
    let self = this;
    this.dataService.fetchRoles()
      .subscribe(roles => {
        self.roles = roles;
        roles.forEach(role => {
          self.actionButtons.set(role.id, self.createActionButtons(role.id));
        });
      });
    this.dataService.registerOnDataCreated(role => {
      self.roles = self.roles.concat(role);
      self.actionButtons.set(role.id, self.createActionButtons(role.id));
    });
    this.dataService.registerOnDataRemoved((id) => {
      self.roles = self.roles.filter(role => role.id !== id);
      self.actionButtons.delete(id);
    });
  }

  private createActionButtons(id: number): ToolButton[] {
    let actionButtons = [
      new ToolButton('anticon anticon-edit', 'Edit', () => this.router.navigate(['/dnd3r/role-editor', id])),
      new ToolButton('anticon anticon-minus', 'Delete', () => this.dataService.deleteRole(id).subscribe())
    ];
    return actionButtons;
  }
}
