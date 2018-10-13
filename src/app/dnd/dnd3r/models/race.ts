import * as _ from 'lodash';
import { AppContext } from '../../../base/constants/app-context';
import { FileService } from '../../../base/services/file.service';
import { Injectable } from '@angular/core';

export interface Race {
  id: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class RaceInfo {

  public _cache: Race[] = null;

  constructor(private fileService: FileService) {

  }

  public getRace(id: string): Race {
    return _.find(this._cache, {id: id});
  }

  public getRaces(): Race[] {
    if (this._cache === null) {
      this._cache = JSON.parse(
        this.fileService
          .readFileSync(AppContext.getDnd3rData('race'))
          .toString());
    }
    return this._cache;
  }
}
