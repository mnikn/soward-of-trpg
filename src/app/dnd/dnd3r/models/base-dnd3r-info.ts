import { FileService } from '../../../base/services/file.service';
import * as _ from 'lodash';
import { AppContext } from '../../../base/constants/app-context';

export interface BaseDnd3rInfoItem {
  id: string;
}

export abstract class BaseDnd3rInfo<T extends BaseDnd3rInfoItem> {
  
  protected constructor(private service: FileService, private type: string) {
  }

  private _cache: T[] = null;

  public getInfo(id: string): T {
    return _.find(this._cache, item => item.id === id);
  }

  public getInfoList(): T[] {
    if (this._cache === null) {
      this._cache = JSON.parse(
        this.service
          .readFileSync(AppContext.getDnd3rData(this.type))
          .toString());
    }
    return this._cache;
  }

  public setInfoList(data: T[]): void {
    this._cache = data;
  }
}
