import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  actionBtn: string = 'Save';
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any, //inject the dialog data
    private router: Router
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
    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['description'].setValue(
        this.editData.description
      );
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Item added successfully');
            this.productForm.reset(); // clear dialog form
            this.closeDialog('save');
            this.getProduct();
            this.router.navigate(['/localhost:4200/']);
          },
          error: () => {
            alert('Error while adding product, Please chek your internet');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  getProduct() {
    this.api.getProduct().subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: () => {
        alert(`${this.editData.productName} has been updated`);
        this.productForm.reset();
        this.closeDialog('update');
      },
      error: () => {
        alert(`${this.editData.productName} has failed to update`);
        console.log(`${this.editData.productName} has failed to update`);
      },
    });
  }
  closeDialog(ref: string) {
    this.dialogRef.close(ref);
  }
}
