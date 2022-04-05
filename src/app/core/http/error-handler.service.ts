import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handleError(error: HttpErrorResponse) {

    const errorObj = {
      statusCode: 0,
      message: ''
    }
    // A client-side or network error occurred. Handle it accordingly.
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error);
    }

    // Server Errors
    if (error['error']) {

      // Non Field Error
      if (error['error']['non_field_errors']) {
        errorObj.statusCode = error.status
        errorObj.message = error['error']['non_field_errors'][0]
      } else if (error['error']) {
        errorObj.statusCode = error.status
        errorObj.message = error['error']
      }
    }

    return throwError(errorObj);
  };
}
