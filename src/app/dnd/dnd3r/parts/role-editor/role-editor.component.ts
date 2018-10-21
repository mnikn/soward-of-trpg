import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HpSettingsType, Role } from '../../models/role';
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
import { AbilityInfo } from '../../models/ability';
import { FormControl } from '../../../../base/components/form/form-control';
import { HpSettingsModalComponent } from './parts/hp-settings-modal/hp-settings-modal.component';
import { RoleCalculateService } from '../../services/role-calculate.service';
import { ISkillInfo, SkillInfo } from '../../models/skill';

@Component({
  selector: 'app-dnd3r-role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.css']
})
export class RoleEditorComponent implements OnInit {

  @Input() role: Role;
  @ViewChild(ProfessionDrawerComponent) professionDrawer;
  @ViewChild(HpSettingsModalComponent) hpSettingsModal;
  basicsInfoForm: FormGroup;
  basicsInfoInputControls: FormControl[] = [];

  propertyForm: FormGroup;
  propertyFormControls: FormControl[] = [];
  professionEditOnDrawerToolButton: ToolButton = new ToolButton('anticon anticon-edit', 'Edit professions', () => {
    this.professionDrawer.openProfessionDrawer();
  });

  HpSettingsType: any = HpSettingsType;

  constructor(private formBuilder: FormBuilder,
              private beliefInfo: BeliefInfo,
              private sexInfo: SexInfo,
              public professionInfo: ProfessionInfo,
              private raceInfo: RaceInfo,
              private languageInfo: LanguageInfo,
              private alignmentInfo: AlignmentInfo,
              public abilityInfo: AbilityInfo,
              public skillInfo: SkillInfo,
              private calculateService: RoleCalculateService) {
  }

  ngOnInit() {
    this.basicsInfoInputControls.push({
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
      selectOptions: this.sexInfo.getSexs()
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
      selectOptions: this.raceInfo.getRaces()
    }, {
      id: 'alignment',
      type: 'select',
      label: '阵营',
      placeholder: '请选择阵营...',
      value: this.role.alignment,
      selectOptions: this.alignmentInfo.getAlignments()
    }, {
      id: 'professions',
      type: 'select',
      label: '职业',
      minWidth: 240 + 'px',
      placeholder: '请选择职业...',
      value: _.map(this.role.professions, 'id'),
      selectOptions: this.professionInfo.getProfessionsInfo(),
      toolButton: this.professionEditOnDrawerToolButton,
      isMulti: true,
      readonly: true,
      allowClear: true,
      onChange: () => {
      }
    }, {
      id: 'belief',
      type: 'select',
      label: '信仰',
      minWidth: 240 + 'px',
      placeholder: '请选择信仰...',
      value: this.role.belief,
      selectOptions: this.beliefInfo.getBeliefs(),
      allowClear: true
    }, {
      id: 'languages',
      type: 'select',
      minWidth: 240 + 'px',
      label: '语言',
      placeholder: '请选择语言...',
      value: this.role.languages,
      selectOptions: this.languageInfo.getLanguages(),
      isMulti: true,
      allowClear: true
    }, {
      id: 'description',
      type: 'textarea',
      label: '人物描述',
      placeholder: '请选择语言...',
      value: this.role.description,
      colSpan: 24
    });
    _.forEach(this.basicsInfoInputControls, control => {
      if (!control.onChange) {
        control.onChange = (value: any) => this.role[control.id] = value;
      }
    });
    this.basicsInfoForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      age: [null, [Validators.required]],
      race: [null, [Validators.required]],
      professions: [null, [Validators.required]],
      belief: [null],
      languages: [null],
      alignment: [null, [Validators.required]],
      description: [null],
      agree: [false]
    });

    this.propertyFormControls = [
      {
        id: 'str',
        type: 'number',
        label: '力量',
        placeholder: '请输入力量...',
        value: this.role.getStr().value,
        colSpan: 4,
        onChange: (value: number) => {
          this.role.getStr().value = value;
        }
      }, {
        id: 'dex',
        type: 'number',
        label: '敏捷',
        placeholder: '请输入敏捷...',
        value: this.role.getDex().value,
        colSpan: 4,
        onChange: (value: number) => {
          this.role.getDex().value = value;
        }
      }, {
        id: 'con',
        type: 'number',
        label: '体质',
        placeholder: '请输入体质...',
        value: this.role.getCon().value,
        colSpan: 4,
        onChange: (value: number) => {
          this.role.getCon().value = value;
        }
      }, {
        id: 'wis',
        type: 'number',
        label: '意志',
        placeholder: '请输入意志...',
        value: this.role.getWis().value,
        colSpan: 4,
        onChange: (value: number) => {
          this.role.getWis().value = value;
        }
      }, {
        id: 'int',
        type: 'number',
        label: this.abilityInfo.abilities.INTELLIGENCE.label,
        placeholder: '请输入智力...',
        value: this.role.getInt().value,
        colSpan: 4,
        onChange: (value: number) => {
          this.role.getInt().value = value;
        }
      }, {
        id: 'cha',
        type: 'number',
        label: this.abilityInfo.abilities.CHARISMA.label,
        placeholder: '请输入魅力...',
        value: this.role.getCha().value,
        colSpan: 4,
        onChange: (value: number) => {
          this.role.getCha().value = value;
        }
      }, {
        id: 'maxHp',
        type: 'number',
        label: '生命值',
        value: this.calculateService.calculateMaxHp(this.role),
        readonly: true,
        colSpan: 24,
        toolButton: new ToolButton('anticon anticon-setting', '生命值设置', () => {
          this.hpSettingsModal.showModal();
        })
      }];
    this.propertyForm = this.formBuilder.group({
      str: [null],
      dex: [null],
      con: [null],
      int: [null],
      wis: [null],
      cha: [null],
      maxHp: [null]
    });
    _.forEach(this.propertyFormControls, control => {
      if (!control.onChange) {
        control.onChange = (value: any) => this.role[control.id] = value;
      }
    });
  }

  public updateProfessions(professions: Profession[]) {
    _.forEach(professions, (profession) => {
      _.forEach(this.role.skills, (skill) => {
        skill.professionsAssignedPoint[profession.id] = 0;
      });
    });
    this.role.professions = professions;
    let professionControl: any = _.find(this.basicsInfoInputControls, {id: 'professions'});
    professionControl.value = _.map(professions, 'id');

    let maxHp = this.calculateService.calculateMaxHp(this.role);
    _.find(this.propertyFormControls, {id: 'maxHp'}).value = maxHp;
  }

  updateHpSettings(data: any): void {
    this.role.hpSettingsType = data.hpSettingsType;
    this.role.customMaxHp = data.customMaxHp;
    let maxHp = this.calculateService.calculateMaxHp(this.role);
    _.find(this.propertyFormControls, {id: 'maxHp'}).value = maxHp;
  }
}
