import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { EventService } from '../core/services/event.service';

export const slidFromBottomAnimation =
  trigger('routeAnimation',[
    state('in', style({opacity: 1, transform: 'translateY(-100%)'})),
    transition('void => *', [
      style({
        transform: 'translateY(0)'
      }),
      animate('3s ease-out')
    ])
]);

@Component({
  templateUrl: './uploadFIle.component.html',
  styleUrls : ['./uploadFIle.component.scss'],
  animations: [ slidFromBottomAnimation ]
})
export class UploadFileComponent implements AfterViewInit,OnInit,OnDestroy{
  uploader : any = {};
  selectTotal : number = 0;
  selectSuccessTotal : number = 0;
  docbase : string;
  parameter : any = {}
  routeSub : any;
  eventSub : any;
  querySub : any;
  saveFiles : Array<any> = [];
  showUploadContainer : boolean;
  parentId : string;
  uploaders : any = []
  constructor(
    public snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private _EventService : EventService,
  ) {}

  ngOnInit(){
    this.querySub = this.route.queryParams.subscribe(params => {
      this.parameter = Object.assign({},params)
    })
    this.eventSub = this._EventService.toggleEvent$.subscribe(uploader => {
      //if there is no uploader Object,just return
      if (!uploader){
          return 
      }
      // type of select upload
      if (uploader.type == 'select'){
        // make sure this is the first time to init `this.uploader`
        if (this.uploaders.indexOf(uploader.value) == -1){
          this.uploaders.push(uploader.value)
          //init onSuccessItem & onBeforeUploadItem method of uploader          
          // this.uploader = uploader.value;          
        }
        //init `selectTotal` with uploader's files's length
        // this.selectTotal = this.uploader.queue.length;
        this.selectSuccessTotal = 0;
        this.uploaders.forEach(c=>{
          this.selectTotal = this.selectTotal + c.queue.length
          for (let i = 0;i < c.queue.length;i++){          
            //for there is some files has finished upload before this render
            if (c.queue[i].isSuccess){
              this.selectSuccessTotal++
            }
          }
        })                
      }
    });
  }

  closePopup() {
    this.router.navigate([{ outlets: { uploadFile: null }}],{preserveQueryParams: true});
  }

  ngAfterViewInit(){
  
  }

  ngOnDestroy(){
    // this.routeSub.unsubscribe()
    this.eventSub.unsubscribe()
    this.querySub.unsubscribe()
  }

  removeAllFiles(){
    this.uploaders.forEach(c=>{
      c.clearQueue()
    })
    // if (this.uploader && this.uploader.queue && this.uploader.queue.length > 0){
    //   this.uploader.clearQueue()
    // }
    this.uploaders = []
    this.selectTotal = 0;
  }

  toggleWindow(){
    this.showUploadContainer = !this.showUploadContainer
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }
}

