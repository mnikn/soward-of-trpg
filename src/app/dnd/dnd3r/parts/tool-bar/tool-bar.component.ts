import { ToolButton } from './../../../../base/components/tool-button/tool-button';
import { Component, OnInit } from '@angular/core';
import { RoleDataService } from '../../services/role-data.service';

@Component({
  selector: 'app-dnd3r-role-card-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  toolButtons: ToolButton[] = [
    new ToolButton('anticon anticon-plus', 'Create', () => {
      this.dataService.createRole().subscribe();
    })];

  constructor(private dataService: RoleDataService) {
  }

  ngOnInit() {
  }

}
