import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    public readonly bashUrl = 'http://localhost:3000/api';
  sendMessage(form: ContactForm): Observable<any> {
    return this.http.post(`${this.bashUrl}/contact`, form);
  }
}
