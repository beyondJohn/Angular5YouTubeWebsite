import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './services/modal.service';
import { ErrormodalComponent } from './errormodal/errormodal.component';
import { ScanService } from './services/scan.service';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' }
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrormodalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,
      {enableTracing: false}
    ),
    NgbModule.forRoot()
  ],
  providers: [ScanService, ModalService, NgbActiveModal],
  entryComponents:[ ErrormodalComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
