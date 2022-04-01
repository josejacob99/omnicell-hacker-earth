import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
