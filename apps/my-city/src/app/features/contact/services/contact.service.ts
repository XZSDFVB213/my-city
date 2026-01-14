import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  public readonly bashUrl = environment.apiUrl;
  sendMessage(form: ContactForm): Observable<any> {
    return this.http.post(`${this.bashUrl}/contact`, form);
  }
}
