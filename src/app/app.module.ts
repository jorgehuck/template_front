import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Components
import { FlexModule } from '@angular/flex-layout/flex';
import { GridModule } from '@angular/flex-layout/grid';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppInterceptor } from './core/app.interceptor';

import { SpinnerModule } from './components/spinner/spinner.module';

import { ToastrModule } from 'ngx-toastr';
import { PipesModule } from './pipes/pipes.module';
import { DialogsModule } from './components/dialogs/dialogs.module';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RichTextEditorModule,
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexModule,
    GridModule,
    FlexLayoutModule,
    HttpClientModule,
    SpinnerModule,
    ToastrModule.forRoot(),
    PipesModule,
    DialogsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
