/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, filter, retry } from 'rxjs/operators';

export const httpOptions = {
  headers: new HttpHeaders({
    'X-Auth-Token': '11710fc364aa44da91e96bbf1c17d6f3'
  })
};
@Injectable({
  providedIn: 'root'
})
export class FootballApiService {

  private eplURL: string;
  constructor(private httpClient: HttpClient) {
    this.eplURL = 'https://api.football-data.org/v2/';
   }

  public getEPLTeams(id?: number): Observable<any> {
    return this.httpClient.get(this.eplURL.concat('competitions/PL/teams'), httpOptions).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  public getEPLScorers(id?: number): Observable<any> {
    return this.httpClient.get(this.eplURL.concat('competitions/PL/scorers'), httpOptions).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  public getEPLTeamMatches(teamId: number): Observable<any> {
    return this.httpClient.get(this.eplURL.concat('teams/',String(teamId), '/matches?status=FINISHED'), httpOptions).pipe(
      catchError(this.handleError),
      retry(3)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
