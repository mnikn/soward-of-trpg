import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleCardComponent as DND3rRoleCard } from './dnd/dnd3r/pages/role-card/role-card.component';
import { RoleEditorPageComponent as DND3rRoleEditor } from './dnd/dnd3r/pages/role-editor/role-editor-page.component';
import { MainComponent } from './components/main/main.component';

const childRoutes: Routes = [
  {path: 'dnd3r/role-card', component: DND3rRoleCard},
  {path: '', redirectTo: '/dnd3r/role-card', pathMatch: 'full'}
];

const appRoutes: Routes = [
  {path: '', component: MainComponent, children: childRoutes},
  {path: 'dnd3r/role-editor/:id', component: DND3rRoleEditor}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)]
})

export class AppRoutingModule {
}
