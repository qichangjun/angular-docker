import { Component,OnInit,Input,OnChanges,SimpleChange,Output,EventEmitter,ElementRef } from '@angular/core';
import { style, state } from '@angular/animations';

@Component({
  selector: 'loading-message',
  templateUrl: './loadingMessage.component.html',
  styleUrls: ['./loadingMessage.component.scss'],
})
export class LoadingMessageComponent implements OnInit{
  @Input() message : string;
  constructor(private el: ElementRef) {}

  ngOnInit(){    
    this.el.nativeElement.style.width = this.el.nativeElement.parentNode.style.width
    this.el.nativeElement.style.height = this.el.nativeElement.parentNode.style.height    
  }
}
