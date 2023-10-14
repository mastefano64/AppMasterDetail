import { Component , ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';
//import { ControlContainer, NgForm } from '@angular/forms';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-masterinputsearch',
  templateUrl: './master-input-search.component.html',
  styleUrls: ['./master-input-search.component.scss']
  //viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class MasterInputSearchComponent implements AfterViewInit, OnDestroy {
  @ViewChild('search') search: ElementRef;
  @Input() name = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() minlenght = 3;
  @Input() debouncetime = 800;
  @Input() value = '';
  @Output() changetext = new EventEmitter<string>();
  sub: Subscription;

  constructor() { }

  ngAfterViewInit(): void {
    this.sub = fromEvent(this.search?.nativeElement, 'keyup').pipe(
      map((event: any) => (event.target as HTMLInputElement).value.trim()),
      filter(text => text.length === 0 || text.length >= this.minlenght),
      debounceTime(this.debouncetime),
      distinctUntilChanged(),
    ).subscribe((value: string) => {
      this.changetext.emit(value);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
