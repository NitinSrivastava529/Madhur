import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { provideRouter, RouterOutlet } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  global=inject(GlobalService)
  ngOnInit(): void {
    this.global.loadScript();
  }

}
