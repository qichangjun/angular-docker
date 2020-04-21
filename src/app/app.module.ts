import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullComponent } from './full/full.component';
import { AppSidebarComponent } from './full/sidebar/sidebar.component';
import { ShareModule } from './share/share.module';
import { CoreModule } from './core/core.module';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UploadFileComponent } from './uploadFIle/uploadFIle.component';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
import { JwtHelperService,JWT_OPTIONS } from "@auth0/angular-jwt";
import { loginService } from './login/login.service';

declare var Cookies: any;

export function jwtOptionsFactory(_loginService:loginService) {
  return {
    tokenGetter: async () => {      
      // const helper = new JwtHelperService();
      // let isExpired = helper.isTokenExpired('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJBZG1pbkFQSSBsb2dpbiB1c2VycyIsImF1ZCI6ImFkbWluIiwibmJmIjoxNTg3MDk1MTc0LCJpc3MiOiJBZG1pbkFQSSIsImV4cCI6MTU4NzA5Mzk3NCwiaWF0IjoxNTg3MDk1MTc0LCJqdGkiOiI1NDAwYzM3OC0yYWE0LTQ5MmUtODUyYi1mNmVmN2JiNWY5NDMifQ.XE4YY55dDbecAyHPt59aNFy-sX2hvoEGk7S3X2HhL9xGJhXvIQdS8Q6Fpk5UIzWp8XYNss4_6FA0tTj6pYdDwMx1y5DWxfOTCurjHydbWYMer_gEyBVb1-1HRAUm-oeQFztTfioQvTkcQpo4I8rPp5PAhAbpnaJ0ZL15Becv1VE')
      // console.log(isExpired)
      // await _loginService.checkToken()
      return Cookies.getJSON('accessToken')  
    }
  }
}

registerLocaleData(zh);
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};
@NgModule({
  declarations: [
    AppComponent,
    AppSidebarComponent,
    FullComponent,UploadFileComponent    
    
  ],
  entryComponents:[],
  imports: [        
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ShareModule,    
    CoreModule.forRoot(),
    AppRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [loginService]
      },
         config: {
          authScheme: '',          
          whitelistedDomains: [window.location.host],  
          headerName:'accessToken'      
        }
    })
    // JwtModule.forRoot({
    //   config: {
    //     authScheme: '',
    //     tokenGetter: tokenGetter,
    //     whitelistedDomains: [window.location.host],  
    //     headerName:'accessToken'      
    //   }
    // })  
  ],
  providers: [  
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },   
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
