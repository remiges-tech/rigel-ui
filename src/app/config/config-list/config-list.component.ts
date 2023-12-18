import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ConfigService } from '../config.service';
import { CommonService } from 'src/services/common.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DT_OPTIONS } from 'src/services/constants.service';
import { ConfigListInterface } from '../config.model';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.scss']
})
export class ConfigListComponent {
  @ViewChild(DataTableDirective, { static: false })
  schemaName!: string;
  schemaVersion!: string;
  configData!: ConfigListInterface[];
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _configService: ConfigService,
    private _commonService: CommonService, private _route: ActivatedRoute) {
    this.dtOptions = DT_OPTIONS;
    this.dtTrigger.next(0);
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params: any) => {
      this.schemaName = params['schemaName']
      this.schemaVersion = params['schemaVersion']
    })
    this.getConfigList();
  }

  getConfigList() {
    try {
      let data = {
        params: new HttpParams().append('schemaName', this.schemaName).append('schemaVersion', this.schemaVersion)
      }

      this._configService.getConfigListForSchema(data).subscribe((res: any) => {
        this.configData = res;
        this.dtTrigger.next(0);
      });
    }
    catch (err) {
      this._commonService.log(err)
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
