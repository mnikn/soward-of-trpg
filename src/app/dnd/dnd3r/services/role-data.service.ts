import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleBuilder } from '../factory/role-builder';
import { Role } from '../models/role';
import * as _ from 'lodash';
import { AppContext } from '../../../base/constants/app-context';
import { RoleFileService } from './role-file.service';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {

  private _roles: Role[] = [];
  private _onDataCreatedCallback: (roles: Role) => void;
  private _onDataRemovedCallback: (removedId: number) => void;

  constructor(private fileService: RoleFileService) {
  }

  public fetchRoles(): Observable<Role[]> {
    return new Observable<Role[]>((observer) => {
      this.fileService.readRoleFile().subscribe(roles => {
        this._roles = roles;
        observer.next(_.cloneDeep(roles));
        observer.complete();
      });
    });
  }

  public getRole(id: number): Role {
    let role = _.find(this._roles, {id: id});
    return role;
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
      let resultRoles = self._roles.concat(role);
      this.fileService.writeRoleFile(resultRoles).subscribe((success: boolean) => {
        if (!success) {
          observer.error('Create error!');
          return;
        }

        self._roles = resultRoles;
        observer.next(role);
        self.fireOnDataCreated(role);
        observer.complete();
      });
    });
  }

  public deleteRole(id: number): Observable<number> {
    let self = this;
    return new Observable<number>((observer) => {
      observer.next(id);
      let resultRoles = self._roles.filter(role => role.id !== id);
      this.fileService.writeRoleFile(resultRoles).subscribe((success: boolean) => {
        if (!success) {
          observer.error('Create error!');
          return;
        }

        self._roles = resultRoles;
        observer.next(id);
        self.fireOnDataRemoved(id);
        observer.complete();
      });
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
