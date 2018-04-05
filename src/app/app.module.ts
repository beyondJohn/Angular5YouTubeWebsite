import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './services/modal.service';
import { ErrormodalComponent } from './errormodal/errormodal.component';
import { ScanService } from './services/scan.service';
import { AwayComponent } from './away/away.component';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home', animation: 'home' }
  },
  {
    path: 'away',
    component: AwayComponent,
    data: { title: 'Away', animation: 'away' }
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
    ErrormodalComponent,
    AwayComponent
  ],
  imports: [
    BrowserAnimationsModule,
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
