import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleBuilder } from '../factory/role-builder';
import { Role } from '../models/role';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {

  private _roles: Role[] = [];
  private _onDataCreatedCallback: (roles: Role) => void;
  private _onDataRemovedCallback: (removedId: number) => void;

  constructor() {
  }

  public fetchRoles(): Observable<Role[]> {
    return new Observable<Role[]>((observer) => {
      let roles = _.cloneDeep(this._roles);
      observer.next(roles);
      observer.complete();
    });
  }

  public createRole(): Observable<Role> {
    let self = this;
    return new Observable<Role>((observer) => {
      let builder = new RoleBuilder();
      let id = _.last(self._roles) ? _.last(self._roles).id + 1 : 1;
      let role = builder
        .setId(id)
        .setBasicsInfo(`人物${id}`, 18, '一个战士')
        .build();
      observer.next(role);
      self._roles.push(role);
      self.fireOnDataCreated(role);
      observer.complete();
    });
  }

  public deleteRole(id: number): Observable<number> {
    let self = this;
    return new Observable<number>((observer) => {
      observer.next(id);
      _.remove(self._roles, role => role.id === id);
      self.fireOnDataRemoved(id);
      observer.complete();
    });
  }

  public registerOnDataCreated(callback: (role: Role) => void) {
    this._onDataCreatedCallback = callback;
  }

  public fireOnDataCreated(role: Role): void {
    this._onDataCreatedCallback(role);
  }


  public registerOnDataRemoved(callback: (removedId: number) => void) {
    this._onDataRemovedCallback = callback;
  }

  public fireOnDataRemoved(removedId: number): void {
    this._onDataRemovedCallback(removedId);
  }
}
