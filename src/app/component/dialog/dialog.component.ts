import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList: any[] = ['Brand new', 'Second Hand', 'Refurbished'];
  optionList: any[] = ['Fruits', 'Vegetables', 'Electronics'];
  productForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
  }
  addProduct() {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert('Item added successfully');
          this.productForm.reset(); // clear dialog form
          this.dialogRef.close('Saved Successfully');
          this.getProduct();
        },
        error: () => {
          alert('Error while adding product, Please chek your internet');
        },
      });
    }
  }

  getProduct() {
    this.api.getProduct().subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
