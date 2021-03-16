import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, ActivationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styles: [
	]
})
export class BreadcrumbsComponent implements  OnDestroy {

	public titulo:string = '';
	public tituloSubs$:Subscription;

	constructor(private router: Router) {
		
		this.tituloSubs$ = this.getParametros().subscribe(({ titulo }) => {
			this.titulo = titulo;
			document.title = `UCC | ${titulo}`;
		})
	}

	ngOnDestroy(): void {
		this.tituloSubs$.unsubscribe();
	}

	getParametros(){
		return this.router.events.pipe(
			filter(evet => evet instanceof ActivationEnd),
			filter((event2: ActivationEnd) => event2.snapshot.firstChild === null),
			map((event2: ActivationEnd) => event2.snapshot.data)
		)
	}


}
