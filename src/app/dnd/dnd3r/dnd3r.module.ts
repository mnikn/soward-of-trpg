import { BaseComponentsModule } from './../../base/components/base-components.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RoleListComponent } from './parts/role-list/role-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarComponent } from './parts/tool-bar/tool-bar.component';
import { RoleCardComponent } from './pages/role-card/role-card.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    BaseComponentsModule
  ],
  declarations: [RoleCardComponent, ToolBarComponent, RoleListComponent],
  exports: [RoleCardComponent]
})
export class Dnd3rModule { }
