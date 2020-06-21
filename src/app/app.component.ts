import {Component} from '@angular/core';
import {StatusService} from './status.service';
import {Observable} from 'rxjs';


export class Data {
  open: number;
  close: number;
  date: string | Date;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  datas: Data[];
  dataToPlot: Data[];

  set data(status: Data[]) {
    this.datas = status;
    this.dataToPlot = this.datas.slice(0, 20);
  }

  constructor(private statusService: StatusService) {

    this.statusService.getInitialStatus()
      .subscribe(prices => {
        console.log(prices);
        this.datas = prices;

        let dataUpdateObservable =  this.statusService.getUpdates();
        dataUpdateObservable.subscribe((latestStatus: Data) => {
          this.data = [latestStatus].concat(this.datas);
        });


      });
  }
}
