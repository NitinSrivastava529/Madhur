import { ChangeDetectionStrategy, Component, ElementRef, inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LiteralArray } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { TotalKey } from '../../model/TotalKey';
import { Config, NgxPrintElementService } from 'ngx-print-element';

@Component({
  selector: 'app-reg-key',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reg-key.component.html',
  styleUrl: './reg-key.component.css'
})
export class RegKeyComponent implements OnInit {
  IsLoading: boolean = false;
  IsLoading2: boolean = false;
  IsCopy: string = 'N';
  key: string = "";
  count = 1;
  checkTotal = 0;
  totalKey: any = {};
  RegKey: any = {};
  listId: any = [];
  listkey: any = [];
  global = inject(GlobalService);
  http = inject(HttpClient);
  constructor() { }
  ngOnInit(): void {
    this.GetRegKey();
    this.TotalKey()
  }
  GetRegKey() {
    const obj = {
      url: "api/Member/RegKeys?param=" + this.IsCopy
    };
    this.global.get(obj).subscribe((data: any) => {
      this.RegKey = data;
    })
  }
  selectKey(event: Event) {
    debugger
    const isCheck = (event.target as HTMLInputElement).checked;
    const value = (event.target as HTMLInputElement).value;
    if (isCheck)
      this.listkey.push(value);
    else
      this.listkey.splice(this.listkey.indexOf(value), 1);
    // const key = (event.target as HTMLInputElement).getAttribute('key');
    // if (isCheck == true) {
    //   if (!this.listId.includes(+value))
    //     this.listId.push(+value);
    //   this.listkey.push(key);
    // } else {
    //   if (this.listId.includes(+value))
    //     this.listId.splice(this.listId.indexOf(+value), 1)
    //   this.listkey.splice(this.listkey.indexOf(key), 1)
    // }
  }
  copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.listkey.join('\r\n');
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  copyKey() {
    this.IsLoading2 = true;
    this.http.put(this.global.baseUrl + 'api/Member/UpdateRegKeys', this.listkey).subscribe({
      next: (data) => {
        this.GetRegKey();
        this.IsLoading2 = false;
        this.copyMessage()
        this.reset()
      },
    })
  }
  reset() {    
    this.listkey = [];
    this.checkTotal = 0;
  }
  TotalKey() {
    this.http.get(this.global.baseUrl + 'api/Member/TotalKey').subscribe((res: any) => {
      this.totalKey = res;
    })
  }
  GenerateKey() {    
    this.listkey = [];
    this.IsLoading = true; 
    this.http.post(this.global.baseUrl + 'api/Member/GenerateKey', this.count,{headers:this.global.headers}).subscribe({      
      next: (data:any) => {
        this.GetRegKey();
        console.log(data)  
        this.IsLoading = false;     
        this.checkTotal=this.count;
        this.listkey=data.message.split(',');
      },
      complete: () => {
       
      }
    })
  }
}
