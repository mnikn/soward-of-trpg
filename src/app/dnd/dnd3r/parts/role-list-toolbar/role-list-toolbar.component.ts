import { ToolButton } from '../../../../base/components/tool-button/tool-button';
import { Component, OnInit } from '@angular/core';
import { RoleDataService } from '../../services/role-data.service';

@Component({
  selector: 'app-dnd3r-role-card-toolbar',
  templateUrl: './role-list-toolbar.component.html',
  styleUrls: ['./role-list-toolbar.component.css']
})
export class RoleListToolbarComponent implements OnInit {

  toolButtons: ToolButton[] = [
    new ToolButton('anticon anticon-plus', 'Create', () => {
      this.dataService.createRole().subscribe();
    })];

  constructor(private dataService: RoleDataService) {
  }

  ngOnInit() {
  }

}
