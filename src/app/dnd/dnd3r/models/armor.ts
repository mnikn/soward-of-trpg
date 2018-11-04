import * as _ from 'lodash';
import { FileService } from '../../../base/services/file.service';
import { AppContext } from '../../../base/constants/app-context';
import { Injectable } from '@angular/core';

export interface Armor {
  id: string;
  label: string;
  description: string;
}


@Injectable({
  providedIn: 'root'
})
export class ArmorInfo {

  private _cache: Armor[] = null;

  constructor(private fileService: FileService) {
  }

  public getArmorInfo(id: string): Armor {
    return _.find(this._cache, {id: id});
  }

  public getArmorsInfo(): Armor[] {
    if (this._cache === null) {
      this._cache = JSON.parse(
        this.fileService
          .readFileSync(AppContext.getDnd3rData('armor'))
          .toString());
    }
    return this._cache;
  }
}
