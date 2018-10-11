import { Component, Input, OnInit } from '@angular/core';
import { ToolButton } from './tool-button';

@Component({
  selector: 'app-tool-button',
  templateUrl: './tool-button.component.html',
  styleUrls: ['./tool-button.component.css']
})
export class ToolButtonComponent implements OnInit {

  @Input() model: ToolButton;

  constructor() { }

  ngOnInit() {
  }

}
