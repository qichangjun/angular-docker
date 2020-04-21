import { Component, OnInit,OnDestroy } from '@angular/core';
import { ScoreOrderService } from '../score-order/score-order.service';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-assessment-symbol',
  templateUrl: './assessment-symbol.component.html',
  styleUrls: ['./assessment-symbol.component.scss']
})
export class AssessmentSymbolComponent implements OnInit ,OnDestroy{
  unitStatisticsInfo : any = ''
  eventSub : any 
  constructor(
    private _EventService : EventService,
    private _ScoreOrderService : ScoreOrderService
  ) { }

  ngOnDestroy(){
    this.eventSub.unsubscribe()
  }

  ngOnInit() {
    this.eventSub = this._EventService.toggleEvent$.subscribe(update => {
      if(update && update.type == 'quest'){
        this.getUnitNumberInfoQuest()
      }
    })
    this.getUnitNumberInfoQuest()
  }

  async getUnitNumberInfoQuest(){    
    let res = await this._ScoreOrderService.getUnitNumberInfo('QUEST')      
    this.unitStatisticsInfo = res.SUBMIT_NUM  
  }

}
