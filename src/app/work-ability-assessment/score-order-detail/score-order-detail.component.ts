import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ScoreOrderDetailService } from './score-order-detail.service';
import { AuthenticationService } from '../../core/services/auth.service';

declare var Highcharts: any;
@Component({
  selector: 'app-score-order-detail',
  templateUrl: './score-order-detail.component.html',
  styleUrls: ['./score-order-detail.component.scss']
})
export class ScoreOrderDetailComponent implements OnInit {
  queryParamsSubscription : any
  parameter : {
    unitId? :　string
  } = {
    
  }
  SumQusetScore : {
    questsum?: number,
    unitName? : string,
    rank?: number
  } = {}
  pieInfoLists : any = [   
  ]
  grpScoreInfo : any = []
  constructor(
    private _AuthenticationService : AuthenticationService,
    private _ScoreOrderDetailService : ScoreOrderDetailService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.parameter = Object.assign(this.parameter, params)
      if(!this.parameter.unitId){
        this.parameter.unitId = this._AuthenticationService.getUnitInfo().id         
      }
      this.getSumquestscoreByUnitid()
      this.getAvgScoreInfo()
      this.getLevelRankByUnitId()
    })
   }

  ngOnInit() {
  }

  async getLevelRankByUnitId(){
    let res = await this._ScoreOrderDetailService.getQuestLevelRankByUnitId(this.parameter.unitId)    
    this.pieInfoLists = res    
    this.initPieChart()
  }

  async getSumquestscoreByUnitid(){
    let res = await this._ScoreOrderDetailService.getSumquestscoreByUnitid(this.parameter.unitId)
    this.SumQusetScore.questsum = parseInt(res.questsum)
    this.SumQusetScore.rank = res.rank
    this.SumQusetScore.unitName = res.unitName
  }

  async getAvgScoreInfo(){
    let res = await this._ScoreOrderDetailService.getAvgScoreInfo(this.parameter.unitId)
    this.grpScoreInfo = res
    this.initAbilityChart(this.grpScoreInfo)
    
  }

  initPieChart(){
    let data = this.pieInfoLists.map(c=>{
      return {name:c.dict_name,y:c.count}
    })
    Highcharts.chart('pie_container', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },      
      title: {
          text: ''
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
   
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
              },
              size:"75%",
              showInLegend: true
          }
      },
      series: [{
          name: '',
          colorByPoint: true,
          data: data
      }],     
      credits : {
        enabled : false
      }
  });
  }

  initAbilityChart(info){
    let categories = info.map(c=>c.grpName)
    let data = info.map(c=>c.sum)
    var chart = Highcharts.chart('container', {
      chart: {
        polar: true,
        type: 'area'
      },  
      title: {
        text: '',
        x: -80
      },
      pane: {
        size: '80%'
      },
      plotOptions : {
        line : {
          dashStyle : 'area'
        }
      },
      xAxis: {
        categories: categories,
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        ceiling: 100,
        min: 0
      },
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}分</b><br/>'
      },
      legend: {
        enabled : false,
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
      },
      series: [{
        name: '',
        data: data,
        pointPlacement: 'on'
      }],
      credits : {
        enabled : false
      }
    });
  }
}
