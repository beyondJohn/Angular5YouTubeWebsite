import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { YoutubeModule } from 'angularx-youtube';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AwayComponent } from './away/away.component';
import { ErrormodalComponent } from './errormodal/errormodal.component';
import { IndexComponent } from './index/index.component';
import { CaptionsComponent } from './captions/captions.component';
import { ChannelsComponent } from './channels/channels.component';
import { TwitchComponent } from './twitch/twitch.component';

import { CacheFactory } from 'cachefactory';
import { ModalService } from './services/modal.service';
import { ScanService } from './services/scan.service';
import { CacheService } from './services/cache.service';
import { RunService } from './services/run.service';
import { LoginService } from './services/login.service';
import { MyHttpLogInterceptorService } from './services/my-http-log-interceptor.service';
import { WindowRef } from './services/window-ref.service';
import { TwitchPlayerService } from './services/twitch-player.service';
import { BehaviorSubjectService } from './services/behavior-subject.service';

import { Config } from './config';
import { TestSwingComponent } from './test-swing/test-swing.component';


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
    path: 'index',
    component: IndexComponent,
    data: { title: 'Index', animation: 'index' }
  },
  {
    path: 'index/:src',
    component: IndexComponent,
    data: { title: 'Index', animation: 'index' }
  },
  {
    path: 'twitch',
    component: TwitchComponent,
    data: { title: 'Twitch', animation: 'twitch' }
  },
  {
    path: 'twitch/:channel',
    component: TwitchComponent,
    data: { title: 'Twitch', animation: 'twitch' }
  },
  {
    path: 'test',
    component: TestSwingComponent,
    data: { title: 'Test', animation: 'test' }
  },
  {
    path: ':src',
    component: IndexComponent,
    data: { title: 'index' }
  },
  {
    path: "",
    redirectTo: 'index',
    pathMatch: 'full'
},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrormodalComponent,
    AwayComponent,
    IndexComponent,
    CaptionsComponent,
    ChannelsComponent,
    TwitchComponent,
    TestSwingComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes,
      {enableTracing: false, onSameUrlNavigation: 'reload'}
    ),
    NgbModule.forRoot(),
    YoutubeModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    ScanService, ModalService, NgbActiveModal, CacheFactory, CacheService, RunService
  ,LoginService, Config, HttpClient, { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptorService, multi: true }
  ,WindowRef, TwitchPlayerService, {provide: LocationStrategy, useClass: HashLocationStrategy}
  ,BehaviorSubjectService
],
  entryComponents:[ ErrormodalComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
