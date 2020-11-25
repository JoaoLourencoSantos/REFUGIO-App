import { LayoutModule } from '@angular/cdk/layout';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as echarts from 'echarts';
import { CookieService } from 'ngx-cookie-service';
import { NgxEchartsModule } from 'ngx-echarts';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { EditColaboradorComponent } from './pages/colaborador/edit-colaborador/edit-colaborador.component';
import { ListColaboradorComponent } from './pages/colaborador/list-colaborador/list-colaborador.component';
import { EditEmpresaComponent } from './pages/empresa/edit-empresa/edit-empresa.component';
import { ListEmpresaComponent } from './pages/empresa/list-empresa/list-empresa.component';
import { HomeColaboradorComponent } from './pages/home/home-colaborador/home-colaborador.component';
import { HomeEmpresaComponent } from './pages/home/home-empresa/home-empresa.component';
import { LoginComponent } from './pages/login/login.component';
import { ProspeccaoColaboradorComponent } from './pages/prospeccao-colaborador/prospeccao.component';
import { ProspeccaoEmpresaComponent } from './pages/prospeccao-empresa/prospeccao.component';
import { PerfilColaboradorComponent } from './pages/colaborador/perfil-colaborador/perfil-colaborador.component';
import { PerfilEmpresaComponent } from './pages/empresa/perfil-empresa/perfil-empresa.component';

registerLocaleData(localePt, 'pt-BR');

export let maskOptions: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
	declarations: [
		AppComponent,
		MainNavComponent,
		ListColaboradorComponent,
		EditColaboradorComponent,
		ProspeccaoColaboradorComponent,
		LoginComponent,
		EditEmpresaComponent,
		ListEmpresaComponent,
		DeleteDialogComponent,
		ProspeccaoEmpresaComponent,
		HomeColaboradorComponent,
		HomeEmpresaComponent,
		PerfilColaboradorComponent,
		PerfilEmpresaComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreDevtoolsModule.instrument({ maxAge: 25 }),
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		MatMenuModule,
		MatSidenavModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatListModule,
		MatExpansionModule,
		MatIconModule,
		MatCardModule,
		MatDialogModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatListModule,
		MatButtonModule,
		NgxMaskModule.forRoot(maskOptions),
		NgxEchartsModule.forRoot({
			echarts,
		}),
		MatSnackBarModule,
		MatTableModule,
		MatPaginatorModule,
		LayoutModule,
		MatSlideToggleModule,
		MatButtonToggleModule,
		MatRadioModule,
		MatTooltipModule,
		MatStepperModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTabsModule,
	],
	providers: [CookieService, { provide: LOCALE_ID, useValue: 'pt-BR' }],
	bootstrap: [AppComponent],
})
export class AppModule {}
