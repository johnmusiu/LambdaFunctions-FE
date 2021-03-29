import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { ApiService } from '../api.service';
import { flatMap, repeat } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterContentInit {
  price = '';
  loading = false;
  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
    this.apiService
      .sendGetRequest()
      // .pipe()
      .subscribe((data: any) => {
        console.log(data.price);
        this.price = data.price;
        this.loading = false;
      });
  }

  ngAfterContentInit() {
    interval(60 * 1000)
      .pipe(flatMap(() => this.apiService.sendGetRequest()))
      .subscribe((data: any) => {
        console.log(data.price);
        this.price = data.price;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
