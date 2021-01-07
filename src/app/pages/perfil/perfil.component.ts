import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: [
		'./perfil.component.css'
	]
})
export class PerfilComponent implements OnInit {

	public header = document.querySelector('.logo-header');
	public headerTop = document.querySelector('.navbar');
	public sidebar = document.querySelector('.sidebar');
	public body = document.querySelector('#colorBody');

	constructor() { }

	ngOnInit(): void {
	}


	cambioColorHeader(color: string) {
		this.header.setAttribute('data-background-color', color);
	}
	cambioColorHeaderT(color: string) {
		this.headerTop.setAttribute('data-background-color', color);
	}

	cambioSidebar(color: string){
		this.sidebar.setAttribute('data-background-color', color);
	}

	cambioBody( color: string ){
		this.body.setAttribute('data-background-color', color);
	}

}
