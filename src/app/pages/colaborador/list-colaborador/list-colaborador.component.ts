import { ColaboradorService } from './../../../services/colaborador.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { EditColaboradorComponent } from '../edit-colaborador/edit-colaborador.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-list-colaborador',
	templateUrl: './list-colaborador.component.html',
	styleUrls: ['./list-colaborador.component.scss'],
})
export class ListColaboradorComponent implements OnInit, AfterViewInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;

	displayedColumns: string[] = [
		'nomeColaborador',
		'emailContato',
		'dataCriacao',
		'actions',
	];

	dataSource: MatTableDataSource<any> = new MatTableDataSource([]);

	constructor(
		public dialog: MatDialog,
		private colaboradorService: ColaboradorService
	) {
		this.populate();
	}

	ngOnInit(): void {}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	openNew() {
		const dialogRef = this.dialog.open(EditColaboradorComponent);

		dialogRef.afterClosed().subscribe((result) => {
			this.populate();
		});
	}

	openEdit(colaborador?: any) {
		console.log(colaborador);

		const dialogConfig = new MatDialogConfig();

		dialogConfig.data = { colaborador };

		const dialogRef = this.dialog.open(
			EditColaboradorComponent,
			dialogConfig
		);

		dialogRef.afterClosed().subscribe((result) => {
			this.populate();
		});
	}

	populate() {
		this.colaboradorService.find().subscribe((result) => {
			console.log(result);
			if (result.sucesso) {
				this.dataSource = new MatTableDataSource(result.corpo);

				this.dataSource.paginator = this.paginator;
			} else {
				this.dataSource = new MatTableDataSource([]);

				this.dataSource.paginator = this.paginator;
			}
		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
}
