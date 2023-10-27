import { Component } from '@angular/core';

@Component({
  selector: 'app-test-component2',
  templateUrl: './test-component2.component.html',
  styleUrls: ['./test-component2.component.scss']
})
export class TestComponent2Component {

  constructor() {}

  add(a: number, b: number) {
    return a + b;
  }

}
