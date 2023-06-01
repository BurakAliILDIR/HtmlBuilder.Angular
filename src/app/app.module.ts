import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SafeHtmlPipe } from './_pipes/safe-html.pipe';
import { PreviewComponent } from './pages/preview/preview.component';
import { HeaderComponent } from './header/header.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsComponent } from './components/components.component';
import { AddComponentComponent } from './components/add-component/add-component.component';
import { RouterModule } from '@angular/router';
import { WebBuilderComponent } from './pages/web-builder/web-builder.component';
import { PreviewComponentComponent } from './components/preview-component/preview-component.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    WebBuilderComponent,
    PagesComponent,
    AddPageComponent,
    PreviewComponent,
    HeaderComponent,
    ComponentsComponent,
    AddComponentComponent,
    SafeHtmlPipe,
    PreviewComponentComponent,
    NotFoundComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
