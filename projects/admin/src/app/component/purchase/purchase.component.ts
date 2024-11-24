import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {

  repurchaseInfo:any=[];
  global = inject(GlobalService);
  _http = inject(HttpClient);
  ngOnInit(): void {
    this.TotalRepurchase()
  }
  TotalRepurchase() {
    this._http.get(this.global.baseUrl + 'api/Member/TotalRepurchase').subscribe({
      next: (data) => {
        console.log(data)
        this.repurchaseInfo = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
