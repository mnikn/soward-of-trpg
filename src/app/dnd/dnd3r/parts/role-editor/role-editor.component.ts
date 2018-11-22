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
import { FormControl } from '../../../../base/components/form/form-control';
import { HpSettingsModalComponent } from './parts/hp-settings-modal/hp-settings-modal.component';
import { RoleCalculateService } from '../../services/role-calculate.service';
import { SkillInfo } from '../../models/skill';
import { Charisma, Constitution, Dexterity, Intelligence, Strength, Wisdom } from '../../models/ability';

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

  magicProfessions: Profession[] = [];

  constructor(private formBuilder: FormBuilder,
              private beliefInfo: BeliefInfo,
              private sexInfo: SexInfo,
              public professionInfo: ProfessionInfo,
              private raceInfo: RaceInfo,
              private languageInfo: LanguageInfo,
              private alignmentInfo: AlignmentInfo,
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
      selectOptions: this.raceInfo.getInfoList()
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
      selectOptions: this.professionInfo.getInfoList(),
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
      selectOptions: this.beliefInfo.getInfoList(),
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
        label: Strength.label,
        placeholder: '请输入力量...',
        value: this.role.str.value,
        colSpan: 4,
        onChange: (value: number) => {
          this.role.str.value = value;
        }
      }, {
        id: 'dex',
        type: 'number',
        label: Dexterity.label,
        placeholder: '请输入敏捷...',
        value: this.role.dex.value,
        colSpan: 4,
        onChange: (value: number) => {
          this.role.dex.value = value;
        }
      }, {
        id: 'con',
        type: 'number',
        label: Constitution.label,
        placeholder: '请输入体质...',
        value: this.role.con.value,
        colSpan: 4,
        onChange: (value: number) => {
          let maxHp = this.role.maxHp;
          if (this.role.hpSettingsType === HpSettingsType.RADNOM) {
            maxHp += this.calculateService.calculateAbilityModifier(value) - this.role.con.getModifier();
            this.role.con.value = value;
          } else {
            this.role.con.value = value;
            maxHp = this.calculateService.calculateMaxHp(this.role);
          }
          this.updateMaxHp(maxHp);
        }
      }, {
        id: 'wis',
        type: 'number',
        label: Wisdom.label,
        placeholder: '请输入意志...',
        value: this.role.wis.value,
        colSpan: 4,
        onChange: (value: number) => {
          this.role.wis.value = value;
        }
      }, {
        id: 'int',
        type: 'number',
        label: Intelligence.label,
        placeholder: '请输入智力...',
        value: this.role.int.value,
        colSpan: 4,
        onChange: (value: number) => {
          this.role.int.value = value;
        }
      }, {
        id: 'cha',
        type: 'number',
        label: Charisma.label,
        placeholder: '请输入魅力...',
        value: this.role.cha.value,
        colSpan: 4,
        onChange: (value: number) => {
          this.role.cha.value = value;
        }
      }, {
        id: 'maxHp',
        type: 'number',
        label: '生命值',
        value: this.role.maxHp,
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

    this.magicProfessions = this.getMagicProfessions();
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
    this.updateMaxHp(maxHp);

    this.magicProfessions = this.getMagicProfessions();
  }

  updateHpSettings(data: any): void {
    this.role.hpSettingsType = data.hpSettingsType;
    let maxHp = data.hpSettingsType === HpSettingsType.CUSTOM ? data.customMaxHp : this.calculateService.calculateMaxHp(this.role);
    this.updateMaxHp(maxHp);
  }

  private updateMaxHp(maxHp: number): void {
    this.role.maxHp = maxHp;
    _.find(this.propertyFormControls, {id: 'maxHp'}).value = maxHp;
  }

  private getMagicProfessions(): Profession[] {
    let professionInfo = this.professionInfo;
    let professions = _.filter(this.role.professions, p => !!professionInfo.getInfo(p.id).magicType);
    return professions;
  }

}
