import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService, ContactForm } from '../services/contact.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class ContactComponent implements OnInit {
  form!: FormGroup;
  success = false;
  error: string | null = null;

  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const data: ContactForm = this.form.value;
    this.contactService.sendMessage(data).subscribe({
      next: () => {
        this.success = true;
        this.error = null;
        this.form.reset();
      },
      error: (err) => {
        this.error = 'Ошибка отправки сообщения';
        this.success = false;
      },
    });
  }
}