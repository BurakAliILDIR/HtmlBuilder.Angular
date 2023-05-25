import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EmailConfirmationComponent } from './auth/email-confirmation/email-confirmation.component';
import { WebBuilderComponent } from './web-builder/web-builder.component';
import { PagesComponent } from './pages/pages.component';
import { FindPageResolver } from './_resolvers/pages.resolver';
import { PreviewComponent } from './preview/preview.component';
import { AuthGuard } from './_guards/auth.guard';
import { unauthGuard } from './_guards/unauth.guard';
import { AddPageComponent } from './pages/add-page/add-page.component';

const routes: Routes = [
  { path: "", redirectTo: "pages", pathMatch: "full" },
  {
    path: "", children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
      { path: "reset-password", component: ResetPasswordComponent },
      { path: "email-confirmation", component: EmailConfirmationComponent },
    ], canActivate: [unauthGuard]
  },
  {
    path: "", children: [
      { path: "web-builder/:id", component: WebBuilderComponent, resolve: { findPage: FindPageResolver } },
      { path: "preview/:id", component: PreviewComponent, resolve: { findPage: FindPageResolver } },
      { path: "pages", component: PagesComponent },
      { path: "pages/add", component: AddPageComponent },
    ], canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
