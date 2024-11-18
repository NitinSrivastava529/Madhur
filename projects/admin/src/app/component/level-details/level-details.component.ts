import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-level-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './level-details.component.html',
  styleUrl: './level-details.component.css'
})
export class LevelDetailsComponent implements OnInit {
  levelIncome: any = [];
  levelInfo: any = [];
  _level:any;
  IsLoading: boolean = false;
  IsLoadingRewad: boolean = false;
  global = inject(GlobalService);
  _http = inject(HttpClient);
  reward:any= {
    'AutoId': 0,
    'MemberId': "-",
    'level': '0',
    'Remark': "",
    'file_path':File
  }
  level: any = [];
  rewardData:any;
  ngOnInit(): void {
    this.LevelReport();
  }
  changeFile(event: any) {
    this.reward.file_path = event.target.files[0];
    console.log(event.target.files[0])
  }
  SaveReward() {
    console.log(this.reward);
    this.IsLoadingRewad = true;
    var formData = new FormData();    
    formData.append('AutoId', this.reward.AutoId);
    formData.append('MemberId', this.reward.MemberId);
    formData.append('level', this.reward.level);
    formData.append('Remark', this.reward.Remark);
    formData.append('file_path',this.reward.file_path);    

    this.global.UploadFile('api/Member/AddReward', formData).subscribe((res) => {
      console.log(res);
      this.IsLoadingRewad = false;
      for (var r in this.reward) delete this.reward[r];          
    })
  }
  LevelReport() {
    this._http.get(this.global.baseUrl + 'api/Member/LevelReport', {}).subscribe({
      next: (data) => {
        this.level = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  LevelWiseMember(level: string) {
    this._level=level;
    this.IsLoading = true;
    this._http.get(this.global.baseUrl + 'api/Member/LevelWiseMember?level=' + level, {}).subscribe({
      next: (data) => {
        this.levelInfo = data;
        this.IsLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  GetReward(memberId:string) {    
    this.IsLoading = true;
    this._http.get(this.global.baseUrl + 'api/Member/GetReward?MemberId=' + memberId, {}).subscribe({
      next: (data) => {
        console.log(data)
        this.levelIncome = data;
        this.IsLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
