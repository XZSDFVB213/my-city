import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // тут лежат ngIf, ngFor
@Component({
  selector: 'app-admin-login',
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AdminLogin implements OnInit {
  private authService = inject(AuthService);

  form!: FormGroup;

  error: string | null = null;

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.form = this.fb.group({
      secret: ['', Validators.required],
    });
  }

  public login() {
    if (this.form.invalid) return;
    this.authService.login(this.form.value.secret).subscribe({
      next: () => (this.error = null) ,
      error: () => (this.error = 'Неверный ключ, не пытайся братишка'),
    });
    
  }
  public logout(){
    this.authService.logout();
  }
}
