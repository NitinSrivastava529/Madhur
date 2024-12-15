import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CONSTANT } from '../../Model/constant';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-kyc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kyc.component.html',
  styleUrl: './kyc.component.css'
})
export class KycComponent implements OnInit {
  response = signal('No Document Uploaded.')
  isFile:boolean=false;
  isLoading: boolean = false;
  uploadData: any = {
    'memberId': localStorage.getItem('MemberId'),
    'file': File,
    'type': 'Aadhar'
  }
  kycInfo: any;
  http = inject(HttpClient)
  global = inject(GlobalService)
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.GetKyc()
  }
  getUrl(file: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL + 'Resource/Kyc/' + file)
  }
  GetKyc() {
    this.http.get(CONSTANT.API_URL + 'api/member/GetKyc/' + localStorage.getItem('MemberId')).subscribe((res: any) => {
      this.kycInfo = res;
      if(this.kycInfo.length>0)
        this.response.set('')
      else
      this.response.set('No Document Uploaded.')
    })
  }
  onChange(event: any) {
    var size = (event.target.files[0].size / 1024);
    if (size > 200) {
      alert('upload 100 kb file only.')
      return
    }
    this.isFile=true;
    this.uploadData.file = event.target.files[0]
  }
  upload() {  
    if(!this.isFile){
      alert('Please Select File')
      return
    }
    this.response.set('Uploadeding..')
    var formData = new FormData();
    formData.append('memberId', this.uploadData.memberId);
    formData.append('file', this.uploadData.file);
    formData.append('type', this.uploadData.type);
    this.global.UploadFile('api/member/AddKyc', formData).subscribe((res) => {
      this.response.set('Uploaded Successfully.')
      this.GetKyc();
      this.isLoading = false;
    });
  }
  Delete(Id: number) {
    if (confirm('are you sure?')) {
      this.http.delete(CONSTANT.API_URL + 'api/member/DeleteKyc/' + Id, { headers: this.global.headers }).subscribe((res: any) => {
        this.GetKyc()
        this.response.set('Deleted')
      })
    }
  }
}
