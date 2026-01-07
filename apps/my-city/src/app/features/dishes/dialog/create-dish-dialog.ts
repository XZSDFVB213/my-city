import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatLabel, MatFormField, MatInputModule } from '@angular/material/input';
import { DishService } from '../services/dish-service';

@Component({
  selector: 'app-create-dish-dialog',
  imports: [ MatDialogActions,
    MatLabel,
    MatFormField,
    MatButtonModule,
    MatInputModule,
    MatDialogContent,
    ReactiveFormsModule,],
  templateUrl: './create-dish-dialog.html',
  styleUrl: './create-dish-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateDishDialog implements OnInit {
  private data = inject(MAT_DIALOG_DATA) as {restaurantId: string};
  private fb = inject(FormBuilder);
  private dishService = inject(DishService)
  private dialogRef = inject(MatDialogRef)
  form!:FormGroup
  restaurantId:string = this.data.restaurantId;
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      image: [null],
    })
  }
  submit() {
    if(this.form.invalid) return
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('price', this.form.value.price);
    formData.append('restaurantId', this.data.restaurantId);
    if(this.form.value.image){
    formData.append('image', this.form.value.image);

    };
    this.dishService.createDish(formData).subscribe(() => this.dialogRef.close(true));
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
