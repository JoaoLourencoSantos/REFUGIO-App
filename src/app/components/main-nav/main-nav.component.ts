import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    public breakpointObserver: BreakpointObserver,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const obj1 = {nome: "João"}
    const obj2 = {...obj1, sobrenome:"Teste", nome:"Teste"}
    console.log(obj2);
  }

  logout() {
    window.location.reload();
  }
}
