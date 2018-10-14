import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProfessionInfo, Profession, ProfessionInfo } from '../../../../models/profession';
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

  currentProfessions: Profession[] = [];
  professionDrawerForm: FormGroup;
  professions: IProfessionInfo[];
  isProfessionDrawerVisible = false;

  addNewProfessionToolButton: ToolButton = new ToolButton('anticon anticon-plus', 'Add new profession', () => {
    this.addNewProfession();
  });

  constructor(private professionInfo: ProfessionInfo,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.professionDrawerForm = this.formBuilder.group({
      drawerProfessionId: [null, [Validators.required]],
      drawerProfessionLevel: [null, [Validators.required]],
      agree: [false]
    });
    this.professions = this.professionInfo.getProfessions();
    this.currentProfessions = this.defaultProfessions;
  }

  openProfessionDrawer(): void {
    this.isProfessionDrawerVisible = true;
  }

  closeProfessionDrawer(): void {
    this.isProfessionDrawerVisible = false;
  }

  removeProfession(profession: Profession): void {
    this.currentProfessions = this.currentProfessions.filter(p => p.id !== profession.id);
  }

  cancel(): void {
    this.currentProfessions = this.defaultProfessions;
    this.closeProfessionDrawer();
  }

  submit(): void {
    this.professionsChange.emit(_.cloneDeep(this.currentProfessions));
    this.closeProfessionDrawer();
  }

  addNewProfession(): void {
    this.currentProfessions.push(new Profession('FIGHTER', 1));
  }

}
