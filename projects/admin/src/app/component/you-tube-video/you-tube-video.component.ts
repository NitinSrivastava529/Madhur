import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { constant } from '../../model/constant';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-you-tube-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './you-tube-video.component.html',
  styleUrl: './you-tube-video.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class YouTubeVideoComponent implements OnInit {

  codeList: any =signal([]);
  changes=signal('-')
  http=inject(HttpClient)  
  global=inject(GlobalService)
  constructor(private sanitizer:DomSanitizer) { }
  ngOnInit(): void {
    this.GetVideo();
  }
  getUrl(code:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' +code+'/')
  }
  GetVideo() {
    this.http.get(constant.API_URL+'api/member/GetVideo').subscribe((res:any)=>{
       this.codeList.set(res);     
    })
 }
  Upload(code: string) {
     this.http.post(constant.API_URL+'api/member/AddVideo?code='+code,{},{headers:this.global.headers}).subscribe((res:any)=>{
      this.GetVideo()      
     })
  }
  Delete(code: string) {
    if(confirm('are you sure?')){    
    this.http.delete(constant.API_URL+'api/member/DeleteVideo?code='+code,{headers:this.global.headers}).subscribe((res:any)=>{
     this.GetVideo()    
    })
  }
 }
}
