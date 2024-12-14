import { Component, inject, Inject, OnInit } from '@angular/core';
import { IStore } from '../../model/IStore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';
import { Store } from '../../model/Store';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {

  storeList: IStore[] = [];
  store: Store = new Store();
  stateList: any;
  isLoading:boolean=false;
  cityList: any;
  param:string="";
  http = inject(HttpClient);
  global = inject(GlobalService);
  ngOnInit(): void {
    this.getStore()
    this.GetState()
  }
  GetState() {
    this.http.get(this.global.baseUrl + 'api/Auth/GetState').subscribe((res => {
      this.stateList = res;
    }))
  }
  GetCity(event: any) {
    var selectedOption = event.target.options[event.target.selectedIndex];
    var StateCode = selectedOption.getAttribute('state_code');
    this.http.get(this.global.baseUrl + 'api/Auth/GetDistrict/' + StateCode).subscribe((res => {
      this.cityList = res;
    }))
  }
  getStore() {
    this.http.get(this.global.baseUrl + 'api/Member/GetStore').subscribe((res: any) => {
      this.storeList = res;
    })
  }
  filterStore() {
    this.http.get(this.global.baseUrl + 'api/Member/GetStore/'+this.param).subscribe((res: any) => {
      this.storeList = res;
      this.param=''
    })
  }
  addStore() {
    this.isLoading=true;
    this.http.post(this.global.baseUrl + 'api/Member/AddStore', this.store, { headers: this.global.headers }).subscribe((res: any) => {
      this.getStore();
      this.store = new Store();
      this.isLoading=false;
    })
  }
  Delete(autoId: Number) {
    if (confirm('are you sure?')) {
      this.http.delete(this.global.baseUrl + 'api/Member/DeleteStore/' + autoId, { headers: this.global.headers }).subscribe((res: any) => {
        this.getStore();
      })
    }
  }
  Edit(autoId: Number) {
    var val = this.storeList.find(x => x.autoId == autoId);
    if (val != null) {
      this.store.autoId = autoId;
      this.store.storeId = val.storeId;
      this.store.storeName = val.storeName;
      this.store.mobile = val.mobile;
      this.store.address = val.address;
      this.store.state = val.state;     
      this.store.city= val.city;     
      this.store.pinCode = val.pinCode;           
    }    
  }
}
