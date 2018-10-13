import { BaseComponentsModule } from '../../base/components/base-components.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RoleListComponent } from './parts/role-list/role-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListToolbarComponent } from './parts/role-list-toolbar/role-list-toolbar.component';
import { RoleCardComponent } from './pages/role-card/role-card.component';
import { RoleEditorPageComponent } from './pages/role-editor/role-editor-page.component';
import { RouterModule } from '@angular/router';
import { RoleEditorToolbarComponent } from './parts/role-editor-toolbar/role-editor-toolbar.component';
import { RoleEditorComponent } from './parts/role-editor/role-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    BaseComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RoleCardComponent,
    RoleListToolbarComponent,
    RoleListComponent,
    RoleEditorPageComponent,
    RoleEditorComponent,
    RoleEditorToolbarComponent],
  exports: [RoleCardComponent]
})
export class Dnd3rModule {
}
