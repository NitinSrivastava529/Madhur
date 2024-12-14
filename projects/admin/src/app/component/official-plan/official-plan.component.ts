import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { constant } from '../../model/constant';
import { GlobalService } from '../../services/global.service';
import { CONSTANT } from '../../../../../project/src/app/Model/constant';

@Component({
  selector: 'app-official-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './official-plan.component.html',
  styleUrl: './official-plan.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class OfficialPlanComponent implements OnInit {
  uploadData: any = {
    'file': File,
    'type': '-'
  }
  file_path: any;
  isLoading:boolean=false;
  videoList: any = [];
  pdfList: any = [];
  changes = signal('-');
  http = inject(HttpClient)
  global = inject(GlobalService)
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.GetVideo();
    this.GetPdf();
  }
  getUrl(code: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + code + '/')
  }
  getImgUrl(file: string) {
    return constant.API_URL+'Resource/Plan/' + file;
   // return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL+'/Resource/Plan/' + file);
  }
  getPdfUrl(code: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL + 'Resource/Plan/' + code)
  }
  GetVideo() {
    this.http.get(constant.API_URL + 'api/member/GetPlan?type=Youtube').subscribe((res: any) => {
      this.videoList = res;      
    })
  }
  GetPdf() {
    this.http.get(constant.API_URL + 'api/member/GetPlan?type=Pdf').subscribe((res: any) => {
      this.pdfList = res;
    })
  }
  upload(type: string) {
    this.isLoading=true;
    var formData = new FormData();
    formData.append('file', this.uploadData.file);
    formData.append('type', type);
    this.global.UploadFile('api/member/AddPlan', formData).subscribe((res)=> {     
      if (type == 'Youtube')
        this.GetVideo()
      else
        this.GetPdf()
      this.changes.set('Uploaded')
      this.isLoading=false;
    });

  }
  Delete(Id: number) {
    if (confirm('are you sure?')) {
      this.http.delete(constant.API_URL + 'api/member/DeletePlan?Id=' + Id, { headers: this.global.headers }).subscribe((res: any) => {
        this.GetVideo()
        this.GetPdf()
        this.changes.set('Deleted')
      })
    }
  }
  changeFile(event: any) {
    this.uploadData.file = event.target.files[0];
  }
}
