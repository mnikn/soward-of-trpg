import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfessionInfoItem, Profession, ProfessionInfo } from '../../../../models/profession';
import { ToolButton } from '../../../../../../base/components/tool-button/tool-button';
import * as _ from 'lodash';


@Component({
  selector: 'app-dnd3r-profession-drawer',
  templateUrl: './profession-drawer.component.html',
  styleUrls: ['./profession-drawer.component.css']
})
export class ProfessionDrawerComponent implements OnInit {

  @Input() defaultProfessions: Profession[];
  @Output() professionsChange = new EventEmitter<Profession[]>();

  professionDrawerControls = [];
  professionDrawerForm: FormGroup;
  professions: ProfessionInfoItem[];
  isProfessionDrawerVisible = false;

  addNewProfessionToolButton: ToolButton = new ToolButton('anticon anticon-plus', 'Add new profession', () => {
    this.addNewProfession();
  });

  constructor(private professionInfo: ProfessionInfo,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.professions = this.professionInfo.getInfoList();
    this.professionDrawerForm = this.formBuilder.group({});
    for (let i = 0; i < this.defaultProfessions.length; ++i) {
      this.professionDrawerControls = this.professionDrawerControls.concat([{
        index: i,
        professionId: this.defaultProfessions[i].id,
        level: this.defaultProfessions[i].level
      }]);
      this.professionDrawerForm.addControl(`professionId${i}`, new FormControl());
      this.professionDrawerForm.addControl(`level${i}`, new FormControl());
    }

  }

  openProfessionDrawer(): void {
    this.isProfessionDrawerVisible = true;
  }

  closeProfessionDrawer(): void {
    this.isProfessionDrawerVisible = false;
  }

  removeProfession(professionId: number): void {
    let index = _.find(this.professionDrawerControls, (data) => data.professionId === professionId).index;
    this.professionDrawerControls = this.professionDrawerControls.filter(p => p.professionId !== professionId);
    this.professionDrawerForm.removeControl(`professionId${index}`);
    this.professionDrawerForm.removeControl(`level${index}`);
  }

  cancel(): void {
    this.professionDrawerForm = this.formBuilder.group({});
    this.professionDrawerControls = [];
    for (let i = 0; i < this.defaultProfessions.length; ++i) {
      this.professionDrawerControls = this.professionDrawerControls.concat([{
        index: i,
        professionId: this.defaultProfessions[i].id,
        level: this.defaultProfessions[i].level
      }]);
      this.professionDrawerForm.addControl(`professionId${i}`, new FormControl());
      this.professionDrawerForm.addControl(`level${i}`, new FormControl());
    }
    this.closeProfessionDrawer();
  }

  submit(): void {
    let currentProfessions = _.map(this.professionDrawerControls, data => new Profession(data.professionId, data.level));
    if (currentProfessions.length > 0) {
      currentProfessions[0].isMainProfession = true;
    }
    this.professionsChange.emit(currentProfessions);
    this.closeProfessionDrawer();
  }

  addNewProfession(): void {
    let newProfession = new Profession('FIGHTER', 1);
    this.professionDrawerControls = this.professionDrawerControls.concat([{
      index: this.professionDrawerControls.length + 1,
      professionId: newProfession.id,
      level: newProfession.level
    }]);
    this.professionDrawerForm.addControl(`professionId${this.professionDrawerControls.length}`, new FormControl());
    this.professionDrawerForm.addControl(`level${this.professionDrawerControls.length}`, new FormControl());
  }

}
