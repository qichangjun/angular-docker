import { Component, ElementRef, OnInit,OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { NavBarEventService } from '../../core/services/navBarEvent.service';
import { loginService } from '../../login/login.service';

declare var layui:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit,OnDestroy{
    public config: PerfectScrollbarConfigInterface = {};
    @ViewChild('userImg') userImg: ElementRef;
    notifications: Object[] = [{
      round: 'round-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    }, {
      round: 'round-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    }];
    userPhoto = undefined;
    userName : string = '';
    navBarStatus : boolean = true;
    ws: any
    constructor(
      private _loginService : loginService,
      private render: Renderer2,
      private _navBarEventService : NavBarEventService,
      public dialog: MatDialog,
      public _configService : ConfigService,
      public _authenticationService : AuthenticationService,
      private router : Router
    ) { }

    ngOnInit() {
      this._navBarEventService.toggleEvent$.subscribe((info)=>{
        if(info){
          this.navBarStatus = !this.navBarStatus
        }
      })     
      this.ws = this._loginService.connectSocketMessage()     
        this.ws.connect({},
            (frame)=>{                
                this.ws.subscribe(`/user/${this._authenticationService.getUnitInfo().id}/msg`,(message)=>{
                    console.log(message)              
                })
            }
        )       

    }
    ngOnDestroy(){
      // this.ws.disconnect(function(){
      //     console.log('Disconnect--------')
      // })
  }

    async logout(){
      // layui.layer.closeAll()
      this._authenticationService.removeAllStorage()      
    }
}
