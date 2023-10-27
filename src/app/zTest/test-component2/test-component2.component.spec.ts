import { TestComponent2Component } from "./test-component2.component";

describe('AppComponent', () => {

  it('TestComponent2Component', () => {
    const component = new TestComponent2Component();

    expect(component).toBeTruthy();

    const a = 5; const b = 5;
    const total = component.add(a, b);
    expect(total).toEqual(10);
  });

});
