import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-pages',
	templateUrl: './pages.component.html',
	styles: [
	]
})
export class PagesComponent implements OnInit {


	/* PROPIEDADES PARA EL CAMBIO DE COLOR EN EL DASHBOARD */
	public header;
	public headerTop;
	public sidebar;
	public colorHeader;
	public colorHeaderTop;
	public colorSiderbar;

	constructor() {

	}

	ngOnInit(): void {
		this.header = document.querySelector('.logo-header');
		this.headerTop = document.querySelector('.navbar');
		this.sidebar = document.querySelector('.sidebar');
		this.coloresDashBoard();	
	}


	coloresDashBoard(){
		
		const datosColorsLocal = localStorage.getItem('colors');//obtenemos los colores del localStorage
		if(datosColorsLocal === null){
			this.colorHeader = 'purple';
			this.colorHeaderTop = 'purple2';
			this.colorSiderbar = 'white';
		}else{
			const datosColors = JSON.parse(datosColorsLocal);
			this.colorHeader =  datosColors.colorHeader ;
			this.colorHeaderTop = datosColors.colorHeaderTop;
			this.colorSiderbar = datosColors.colorSiderbar;
		}

		//establecer color a elementos
		this.header.setAttribute('data-background-color', this.colorHeader);
		this.headerTop.setAttribute('data-background-color', this.colorHeaderTop );
		this.sidebar.setAttribute('data-background-color', this.colorSiderbar);
		
	}

}
