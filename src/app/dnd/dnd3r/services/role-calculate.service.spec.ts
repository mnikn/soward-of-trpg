import { TestBed } from '@angular/core/testing';

import { RoleCalculateService } from './role-calculate.service';
import { HpSettingsType, Role } from '../models/role';
import { Profession, ProfessionInfo } from '../models/profession';

describe('RoleCalculateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleCalculateService = TestBed.get(RoleCalculateService);
    expect(service).toBeTruthy();
  });
  it('should calculate max hp base on different hp settings type', () => {
    let professionInfo = TestBed.get(ProfessionInfo);
    professionInfo.setInfoList([{id: 'TEST', hpDiceType: 6, skillPointIncrement: 0, label: '', keyAbility: ''}]);
    const service: RoleCalculateService = new RoleCalculateService(professionInfo, null);
    let role = new Role();
    role.professions = [new Profession('TEST', 1)];

    role.hpSettingsType = HpSettingsType.FULL;
    let expected = 6;
    let actual = service.calculateMaxHp(role);
    expect(expected).toEqual(actual);


    role.hpSettingsType = HpSettingsType.HALF;
    expected = 3;
    actual = service.calculateMaxHp(role);
    expect(expected).toEqual(actual);
  });
});
