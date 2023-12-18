import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../config.service';
import { CommonService } from 'src/services/common.service';
import { ConfigValuesInterface } from '../config.model';
import { ToastrService } from 'ngx-toastr';
import { TYPE_OPTION } from 'src/services/constants.service';

@Component({
  selector: 'app-config-details',
  templateUrl: './config-details.component.html',
  styleUrls: ['./config-details.component.scss']
})
export class ConfigDetailsComponent {
  options:string[] = TYPE_OPTION;
  isReadOnly: boolean = true;
  selectedSchemaName!: string;
  selectedSchemaVersion!: number;
  selectedConfigName!: string;
  congifDetails: FormGroup;
  submitted: boolean = false;
  constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _configService: ConfigService, private _commonService: CommonService, private _toastr:ToastrService) {
    this.congifDetails = this._fb.group({
      id: new FormControl(''),
      schemaName: new FormControl('', [Validators.required]),
      schemaVersion: new FormControl('', [Validators.required]),
      configName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      values: this._fb.array([])
    });
  }

  ngOnInit() {
    this._route.queryParams.subscribe((params: any) => {
      this.selectedSchemaName = params['schemaName']
      this.selectedSchemaVersion = params['schemaVersion']
      this.selectedConfigName = params['configName'];
    })

    this.getConfigDetails();
  }

  getConfigDetails() {
    try {
      let data = {
        params: new HttpParams().append('schemaName', this.selectedSchemaName).append('schemaVersion', this.selectedSchemaVersion).append('configName', this.selectedConfigName)
      }

      this._configService.getConfigListForSchema(data).subscribe((res: any) => {
        this.isReadOnly = true;
        this.congifDetails.patchValue(res[0]);
        this.values.clear();
        res[0].values.forEach((value: ConfigValuesInterface) => {
          this.addFields(value.field, value.type, value.value);
        });
      });
    }
    catch (err) {
      this._commonService.log(err)
    }
  }

  get schemaName() {
    return this.congifDetails.get('schemaName');
  }

  get schemaVersion() {
    return this.congifDetails.get('schemaVersion');
  }

  get configName() {
    return this.congifDetails.get('configName');
  }

  get description() {
    return this.congifDetails.get('description');
  }

  get values() {
    return this.congifDetails.get('values') as FormArray;
  }

  newFields(field?: string, type?: string, value?: any): FormGroup {
    return this._fb.group({
      field: [field ?? '', [Validators.required]],
      type: [type ?? '', [Validators.required]],
      value: [value ?? '', [Validators.required]],
    });
  }

  addFields(field?: string, type?: string, value?: any) {
    this.values.push(this.newFields(field, type, value));
  }

  removeFields(i: number) {
    this.values.removeAt(i);
  }

  updateDetails() {
    if (this.congifDetails.invalid) {
      return;
    }

    try {
      this._configService.updateConfigData(this.congifDetails.value)?.subscribe((res: any) => {
        if(res){
          this._toastr.success('Successfully Updated Details')
          this.getConfigDetails();
        }
      })
    } catch (err: any) {
      this._commonService.log(err);
    }
  }

}
