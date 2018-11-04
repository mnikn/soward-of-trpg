import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransferItem, TransferSelectChange } from 'ng-zorro-antd';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  @Input() dataSource: TransferItem[];
  @Output() onTransfer  = new EventEmitter<TransferSelectChange>();

  constructor() {
  }

  ngOnInit() {
  }

}
