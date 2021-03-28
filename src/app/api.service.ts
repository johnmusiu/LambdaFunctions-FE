import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private REST_API_SERVER =
    'https://0tr32hoaf6.execute-api.us-east-1.amazonaws.com/dev/price';
  constructor(private httpClient: HttpClient) {}

  handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Error!';
    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage = `Error: ${errorResponse.error.message}`;
    } else {
      // server side error
      errorMessage = `Error Code: ${errorResponse.status}\nMessage: ${errorResponse.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest() {
    return this.httpClient
      .get(this.REST_API_SERVER)
      .pipe(catchError(this.handleError));
  }
}
