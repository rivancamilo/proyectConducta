import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any []= [
    { 
      tituloMenu:'', 
    }
  ]


  constructor() { }
}
