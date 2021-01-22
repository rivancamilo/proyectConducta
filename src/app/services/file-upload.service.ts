import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;


@Injectable({
	providedIn: 'root'
})
export class FileUploadService {

	constructor() { }

	async cargarFoto(archivo:File, tipo:'usuarios'| 'pacientes', id ){
		//http://localhost:3800/api/upload/pacientes/5ffba2e826ca0c45248243e0

		try {
			const url = `${base_url}upload/${tipo}/${id}`;
			const formData = new FormData();
			formData.append('avatar', archivo );

			const resp = await fetch(url, {
				method:'PUT',
				headers:{
					'x-token': localStorage.getItem('token') || ''
				},
				body: formData
			})

			const data = await resp.json();
			if( data.ok ){
				return data.nombreArchivo
			}else{
				console.log(data.msg)
				return false;

			}



		} catch (error) {

			console.log(error);
			return false;
		}


	}




}
