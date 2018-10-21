import { Component, Input, OnInit} from '@angular/core';
import { Role } from '../../../../models/role';
import { ProfessionInfo } from '../../../../models/profession';
import { SkillInfo } from '../../../../models/skill';
import { AbilityInfo } from '../../../../models/ability';
import { RoleCalculateService } from '../../../../services/role-calculate.service';

@Component({
  selector: 'app-dnd3r-skill-table',
  templateUrl: './skill-table.component.html',
  styleUrls: ['./skill-table.component.css']
})
export class SkillTableComponent implements OnInit {

  @Input() role: Role;

  constructor(public professionInfo: ProfessionInfo,
              public skillInfo: SkillInfo,
              public abilityInfo: AbilityInfo,
              public calculateService: RoleCalculateService) { }

  ngOnInit() {
  }

}
