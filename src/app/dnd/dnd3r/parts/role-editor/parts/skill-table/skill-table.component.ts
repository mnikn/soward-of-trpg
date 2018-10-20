import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from '../../../../models/role';
import { Profession, ProfessionInfo } from '../../../../models/profession';
import { SkillInfo } from '../../../../models/skill';
import { AbilityInfo } from '../../../../models/ability';

@Component({
  selector: 'app-dnd3r-skill-table',
  templateUrl: './skill-table.component.html',
  styleUrls: ['./skill-table.component.css']
})
export class SkillTableComponent implements OnInit {

  @Input() role: Role;
  @Output() onSkillPointAssigned: EventEmitter<any> = new EventEmitter<any>();

  constructor(public professionInfo: ProfessionInfo,
              public skillInfo: SkillInfo,
              public abilityInfo: AbilityInfo) { }

  ngOnInit() {
  }

}
