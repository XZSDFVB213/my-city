import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ResturantService } from '../services/resturant-service';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-create-restaurant-dialog',
  imports: [
    MatDialogActions,
    MatLabel,
    MatFormField,
    MatButtonModule,
    MatDialogContent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-restaurant-dialog.html',
  styleUrl: './create-restaurant-dialog.scss',
})
export class CreateRestaurantDialog implements OnInit {
  form!: FormGroup;
  selectedFile!: File;

  private restaurantsService = inject(ResturantService);
  private dialogRef = inject(MatDialogRef);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      slug: ['', Validators.required],
      cuisine: ['', Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  submit() {
    if (this.form.invalid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('cuisine', this.form.value.cuisine);
    formData.append('slug', this.form.value.slug);
    formData.append('image', this.selectedFile);

    this.restaurantsService
      .createRestaurant(formData)
      .subscribe(() => this.dialogRef.close(true));
  }
  close() {
    this.dialogRef.close();
  }
}
