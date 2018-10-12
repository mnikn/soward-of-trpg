import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { RoleDataService } from '../../services/role-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dnd3r-role-editor-page',
  templateUrl: './role-editor-page.component.html',
  styleUrls: ['./role-editor-page.component.css']
})
export class RoleEditorPageComponent implements OnInit {

  role: Role;


  constructor(private dataService: RoleDataService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.role = this.dataService.getRole(id);
  }

}
