import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { configInterceptor } from './core/interceptors/config.interceptor';
import { TrackInfoDialogComponent } from './core/shared-components/track-info-dialog/track-info-dialog.component';
import { TrackUpdateInfoDialogComponent } from './core/shared-components/track-update-info-dialog/track-update-info-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TrackCreateItemDialogComponent } from './core/shared-components/track-create-item-dialog/track-create-item-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrackInfoDialogComponent,
    TrackUpdateInfoDialogComponent,
    TrackCreateItemDialogComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSortModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([configInterceptor]) 
    )
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
