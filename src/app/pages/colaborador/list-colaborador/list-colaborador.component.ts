import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from 'src/app/services/toast.service';

import { EditColaboradorComponent } from '../edit-colaborador/edit-colaborador.component';
import { DeleteDialogComponent } from './../../../components/delete-dialog/delete-dialog.component';
import { ColaboradorService } from './../../../services/colaborador.service';
import { UsuarioService } from './../../../services/usuario.service';

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
		'nacionalidade',
		'dataChegadaBrasil',
		'dataNascimento',
		'entrevistado',
		'dataCriacao',
		'actions',
	];

	dataSource: MatTableDataSource<any> = new MatTableDataSource([]);

	constructor(
		public dialog: MatDialog,
		private colaboradorService: ColaboradorService,
		private userService: UsuarioService,
		private toast: ToastService
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

	openDelete(colaborador?: any) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.data = { userId: colaborador.codigoUsuario };

		const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(({ event }) => {
			if (event === 'DELETE') {
				this.deleteUser(dialogConfig.data.userId);
			}
		});
	}

	deleteUser(userId: any) {
		this.userService.deleteUser(userId).subscribe(
			(result) => {
				if (!result) {
					return;
				}

				if (!result.sucesso) {
					this.toast.errorAlertWithMessage(result.mensagem);
					return;
				}

				this.populate();

				this.toast.successAlert();
			},
			(err) => {
				if (err) {
					this.toast.errorAlertWithMessage(err.error.mensagem);
				}
			}
		);
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

	onChangeStatus(event, element) {
		const { checked } = event;
		const { codigoUsuario } = element;

		this.userService.updateStatus(checked, codigoUsuario).subscribe(
			(result) => {
				if (!result) {
					return;
				}

				if (!result.sucesso) {
					this.toast.errorAlertWithMessage(result.mensagem);
					return;
				}

				this.populate();

				this.toast.successAlert();
			},
			(err) => {
				if (err) {
					this.toast.errorAlertWithMessage(err.error.mensagem);
				}
			}
		);
	}
}
