import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { SearchModalComponent } from './../search-modal/search-modal.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
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

  logout() {
    document.cookie =
      '_construo-backoffice_=; expires = Thu, 01 Jan 1970 00:00:00 UTC';
    window.location.reload();
  }

  openModal() {
    const dialogRef = this.dialog.open(SearchModalComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
