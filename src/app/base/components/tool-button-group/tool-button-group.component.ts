import { Component, OnInit, Input } from '@angular/core';
import { ToolButton } from '../tool-button/tool-button';

@Component({
  selector: 'app-tool-button-group',
  templateUrl: './tool-button-group.component.html',
  styleUrls: ['./tool-button-group.component.css']
})
export class ToolButtonGroupComponent implements OnInit {

  @Input() buttons: ToolButton[];

  constructor() {
  }

  ngOnInit() {
  }

}
