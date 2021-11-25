import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const ALIGN_OPTIONS = ['auto', 'start', 'center', 'baseline', 'end', 'stretch'];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  alignTo = 'center';
  loading = false;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleAlignment() {
    let j = ALIGN_OPTIONS.indexOf(this.alignTo);
    this.alignTo = ALIGN_OPTIONS[(j + 1) % ALIGN_OPTIONS.length];
  }


  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['requests'])
    }, 1500);
  }

}
