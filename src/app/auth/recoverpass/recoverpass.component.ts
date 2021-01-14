import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.component.html',
  styles: [
  ]
})
export class RecoverpassComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigateByUrl('/login')
  }
}
