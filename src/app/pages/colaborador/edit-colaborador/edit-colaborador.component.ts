import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-colaborador',
  templateUrl: './edit-colaborador.component.html',
  styleUrls: ['./edit-colaborador.component.scss'],
})
export class EditColaboradorComponent implements OnInit {
  nome: string;
  email: string;
  senha: string;

  constructor() {}

  ngOnInit(): void {}

  send(): void {}
}
