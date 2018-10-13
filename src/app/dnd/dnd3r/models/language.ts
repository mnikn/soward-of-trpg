import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { FileService } from '../../../base/services/file.service';
import { AppContext } from '../../../base/constants/app-context';

export interface Language {
  id: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageInfo {


  private _cache: Language[] = null;

  constructor(private fileService: FileService) {
  }

  public getLanguage(id: string): Language {
    return _.find(this._cache, {id: id});
  }

  public getLanguages(): Language[] {
    if (this._cache === null) {
      this._cache = JSON.parse(
        this.fileService
          .readFileSync(AppContext.getDnd3rData('language'))
          .toString());
    }
    return this._cache;
  }
}
