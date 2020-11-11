import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { EditEmpresaComponent } from '../edit-empresa/edit-empresa.component';
import { DeleteDialogComponent } from './../../../components/delete-dialog/delete-dialog.component';
import { EmpresaService } from './../../../services/empresa.service';

@Component({
	selector: 'app-list-empresa',
	templateUrl: './list-empresa.component.html',
	styleUrls: ['./list-empresa.component.scss'],
})
export class ListEmpresaComponent implements OnInit, AfterViewInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;

	displayedColumns: string[] = [
		'razaoSocial',
		'emailContato',
		'cnpj',
		'numeroFuncionarios',
		'dataFundacao',
		'entrevistado',
		'dataCriacao',
		'actions',
	];

	dataSource: MatTableDataSource<any> = new MatTableDataSource([]);

	constructor(
		public dialog: MatDialog,
		private empresaService: EmpresaService,
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
		const dialogRef = this.dialog.open(EditEmpresaComponent);

		dialogRef.afterClosed().subscribe((result) => {
			this.populate();
		});
	}

	openEdit(empresa?: any) {
		console.log(empresa);

		const dialogConfig = new MatDialogConfig();

		dialogConfig.data = { empresa };

		const dialogRef = this.dialog.open(EditEmpresaComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((result) => {
			this.populate();
		});
	}

	populate() {
		this.empresaService.find().subscribe((result) => {
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
}
