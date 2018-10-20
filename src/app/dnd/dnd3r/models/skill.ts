import * as _ from 'lodash';
import { FileService } from '../../../base/services/file.service';
import { AppContext } from '../../../base/constants/app-context';
import { Injectable } from '@angular/core';

export class Skill {
  public id: string;
  public professionsAssignedPoint: Map<string, number>;

  constructor(id: string, professionsAssignedPoint?: Map<string, number>) {
    this.id = id;
    if (!professionsAssignedPoint) {
      professionsAssignedPoint = new Map<string, number>();
    }
    this.professionsAssignedPoint = professionsAssignedPoint;
  }
}

export interface ISkillInfo {
  id: string;
  label: string;
  keyAbility: string;
  keyProfessions: string[];
  crossClass: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SkillInfo {

  private _cache: ISkillInfo[] = null;

  constructor(private fileService: FileService) {
  }

  public getSkill(id: string): ISkillInfo {
    return _.find(this._cache, {id: id});
  }

  public getSkills(): ISkillInfo[] {
    if (this._cache === null) {
      this._cache = JSON.parse(
        this.fileService
          .readFileSync(AppContext.getDnd3rData('skill'))
          .toString());
    }
    return this._cache;
  }
}


