import { HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../config.service';
import { CommonService } from 'src/services/common.service';
import { ConfigValuesInterface } from '../config.model';
import { ToastrService } from 'ngx-toastr';
import { TYPE_OPTION } from 'src/services/constants.service';
import * as Enums from '../../../services/constants.service';
import { checkValueType } from 'src/utils/customValidator';

@Component({
  selector: 'app-config-details',
  templateUrl: './config-details.component.html',
  styleUrls: ['./config-details.component.scss']
})
export class ConfigDetailsComponent {
  action!:string;
  options:string[] = TYPE_OPTION;
  selectedSchemaName!: string;
  selectedSchemaVersion!: number;
  selectedConfigName!: string;
  congifDetails: FormGroup;
  submitted: boolean = false;
  _commonService = inject(CommonService)
  constructor(private _fb: FormBuilder, private _router:Router, private _route: ActivatedRoute, private _configService: ConfigService, private _toastr:ToastrService) {
    this.congifDetails = this._fb.group({
      id: new FormControl(''),
      schemaName: new FormControl('', [Validators.required]),
      schemaVersion: new FormControl('', [Validators.required]),
      configName: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      values: this._fb.array([])
    });
  }

  ngOnInit() {
    this._route.paramMap.subscribe(({params}:any) => {
      this.action = params['action'];
    });
    this._route.queryParams.subscribe((params: any) => {
      this.selectedSchemaName = params['schemaName']
      this.selectedSchemaVersion = params['schemaVersion']
      this.selectedConfigName = params['configName'];
    });
    if(this.isAdd()){
      this.getSchemaDetails();
    }else{
      this.getConfigDetails();
    }
  }

  isAdd() : boolean{
    return this.action == Enums.CONSTANTS.CONFIG_ADD
  }

  isView() : boolean{
    return this.action == Enums.CONSTANTS.CONFIG_VIEW
  }

  getConfigDetails() {
    if(this.selectedSchemaName == null || this.selectedSchemaVersion == null || this.selectedConfigName == null){
      this._router.navigate(['/']);
      return;
    }
    try {
      let data = {
        params: new HttpParams().append('schemaName', this.selectedSchemaName).append('schemaVersion', this.selectedSchemaVersion).append('configName', this.selectedConfigName)
      }

      this._configService.getConfigListForSchema(data).subscribe((res: any) => {
        this.congifDetails.patchValue(res[0]);
        this.values.clear();
        res[0].values.forEach((value: ConfigValuesInterface) => {
          this.addFields(value.field, value.type, value.value);
        });
      });
    }
    catch (err) {
      this._toastr.error('Something Went Wrong!')
      this._commonService.log(err)
    }
  }

  getSchemaDetails() {
    if(this.selectedSchemaName == null || this.selectedSchemaVersion == null){
      this._router.navigate(['/'])
      return;
    }
    try {
      let data = {
        params: new HttpParams().append('name', this.selectedSchemaName).append('version', this.selectedSchemaVersion)
      }

      this._configService.getSchemaDetails(data).subscribe((res: any) => {
        this.congifDetails.patchValue({
          schemaName: res[0].name,
          schemaVersion: res[0].version
        });
        this.values.clear();
        res[0].fields.forEach((value: any) => {
          this.addFields(value.fname, value.type, value.value);
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
      field: [field , [Validators.required]],
      type: [type , [Validators.required]],
      value: [value , [Validators.required]],
    },{validators: [checkValueType()] });
  }

  addFields(field?: string, type?: string, value?: any) {
    this.values.push(this.newFields(field, type, value));
  }

  removeFields(i: number) {
    this.values.removeAt(i);
  }

  addDetails(){
    if (this.congifDetails.invalid) {
      return;
    }

    try {
      this._configService.addConfigData(this.congifDetails.value)?.subscribe((res: any) => {
        if(res){
          this._toastr.success('Successfully Added Details')
          this._router.navigate([''])
        }
      })
    } catch (err: any) {
      this._commonService.log(err);
    }
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
