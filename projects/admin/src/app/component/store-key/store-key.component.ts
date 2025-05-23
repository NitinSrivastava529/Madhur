import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../model/constant';

@Component({
  selector: 'app-store-key',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './store-key.component.html',
  styleUrl: './store-key.component.css'
})
export class StoreKeyComponent {
  IsLoading: boolean = false;
  IsLoading2: boolean = false;
  StoreId: string = "";
  StorekeyInfo: any;
  global = inject(GlobalService);
  http = inject(HttpClient);
  GetDetails() {
    if (this.StoreId.length < 5) {
      alert('Please Enter StoreId')
      return
    }
    this.IsLoading = true;
    this.http.get(constant.API_URL + 'api/member/GetStorekeyAdmin?storeId=' + this.StoreId).subscribe((res: any) => {
      console.warn(res)
      this.StorekeyInfo = res;
      this.IsLoading = false;
    })
  }
  Reset() {
    if (!confirm('are you sure?')) {
      return
    }
    if (this.StoreId.length < 5) {
      alert('Please Enter StoreId')
      return
    }
    this.IsLoading2 = true;
    this.http.delete(constant.API_URL + 'api/member/ResetStorekeyAdmin?storeId=' + this.StoreId).subscribe((res: any) => {
      if(res.result){
        alert(res.message)
        this.GetDetails()
      }     
      this.IsLoading2 = false;
    })
  }
}
