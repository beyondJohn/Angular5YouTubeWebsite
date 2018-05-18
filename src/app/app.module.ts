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
import { CacheService } from './services/cache.service';
import { RunService } from './services/run.service';
import { LoginService } from './services/login.service';
import { MyHttpLogInterceptorService } from './services/my-http-log-interceptor.service';
import { WindowRef } from './services/window-ref.service';
import { TwitchPlayerService } from './services/twitch-player.service';
import { BehaviorSubjectService } from './services/behavior-subject.service';
import { YoutubeService } from './services/youtube.service';
import { FileUploadService } from './services/file-upload.service';

import { Config } from './config';
import { TestSwingComponent } from './test-swing/test-swing.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { CmsComponent } from './cms/cms.component';
import { FileUploadComponent } from './file-upload/file-upload.component'; 


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
    path: 'youtube',
    component: IndexComponent,
    data: { title: 'Youtube', animation: 'youtube' }
  },
  {
    path: 'test',
    component: TestSwingComponent,
    data: { title: 'Test', animation: 'test' }
  },
  {
    path: 'cms',
    component: CmsComponent,
    data: { title: 'CMS', animation: 'cms' }
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
    TestSwingComponent,
    YoutubeComponent,
    CmsComponent,
    FileUploadComponent
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
    ModalService, NgbActiveModal, CacheFactory, CacheService, RunService
  ,LoginService, Config, HttpClient, { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptorService, multi: true }
  ,WindowRef, TwitchPlayerService, {provide: LocationStrategy, useClass: HashLocationStrategy}
  ,BehaviorSubjectService, YoutubeService, FileUploadService
],
  entryComponents:[ ErrormodalComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
