import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from './authentication.service';



@Injectable()
export class AppointmentService {
  
  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) {}

  private getToken(): string {
    return this.auth.getToken();
  }

  private request(method: 'post'|'get'|'put', type: 'appointment', request?): Observable<any> {
    let base;

    
    if (method === 'post') {
      request._id = this.auth.getUserDetails()._id;
    base = this.http.post(`/api/${type}`, request, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } 
      else if (method === 'put'){ //experimental
      request._id = this.auth.getUserDetails()._id;
      base = this.http.put(`/api/${type}`, request, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
      else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    return base;
  }

  public appointment(): Observable<any> {
    return this.request('get', 'appointment');
  }

  // /* Experimental
  public schedule(appointment): Observable<any> { 
    return this.request('put', 'appointment', appointment);
  }
  // */
}