import { ToastService } from './../../services/toast.service';
import { TipoUsuario } from './../../models/enums/tipo-usuario';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-prospeccao',
  templateUrl: './prospeccao.component.html',
  styleUrls: ['./prospeccao.component.scss'],
})
export class ProspeccaoComponent implements OnInit {
  nome: string = '';
  email: string = '';
  tipo: string = '';

  constructor(private toast: ToastService) {}

  ngOnInit(): void {}

  send() {
    this.validate();
  }

  validate() {
    if (!this.nome || !this.email || this.tipo) {
      this.toast.infoErroAlert();
      return;
    }
    this.toast.successAlert();
  }
}
