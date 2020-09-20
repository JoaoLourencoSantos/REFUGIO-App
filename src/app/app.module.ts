import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as echarts from 'echarts';
import { CookieService } from 'ngx-cookie-service';
import { NgxEchartsModule } from 'ngx-echarts';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ListColaboradorComponent } from './pages/colaborador/list-colaborador/list-colaborador.component';
import { EditColaboradorComponent } from './pages/colaborador/edit-colaborador/edit-colaborador.component';
import { ProspeccaoComponent } from './pages/prospeccao/prospeccao.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './pages/login/login.component';
import { MatTooltipModule } from '@angular/material/tooltip';

export let maskOptions: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		MainNavComponent,
		ListColaboradorComponent,
		EditColaboradorComponent,
		ProspeccaoComponent,
		LoginComponent,
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
	],
	providers: [CookieService],
	bootstrap: [AppComponent],
})
export class AppModule {}
