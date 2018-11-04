import * as _ from 'lodash';
import { FileService } from '../../../base/services/file.service';
import { AppContext } from '../../../base/constants/app-context';
import { Injectable } from '@angular/core';

export class Goods {
  public id: string;
  public number: number;

  constructor(id: string, number = 1) {
    this.id = id;
    this.number = number;
  }
}

export interface IGoodsInfo {
  id: string;
  label: string;
  description: string;
}


@Injectable({
  providedIn: 'root'
})
export class GoodsInfo {

  private _cache: IGoodsInfo[] = null;

  constructor(private fileService: FileService) {
  }

  public getGoodsInfo(id: string): IGoodsInfo {
    return _.find(this._cache, {id: id});
  }

  public getGoodsListInfo(): IGoodsInfo[] {
    if (this._cache === null) {
      this._cache = JSON.parse(
        this.fileService
          .readFileSync(AppContext.getDnd3rData('goods'))
          .toString());
    }
    return this._cache;
  }
}
