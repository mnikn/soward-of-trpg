import * as _ from 'lodash';
import { FileService } from '../../../base/services/file.service';
import { AppContext } from '../../../base/constants/app-context';
import { Injectable } from '@angular/core';

export interface Weapon {
  id: string;
  holdWeaponType: string;
  label: string;
  description: string;
  damageDiceNumber: number;
  damageDiceType: number;
  range: number;
  critDamage: number;
  damageType: string;
}


@Injectable({
  providedIn: 'root'
})
export class WeaponInfo {

  private _cache: Weapon[] = null;

  constructor(private fileService: FileService) {
  }

  public getWeaponInfo(id: string): Weapon {
    return _.find(this._cache, {id: id});
  }

  public getWeaponsInfo(): Weapon[] {
    if (this._cache === null) {
      this._cache = JSON.parse(
        this.fileService
          .readFileSync(AppContext.getDnd3rData('weapon'))
          .toString());
    }
    return this._cache;
  }
}
