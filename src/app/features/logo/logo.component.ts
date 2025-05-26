import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent implements OnInit {

showSplash = true;

constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showSplash = false;
      this.router.navigateByUrl('/who');
    }, 3000); // Hide splash after 3 seconds
  }
}
