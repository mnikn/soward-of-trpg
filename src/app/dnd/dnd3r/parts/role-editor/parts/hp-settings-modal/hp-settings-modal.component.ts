import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HpSettingsType } from '../../../../models/role';
import { Profession } from '../../../../models/profession';

@Component({
  selector: 'app-dnd3r-hp-settings-modal',
  templateUrl: './hp-settings-modal.component.html',
  styleUrls: ['./hp-settings-modal.component.css']
})
export class HpSettingsModalComponent implements OnInit {

  isVisible = false;
  @Input() hpSettingsType: HpSettingsType;
  @Input() customMaxHp = 1;
  @Output() hpChange = new EventEmitter<any>();
  HpSettingsType: any = HpSettingsType;

  constructor() {
  }

  ngOnInit() {
  }

  public showModal(): void {
    this.isVisible = true;
  }

  public closeModal(): void {
    this.isVisible = false;
  }

  public ok(): void {
    this.hpChange.emit({hpSettingsType: this.hpSettingsType, customMaxHp: this.customMaxHp});
    this.closeModal();
  }

}
