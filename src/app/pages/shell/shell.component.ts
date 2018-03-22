import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChange
} from '@angular/core';
import { Subscription } from 'rxjs';

import { WebSocketService, ShellService } from '../../services/';
import { TranslateService } from '@ngx-translate/core';
import {TooltipComponent} from '../common/entity/entity-form/components/tooltip/tooltip.component';
import { T } from '../../translate-marker';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  providers: [ShellService],
})

export class ShellComponent implements OnInit, OnChanges {
  // sets the shell prompt
  @Input() prompt: string = '';
  //xter container
  @ViewChild('terminal') container: ElementRef;
  // xterm variables
  cols: string;
  rows: string;
  font_size: number;
  public token: any;
  public xterm: any;
  public resize_terminal: boolean = true;
  private shellSubscription: any;

  public shell_tooltip = T('Copy/paste with <b>Ctrl + C/V</b> or\
   <b>Command + C/V</b>.<br>\
   Many utilities are built-in, including:<br>\
   <b>Iperf</b>, <b>Netperf</b>, <b>IOzone</b>, <b>arcsat</b>,\
   <b>tw_cli</b>, <b>MegaCli</b>,<b>freenas-debug</b>,<b>tmux</b>,\
   and <b>Dmidecode</b>. See the <b>Guide > Command Line Utilities</b>\
   chapter for more information.');

  clearLine = "\u001b[2K\r"

  ngOnInit() {
    this.getAuthToken().subscribe((res) => {
      this.initializeWebShell(res);
      this.shellSubscription = this.ss.shellOutput.subscribe((value) => {
        if (value !== undefined) {
          this.xterm.write(value);
        }
      });
      this.initializeTerminal();
    });
  }

  ngOnDestroy() {
    if(this.shellSubscription){
      this.shellSubscription.unsubscribe();
    }
  };

  onResize(event){
    this.resizeTerm();
  }

  resetDefault() {
    this.font_size = 14;
  }

  ngOnChanges(changes: {
    [propKey: string]: SimpleChange
  }) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      // reprint prompt
      if (propName == 'prompt' && this.xterm != null) {
        this.xterm.write(this.clearLine + this.prompt)
      }
    }
  }

  initializeTerminal() {
    let domHeight = document.body.offsetHeight;
    let domWidth = document.body.offsetWidth;
    let colNum = (domWidth * 0.75 - 104) / 10;
    if (colNum < 80) {
      colNum = 80;
    }
    let rowNum = (domHeight * 0.75 - 104) / 21;
    if (rowNum < 10) {
      rowNum = 10;
    }

    this.xterm = new (<any>window).Terminal({
      'cursorBlink': false,
      'tabStopWidth': 8,
      'cols': parseInt(colNum.toFixed()),
      'rows': parseInt(rowNum.toFixed()),
      'focus': true
    });
    this.xterm.open(this.container.nativeElement);
    this.xterm.attach(this.ss);
    this.xterm._initialized = true;
  }

  resizeTerm(){
    let domHeight = document.body.offsetHeight;
    let domWidth = document.body.offsetWidth;
    let colNum = (domWidth * 0.75 - 104) / 10;
    if (colNum < 80) {
      colNum = 80;
    }
    let rowNum = (domHeight * 0.75 - 104) / 21;
    if (rowNum < 10) {
      rowNum = 10;
    }
    this.xterm.resize(colNum,rowNum);
    return true;
  }

  initializeWebShell(res: string) {
    this.ss.token = res;
    this.ss.connect();
  }

  getAuthToken() {
    return this.ws.call('auth.generate_token');
  }

  constructor(private ws: WebSocketService, public ss: ShellService, public translate: TranslateService) {}
}
