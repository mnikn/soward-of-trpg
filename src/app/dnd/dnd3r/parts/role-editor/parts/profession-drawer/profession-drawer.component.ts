import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../../models/role';
import { IProfessionInfo, Profession, ProfessionInfo } from '../../../../models/profession';
import { ToolButton } from '../../../../../../base/components/tool-button/tool-button';

@Component({
  selector: 'app-dnd3r-profession-drawer',
  templateUrl: './profession-drawer.component.html',
  styleUrls: ['./profession-drawer.component.css']
})
export class ProfessionDrawerComponent implements OnInit {


  @Input() role: Role;
  professionDrawerForm: FormGroup;
  professions: IProfessionInfo[];
  isProfessionDrawerVisible = false;
  currentProfessions: Profession[] = [];

  addNewProfessionToolButton: ToolButton = new ToolButton('anticon anticon-plus', 'Add new profession', () => {
    this.currentProfessions.push(new Profession('FIGHTER', 1));
  });

  constructor(private professionInfo: ProfessionInfo,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.professionDrawerForm = this.formBuilder.group({
      profession: [null, [Validators.required]],
      level: [null, [Validators.required]],
      agree: [false]
    });
    this.professions = this.professionInfo.getProfessions();
    this.currentProfessions = this.role.professions ? this.role.professions : this.currentProfessions;
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
    this.currentProfessions = this.role.professions ? this.role.professions : [];
    this.closeProfessionDrawer();
  }

  submit(): void {
    this.closeProfessionDrawer();
  }

}
