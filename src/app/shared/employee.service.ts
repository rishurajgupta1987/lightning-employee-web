import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Employee } from '../employees/employee/iemployee';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  serviceDataURL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  sendEmployeeData(empData: Employee) {
    return this.http.post(this.serviceDataURL + "/employee/add", empData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getEmployeesData(): Observable<any> {
    return this.http.get(this.serviceDataURL + "/employee/all")
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend (lightning-employee-java) service returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'lightning-employee-java is down.');
  };



}
