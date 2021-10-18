import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators/';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  env = environment;
  private url =  this.env.apiUrl + 'AdminApi';
  loggedInUser: any;
  constructor(private httpClient: HttpClient) { }

  saveData(data, mode): Observable<any> {
    console.log(data);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('loggedOnUser', this.loggedInUser).set('mode', mode);
    return this.httpClient.post<any>(this.url, data, { headers, params })
      .pipe(catchError(this.handleError));
  }
  userRegister(data): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('loggedOnUser', this.loggedInUser).set('mode', 'userRegister');
    return this.httpClient.post<any>(this.url, data, { headers, params })
      .pipe(catchError(this.handleError));
  }

  savePatient(data): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('loggedOnUser', this.loggedInUser).set('mode', 'savePatient');
    return this.httpClient.post<any>(this.url, data, { headers, params })
      .pipe(catchError(this.handleError));
  }


  //  teeth diagnose save

  saveTeethDiagnose(body , condition , selectedTeeth , PatientID): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('PatientID', PatientID).set('mode', condition).set('selectedTeeth', selectedTeeth);
    return this.httpClient.post<any>(this.url, body, { headers, params })
      .pipe(catchError(this.handleError));
  }

  saveTeethDiagnosePerioBone(body , condition , selectedTeeth , PatientID): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('PatientID', PatientID).set('mode', condition).set('selectedTeeth', selectedTeeth);
    return this.httpClient.post<any>(this.url, body, { headers, params })
      .pipe(catchError(this.handleError));
  }


  saveTeethDiagnoseEndodontics(body , condition , selectedTeeth , PatientID): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('PatientID', PatientID).set('mode', condition).set('selectedTeeth', selectedTeeth);
    return this.httpClient.post<any>(this.url, body, { headers, params })
      .pipe(catchError(this.handleError));
  }


  saveTeethDiagnoseMissingTeethImplants(body , condition , selectedTeeth , PatientID): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('PatientID', PatientID).set('mode', condition).set('selectedTeeth', selectedTeeth);
    return this.httpClient.post<any>(this.url, body, { headers, params })
      .pipe(catchError(this.handleError));
  }

  getDiagnosisByPatientID(id, mode , tblName): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('id', id).set('mode', mode).set('tblName', tblName);
    return this.httpClient.get<any[]>(this.url, { headers, params })
      .pipe(catchError(this.handleError));
  }


  pl_form(bodydata): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', 'pl_form');
    return this.httpClient.post<any[]>(this.url, bodydata, { headers, params })
      .pipe(catchError(this.handleError));
  }

  // end
  updatePlanName(data): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('loggedOnUser', this.loggedInUser).set('mode', 'updatePlanName');
    return this.httpClient.post<any>(this.url, data, { headers, params })
      .pipe(catchError(this.handleError));
  }
  getDataById(id, mode): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('id', id)
    .set('mode', mode);
    return this.httpClient.get<any[]>(this.url, { headers, params })
      .pipe(catchError(this.handleError));
  }

  getList(mode): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.httpClient.get<any[]>(this.url, { headers, params })
      .pipe(catchError(this.handleError));
  }

  deletePatient(mode , id): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('id', id);
    return this.httpClient.delete<any[]>(this.url, { headers, params })
      .pipe(catchError(this.handleError));
  }

  getByID(mode , id): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('id', id);
    return this.httpClient.get<any[]>(this.url, { headers, params })
      .pipe(catchError(this.handleError));
  }

  searchPatient(mode , searchTerm): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('searchTerm', searchTerm);
    return this.httpClient.get<any[]>(this.url, { headers, params })
      .pipe(catchError(this.handleError));
  }

  savePlan(data): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', 'savePlan');
    return this.httpClient.post<any[]>(this.url, data, { headers, params })
      .pipe(catchError(this.handleError));
  }

  savePlanCopy(data): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', 'savePlanCopy');
    return this.httpClient.post<any[]>(this.url, data, { headers, params })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError('"Server Not Connected"');
  }

}
