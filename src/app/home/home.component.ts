import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { repeat, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  price = '';
  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .sendGetRequest()
      .pipe(repeat(Infinity), take(1000))
      .subscribe((data: any) => {
        console.log(data.price);
        this.price = data.price;
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
