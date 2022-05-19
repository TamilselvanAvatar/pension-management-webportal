import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';

import { pluck } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PensionAllService {
  private urlPensioner = 'http://localhost:8000';
  private urlProcess = 'http://localhost:8100';
   private urlAuth = 'http://localhost:8200';
  // private urlAuth = 'http://pensionauthservicerevised-env.eba-xxhwvahp.us-east-1.elasticbeanstalk.com';

  constructor(private httpClient: HttpClient) {}

  gettoken(userName: string, password: string): any {
    return this.httpClient
      .post(this.urlAuth + '/login', {
        userName: userName,
        password: password,
      })
      .pipe(pluck('token'));
  }

  doRegister(userName: string, password: string) {
    return this.httpClient.post(this.urlAuth + '/register', {
      userName: userName,
      password: password,
    });
  }

  getPensionDetails(token: string, aadhaar: number): any {
    let header = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.post(
      this.urlProcess + '/ProcessPension',
      { aadhaar: aadhaar },
      { headers: header }
    );
  }

  getPensionerDetails(token: string, aadhaar: number): any {
    let header = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.get(
      this.urlPensioner + '/PensionerDetailByAadhaar/' + aadhaar,
      { headers: header }
    );
  }

  savePensionerDetails(token: string, pensioner: any): any {
    let header = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.post(
      this.urlPensioner + '/SavePensioner',
      { ...pensioner },
      { headers: header }
    );
  }

  updatePensionerDetails(token: string, pensioner: any): any {
    let header = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.put(
      this.urlPensioner + '/UpdatePensioner',
      { ...pensioner },
      { headers: header }
    );
  }

  deletePensionerDetails(token: string, aadhaarNumber: number): any {
    let header = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.delete(
      this.urlPensioner + '/DeletePensioner/' + aadhaarNumber,
      { headers: header }
    );
  }
}
