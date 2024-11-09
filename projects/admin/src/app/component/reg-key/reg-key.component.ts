import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LiteralArray } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

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
  count = 1;
  RegKey: any = {};
  listId: any = [];
  listkey: any = [];
  global = inject(GlobalService);
  http = inject(HttpClient);
  constructor() { }
  ngOnInit(): void {
    this.GetRegKey();
  }
  GetRegKey() {
    const obj = {
      url: "api/Member/RegKeys"
    };
    this.global.get(obj).subscribe({
      next: (data) => {
        this.RegKey = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  selectKey(event: Event) {
    const isCheck = (event.target as HTMLInputElement).checked;
    const value = (event.target as HTMLInputElement).value;
    const key = (event.target as HTMLInputElement).getAttribute('key');
    if (isCheck) {
      if (!this.listId.includes(value))
        this.listId.push(value);
      this.listkey.push(key);
    } else {
      if (this.listId.includes(value))
        this.listId.splice(this.listId.indexOf(value), 1)
      this.listkey.splice(this.listkey.indexOf(key), 1)
    }   
  }
  copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.listkey.join('  ');
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  copyKey() {
    this.IsLoading2 = true;
    this.http.put(this.global.baseUrl + 'api/Member/UpdateRegKeys', this.listId).subscribe({
      next: (data) => {
        this.GetRegKey();
        this.IsLoading2 = false;
        this.copyMessage()
        this.listkey=[];
      },
    })
  }
  GenerateKey() {
    for (var i = 0; i < this.count; i++) {
      this.IsLoading = true;
      const obj = {
        url: "api/Member/GenerateKey"
      };
      this.global.get(obj).subscribe({
        next: (data) => {

        },
        complete: () => {
          if (i == this.count) {
            this.IsLoading = false;
            this.GetRegKey();
          }
        }
      })
    }
  }
}
