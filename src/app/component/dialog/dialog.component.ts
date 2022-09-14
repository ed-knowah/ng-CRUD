import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }
  addProduct() {
    console.log('object');
    alert("Item added successfully")
  }
  closeDialog() {
    this.dialog.closeAll()
  }
}
