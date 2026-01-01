import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AuthService } from '../services/auth-service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // тут лежат ngIf, ngFor
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,

  ],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLogin implements OnInit {
  private authService = inject(AuthService);

  form!: FormGroup;

  error: string | null = null;

  isAdmin$ = this.isAdmin;

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.form = this.fb.group({
      secret: ['', Validators.required],
    });
  }

get isAdmin() {
  return this.authService.isAdmin$
}

  public login() {
    if (this.form.invalid) return;

    this.error = null;
    console.log(this.isAdmin$)
    this.authService.login(this.form.value.secret).subscribe({
      error: () => {
        this.error = 'Неверный ключ';
      },
    });
  }

  public logout() {
    this.authService.logout();
    this.form.reset();
    this.error = null;
  }
}
