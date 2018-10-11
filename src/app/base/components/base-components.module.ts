import { ToolButtonGroupComponent } from './tool-button-group/tool-button-group.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolButtonComponent } from './tool-button/tool-button.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  declarations: [ToolButtonComponent, ToolButtonGroupComponent],
  exports: [ToolButtonComponent, ToolButtonGroupComponent]
})
export class BaseComponentsModule {
}
