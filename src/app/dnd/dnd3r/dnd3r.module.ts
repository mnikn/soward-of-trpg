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
import { ProfessionDrawerComponent } from './parts/role-editor/parts/profession-drawer/profession-drawer.component';
import { HpSettingsModalComponent } from './parts/role-editor/parts/hp-settings-modal/hp-settings-modal.component';
import { SkillTableComponent } from './parts/role-editor/parts/skill-table/skill-table.component';
import { MagicCardComponent } from './parts/role-editor/parts/magic-card/magic-card.component';
import { ItemCardComponent } from './parts/role-editor/parts/item-card/item-card.component';

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
    RoleEditorToolbarComponent,
    ProfessionDrawerComponent,
    HpSettingsModalComponent,
    SkillTableComponent,
    MagicCardComponent,
    ItemCardComponent],
  exports: [RoleCardComponent]
})
export class Dnd3rModule {
}
