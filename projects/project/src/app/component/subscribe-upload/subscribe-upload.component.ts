import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CONSTANT } from '../../Model/constant';
import { CompanyPlan } from '../../Model/company-plan';

@Component({
  selector: 'app-subscribe-upload',
  standalone: true,
   imports: [CommonModule, FormsModule],
  templateUrl: './subscribe-upload.component.html',
  styleUrl: './subscribe-upload.component.css'
})
export class SubscribeUploadComponent implements OnInit {
    videoList:WritableSignal<CompanyPlan[]>=signal<CompanyPlan[]>([]);
  response = signal('No Document Uploaded.')
  isFile:boolean=false;
  isLoading: boolean = false;
  uploadData: any = {
    'memberId': localStorage.getItem('MemberId'),
    'file': File,
    'type': 'subscribe'
  }
  kycInfo: any;
  http = inject(HttpClient)
  global = inject(GlobalService)
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.GetKyc()
    this.GetVideo()
  }
  getVideoUrl(code: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + code);
  }
  getUrl(file: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL + 'Resource/Kyc/' + file)
  }
  GetVideo() {
    this.http.get(CONSTANT.API_URL + 'api/member/GetPlan?type=Youtube').subscribe((res: any) => {     
      this.videoList.set([res[0]]);       
    })
  }
  GetKyc() {
    this.http.get(CONSTANT.API_URL + 'api/member/GetKyc/' + localStorage.getItem('MemberId')).subscribe((res: any) => {      
      this.kycInfo =res;
      if(this.kycInfo.length>0)
        this.response.set('')
      else
      this.response.set('No Document Uploaded.')
    })
  }
  onChange(event: any) {
    var size = (event.target.files[0].size / 1024);
    // if (size > 200) {
    //   alert('upload 100 kb file only.')
    //   return
    // }
    this.isFile=true;
    this.uploadData.file = event.target.files[0]
  }
  upload() {  
    if(!this.isFile){
      alert('Please Select File')
      return
    }
    this.response.set('Uploading..')
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