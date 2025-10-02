import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../core/localstorage.service';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {

  private localService = inject(LocalStorageService);

  urlForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    redirectTo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^https?:\/\/.+/)
    ])
  });

  onSubmit() {
    if (this.urlForm.invalid) {
      this.urlForm.markAllAsTouched();
      return;
    }
    this.localService.addNewUrl(this.urlForm.value);
    this.urlForm.reset();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.urlForm.get(fieldName);
    return !!(field?.invalid && (field?.touched || field?.dirty));
  }

}
