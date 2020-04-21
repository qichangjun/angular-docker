import { Directive, ElementRef, Input,HostListener,OnInit,OnChanges,SimpleChange } from '@angular/core';
import { AuthenticationService } from '../../core/services/auth.service';

@Directive({ selector: '[ButtonPermissionController]' })
export class ButtonPermissionControllerDirective implements OnInit,OnChanges{
  @Input() buttonId: string | Array<string>;
  constructor(
      private _authenticationService : AuthenticationService,
      private el: ElementRef) {}
  ngOnInit(){   
    if (!this.buttonId)   {
      return 
    }
    if (Array.isArray(this.buttonId)){
      let isShow = false 
      this.buttonId.forEach(buttonId=>{
        if (this._authenticationService.getPermissionList().permissionSet.find(c=>c.code == buttonId)){
          isShow = true 
          return 
        }
      })
      if (!isShow){
        this.el.nativeElement.style.display = 'none'  
      }
    }else if (typeof this.buttonId == 'string'){
      if (this._authenticationService.getPermissionList().permissionSet.find(c=>c.code == this.buttonId)){
        return 
      }else{      
        this.el.nativeElement.style.display = 'none'  
      }  
    }else{      
      this.el.nativeElement.style.display = 'none'  
    }        
  }
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
   
  }
}
