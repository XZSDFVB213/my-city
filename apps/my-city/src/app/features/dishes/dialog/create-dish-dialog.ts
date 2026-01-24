import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatInputModule,
} from '@angular/material/input';
import { DishService } from '../services/dish-service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-create-dish-dialog',
  templateUrl: './create-dish-dialog.html',
  styleUrls: ['./create-dish-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,

    // ✅ Material modules
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    AsyncPipe,
  ],
})
export class CreateDishDialog implements OnInit {
  private data = inject(MAT_DIALOG_DATA) as { restaurantId: string };
  private fb = inject(FormBuilder);
  private dishService = inject(DishService);
  private dialogRef = inject(MatDialogRef);
  public categories = this.dishService.categories$;
  form!: FormGroup;
  restaurantId: string = this.data.restaurantId;
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      image: [null],
      category: ['', Validators.required],
    });
    ;
    this.dishService.getCategories();
  }
  submit() {
    if (this.form.invalid) return;
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('price', this.form.value.price);
    formData.append('restaurantId', this.data.restaurantId);
    formData.append('category', this.form.value.category);
    if (this.form.value.image) {
      formData.append('image', this.form.value.image);
    }
    this.dishService
      .createDish(formData)
      .subscribe(() => this.dialogRef.close(true));
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.form.patchValue({ image: input.files[0] });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
