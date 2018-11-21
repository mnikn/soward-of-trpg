import { Component, Input, OnInit } from '@angular/core';
import { ToolButton } from '../../../../base/components/tool-button/tool-button';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { RoleDataService } from '../../services/role-data.service';
import { RoleFileService } from '../../services/role-file.service';
import { FileService } from '../../../../base/services/file.service';

@Component({
  selector: 'app-dnd3r-role-editor-toolbar',
  templateUrl: './role-editor-toolbar.component.html',
  styleUrls: ['./role-editor-toolbar.component.css']
})
export class RoleEditorToolbarComponent implements OnInit {

  @Input() role: Role;
  toolButtons: ToolButton[] = [
    new ToolButton('anticon anticon-left', '返回主页', () => {
      this.router.navigate(['']);
    }),
    new ToolButton('anticon anticon-save', '保存', () => {
      console.log(this.role);
      this.dateService.updateRole(this.role).subscribe();
    }),
    new ToolButton('anticon anticon-export', '导出txt', () => {
      this.fileService.showFileDialog().subscribe(path => {
        this.roleFileService.toTxtFile(path, this.role).subscribe(txtValue => {
          alert('导出成功！');
        });
      });
    })];

  constructor(private router: Router,
              private dateService: RoleDataService,
              private fileService: FileService,
              private roleFileService: RoleFileService) {
  }

  ngOnInit() {
  }

  onExportTxtFileSelect(args: any): void {
    console.log(args);
  }

}
