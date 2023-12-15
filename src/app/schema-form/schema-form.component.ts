import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SchemaService } from '../../services/schema.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-schema-form',
  templateUrl: './schema-form.component.html',
  styleUrls: ['./schema-form.component.scss']
})


export class SchemaFormComponent {
  schemaForm !: FormGroup;
  schemaId !: number;
  isUpdate: boolean = false;
  valueType: any;
  selectedType: any;
  errorMessage: string = '';
  saveButtonDisabled: boolean = false;
  


  constructor(private api: SchemaService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }



  ngOnInit(): void {
    this.schemaForm = this.formBuilder.group({
      name: [
        '', 
      [
        Validators.required, 
        Validators.pattern(/^[a-zA-Z.]+(?: [a-zA-Z]+)*$/),
        Validators.minLength(3),
        Validators.maxLength(20),
      ]
    ],
      modifiedBy: [
        '', 
    [
      Validators.required, 
      Validators.pattern(/^[a-zA-Z.]+(?: [a-zA-Z]+)*$/),
    ]
  ],
      description: [''],
      fields: this.formBuilder.array([]),
    })
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.schemaId = params['id'];
        this.isUpdate = true;
        this.getSchemaDetails(this.schemaId);
      }
    });
  }


  
  addField() {
    const fieldGroup = this.formBuilder.group({
      fname: ['', [Validators.required,Validators.pattern(/^[a-zA-Z.]+(?: [a-zA-Z]+)*$/)]], 
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.fields.push(fieldGroup);
    // this.isFormArrayComplete();
  }

  // Function to remove a field from the FormArray
  removeField(index: number) {
    this.fields.removeAt(index);
  }

  // Getter for FormArray
  get fields() {
    return this.schemaForm.get('fields') as FormArray;
  }


  goBackToDetail(){
    this.router.navigate(['schema-list']);
  }


  getSchemaDetails(id: number) {
    this.api.getSchemaById(id).subscribe((res) => {
        this.schemaForm.patchValue(res);
        res.fields.forEach((obj: any) => {
          const fieldGroup = this.formBuilder.group({
            fname: [obj.fname, Validators.required], 
            type: [obj.type, Validators.required],
            description: [obj.description, Validators.required],
          });
          this.fields.push(fieldGroup);
        });
        this.toastr.clear();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.toastr.error('Schema not found', 'Error'); // Handle "schema not found" error
        } else {
          this.toastr.error('An error occurred while fetching the schema.', 'Error'); // Handle other errors
        }
      },
    );
  }
  

  saveSchemaDetails() {
    this.api.postSchema(this.schemaForm.value).subscribe(
      () => {
        this.router.navigate(['schema-list']);
        this.toastr.success('Schema saved successfully!', 'Success');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.toastr.error('Schema not found', 'Error'); // Handle "schema not found" error
        } else {
          this.toastr.error('An error occurred while saving the schema.', 'Error'); // Handle other errors
        }
      }
    );
  }


  onUpdate() {
    this.api.updateSchema(this.schemaForm.value, this.schemaId).subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['schema-list']);
          this.toastr.success('Schema updated successfully!', 'Success');
        }
      },
      (error) => {
        this.toastr.error('An error occurred while updating the schema.', 'Error');
      }
    );
  } 
}
