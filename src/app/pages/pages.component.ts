import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-pages',
	templateUrl: './pages.component.html',
	styles: [
	]
})
export class PagesComponent implements OnInit {




	constructor() {

	}

	ngOnInit(): void {

		//inicializamos los estilos del administrador
		const header = document.querySelector('.logo-header');
		const headerTop = document.querySelector('.navbar');
		const sidebar = document.querySelector('.sidebar');
		header.setAttribute('data-background-color', 'purple');
		headerTop.setAttribute('data-background-color', 'purple2');
		sidebar.setAttribute('data-background-color', 'white');

	}

}
