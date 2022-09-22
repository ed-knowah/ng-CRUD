import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './component/dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {
        console.log('Error in connection');
      },
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%',
      height: '80%',
    });
  }
}
