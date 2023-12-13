import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  constructor(private http: HttpClient,
    private toastr: ToastrService) { }

  postSchema(data: any) {
    const currentDate = new Date().toISOString();
    data.modifiedDate = currentDate;
    data.version = 3;
    return this.http.post<any>('http://localhost:3000/schema', data).pipe(
      catchError(this.handleError), // Handle errors
      map((res: any) => {
        return res;
      })
    );
  }


  getSchema() {
    return this.http.get<any>('http://localhost:3000/schema').pipe(
      catchError(this.handleError), // Handle errors
      map((res: any) => {
        return res;
      })
    );
  }

  getSchemaById(id: number) {
    return this.http.get<any>('http://localhost:3000/schema/' + id).pipe(
      catchError(this.handleError), // Handle errors
      map((res: any) => {
        return res;
      })
    );
  }

  updateSchema(data: any, id: number) {
    const currentDate = new Date().toISOString();
    data.modifiedDate = currentDate;
    data.version = 3;
    return this.http.put<any>('http://localhost:3000/schema/' + id, data).pipe(
      catchError(this.handleError), // Handle errors
      map((res: any) => {
        return res;
      })
    );
  }

  deleteSchema(id: number) {
    return this.http.delete('http://localhost:3000/schema/' + id).pipe(
      catchError(this.handleError), // Handle errors
      map((res: any) => {
        return res;
      })
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // Handle "schema not found" error here
      this.toastr.error('Schema not found', 'Error'); 
    } else {
      // Handle other errors here
      this.toastr.error('An error occurred', 'Error'); 
    }
    return throwError('Something went wrong; please try again later.');
  }
}


