import { Component, OnInit,ElementRef } from '@angular/core';
import { loginService } from './login.service';
import { AuthenticationService } from '../core/services/auth.service';
declare let CryptoJS: any;
declare var Cookies: any;
declare var $: any;
declare var layim : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  checkCode: any
  focusInput: any = ''
  verify: any
  hint: boolean = false
  model = {
    username: '',
    password: '',
    verification: ''
  }
  nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]
  str: any
  constructor(        
    private _loginService: loginService,
    private _authenticationService: AuthenticationService,
    private el: ElementRef
  ) { }

  ngOnInit() {  
     
    window.localStorage.clear()
    Cookies.remove('accessToken')
    this.drawCode()
  }

  encrypt(word) {
    let key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
  }

  isActived(el){
    return el == document.activeElement
  }

  async login() {
    if (this.model.verification.toLowerCase() == this.checkCode.toLowerCase()) {
      this.hint = false
      try {
        this.loading = true
        let model = Object.assign({}, this.model)
        model.password = this.encrypt(model.password)
        let res = await this._loginService.login(model)
        this.loading = false
        this._authenticationService.saveLoginToken(res)   
      } catch (err) {
        this.loading = false
        return
      }
    } else {
      this.hint = true
      this.checkCode=''
      this.verify = '验证码有误请重新输入'
      this.drawCode()
    }
  }

  drawCode(str?) {
    document.getElementById('verifyCanvas').remove();//每次更新验证码都要移除canvas，然后再进行重绘
    var box = this.el.nativeElement.querySelector('#code');
    var p1 = this.el.nativeElement.querySelector('#code_img');

    var p0 = document.createElement('canvas');//创建canvas节点
    p0.id = 'verifyCanvas';//定义canvas id

    box.insertBefore(p0, p1);//将canvas节点插入到img节点前面
    p0.width = 85;//设置画布宽度
    p0.height = 30;//设置画布高度
    var canvas = this.el.nativeElement.querySelector('#verifyCanvas'); //获取HTML端画布
    var context = canvas.getContext("2d"); //获取画布2D上下文环境
    context.fillStyle = "#fff"; //画布填充色
    context.fillRect(0, 0, canvas.width, canvas.height); //清空画布
    context.fillStyle = "#800000"; //设置字体颜色
    context.font = "18px Arial"; //设置字体
    var rand = new Array();
    var x = new Array();
    var y = new Array();
    let showValue = ''
    for (let i = 0; i < 4; i++) {
      rand.push(rand[i]);
      rand[i] = this.nums[Math.floor(Math.random() * this.nums.length)];//在数组中随机取一个值
      showValue += rand[i]
      x[i] = i * 20 + 10;
      y[i] = Math.random() * 20 + 12;
      context.fillText(rand[i], x[i], y[i]);//设置文本在画布中显示的位置
    }
    this.checkCode = showValue
    this.str = rand.join('').toUpperCase();//将验证码的值中小写字母转为大写
    //画3条随机线
    for (var i = 0; i < 3; i++) {
      this.drawline(canvas, context);
    }

    // 画30个随机点
    for (var i = 0; i < 30; i++) {
      this.drawDot(canvas, context);
    }
    this.convertCanvasToImage(canvas);
    return this.str;
  }
  // 随机线
  drawline(canvas, context) {
    context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
    context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
    context.lineWidth = 0.5; //随机线宽
    context.strokeStyle = 'rgba(50,50,50,0.3)'; //随机线描边属性
    context.stroke(); //描边，即起点描到终点
  }
  // 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
  drawDot(canvas, context) {
    var px = Math.floor(Math.random() * canvas.width);
    var py = Math.floor(Math.random() * canvas.height);
    context.moveTo(px, py);
    context.lineTo(px + 1, py + 1);
    context.lineWidth = 0.2;
    context.stroke();

  }
  // 绘制图片
  convertCanvasToImage(canvas) {
    this.el.nativeElement.querySelector('#verifyCanvas').style.display = "none";
    var image = this.el.nativeElement.querySelector('#code_img');
    image.src = canvas.toDataURL("image/png");//画布转成图片地址
    return image;//返回图片对象


  }
}
