import { ToolButton } from './../../../../base/components/tool-button/tool-button';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dnd3r-role-card-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  toolButtons: ToolButton[] = [
    new ToolButton('anticon anticon-plus'),
    new ToolButton('anticon anticon-minus')];

  constructor() { }

  ngOnInit() {
  }

}
