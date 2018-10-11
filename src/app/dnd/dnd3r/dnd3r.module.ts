import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RoleCardListComponent } from './parts/role-card-list/role-card-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarComponent } from './parts/tool-bar/tool-bar.component';
import { RoleCardComponent } from './pages/role-card/role-card.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  declarations: [RoleCardComponent, ToolBarComponent, RoleCardListComponent],
  exports: [RoleCardComponent]
})
export class Dnd3rModule { }
