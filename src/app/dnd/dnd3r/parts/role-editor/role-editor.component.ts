import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../models/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlignmentInfo } from '../../models/alignment';
import { SexInfo } from '../../models/sex';
import { BeliefInfo } from '../../models/belief';
import { RaceInfo } from '../../models/race';
import { LanguageInfo } from '../../models/language';
import { Profession, ProfessionInfo } from '../../models/profession';
import { ToolButton } from '../../../../base/components/tool-button/tool-button';
import { ProfessionDrawerComponent } from './parts/profession-drawer/profession-drawer.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-dnd3r-role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.css']
})
export class RoleEditorComponent implements OnInit {

  @Input() role: Role;
  @ViewChild(ProfessionDrawerComponent) professionDrawer;
  validateForm: FormGroup;
  basicsInfoInputControls: any = [];
  professionEditOnDrawerToolButton: ToolButton = new ToolButton('anticon anticon-edit', 'Edit professions', () => {
    this.professionDrawer.openProfessionDrawer();
  });

  constructor(private formBuilder: FormBuilder,
              private beliefInfo: BeliefInfo,
              private sexInfo: SexInfo,
              private professionInfo: ProfessionInfo,
              private raceInfo: RaceInfo,
              private languageInfo: LanguageInfo,
              private alignmentInfo: AlignmentInfo) {
  }

  ngOnInit() {
    this.basicsInfoInputControls = [{
      id: 'name',
      type: 'text',
      label: '姓名',
      placeholder: '请输入姓名...',
      value: this.role.name
    }, {
      id: 'sex',
      type: 'select',
      label: '性别',
      placeholder: '请选择性别...',
      value: this.role.sex,
      options: this.sexInfo.getSexs()
    }, {
      id: 'age',
      type: 'number',
      label: '年龄',
      placeholder: '请输入年龄...',
      value: this.role.age
    }, {
      id: 'race',
      type: 'select',
      label: '种族',
      placeholder: '请选择种族...',
      value: this.role.race,
      options: this.raceInfo.getRaces()
    }, {
      id: 'alignment',
      type: 'select',
      label: '阵营',
      placeholder: '请选择阵营...',
      value: this.role.alignment,
      options: this.alignmentInfo.getAlignments()
    }, {
      id: 'profession',
      type: 'select',
      label: '职业',
      width: 240,
      placeholder: '请选择职业...',
      value: _.map(this.role.professions, 'id'),
      options: this.professionInfo.getProfessions(),
      editOnDrawerButton: this.professionEditOnDrawerToolButton,
      isMulti: true,
      readonly: true,
      allowClear: true
    }, {
      id: 'belief',
      type: 'select',
      label: '信仰',
      width: 240,
      placeholder: '请选择信仰...',
      value: this.role.belief,
      options: this.beliefInfo.getBeliefs(),
      allowClear: true
    }, {
      id: 'language',
      type: 'select',
      width: 240,
      label: '语言',
      placeholder: '请选择语言...',
      value: this.role.languages,
      options: this.languageInfo.getLanguages(),
      isMulti: true,
      allowClear: true
    }];
    _.forEach(this.basicsInfoInputControls, control => {
      if (!control.readonly) {
        control.onChange = (value: any) => this.role[control.id] = value;
      } else {
        control.onChange = () => {
        };
      }
    });
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      age: [null, [Validators.required]],
      race: [null, [Validators.required]],
      profession: [null, [Validators.required]],
      belief: [null],
      language: [null],
      alignment: [null, [Validators.required]],
      agree: [false]
    });
  }

  public updateProfessions(professions: Profession[]) {
    this.role.professions = professions;
    let professionControl: any = _.find(this.basicsInfoInputControls, {id: 'profession'});
    professionControl.value = _.map(professions, 'id');
  }
}
