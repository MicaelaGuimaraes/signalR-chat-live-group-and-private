import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatLiveComponent } from './chat-live/chat-live.component';
import { ChatPrivateComponent } from './chat-private/chat-private.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "chat-live", component: ChatLiveComponent },
  { path: "chat-private", component: ChatPrivateComponent },
  { path: "", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
