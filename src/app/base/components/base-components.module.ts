import { ToolButtonGroupComponent } from './tool-button-group/tool-button-group.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolButtonComponent } from './tool-button/tool-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { TransferComponent } from './transfer/transfer.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ToolButtonComponent, ToolButtonGroupComponent, FormComponent, TransferComponent],
  exports: [ToolButtonComponent, ToolButtonGroupComponent, FormComponent, TransferComponent]
})
export class BaseComponentsModule {
}
