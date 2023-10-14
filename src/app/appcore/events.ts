
//
// https://keestalkstech.com/2016/03/strongly-typed-event-handlers-in-typescript-part-1/
//

export interface IEvent<TSender, TArgs> {
  subscribe(a1: any, a2: (sender: TSender, args: TArgs) => void): void;
  unsubscribe(a1: any, a2: (sender: TSender, args: TArgs) => void): void;
}

export class EventDispatcher<TSender, TArgs> implements IEvent<TSender, TArgs> {
  private _subscriptions: Array<{ a1: any, a2: (sender: TSender, args: TArgs) => void }> =
    new Array<{ a1: any, a2: (sender: TSender, args: TArgs) => void }>();

  subscribe(a1: any, a2: (sender: TSender, args: TArgs) => void): void {
    let value = { a1: a1, a2: a2 }
    if (value) {
      this._subscriptions.push(value);
    }
  }

  unsubscribe(a1: any, a2: (sender: TSender, args: TArgs) => void): void {
    let value = { a1: a1, a2: a2 }
    let i = this._subscriptions.indexOf(value);
    if (i > -1) {
      this._subscriptions.splice(i, 1);
    }
  }

  dispatch(sender: TSender, args: TArgs): void {
    for (let handler of this._subscriptions) {
      handler.a2.call(handler.a1, sender, args);
    }
  }

  dispose(): void {
    this._subscriptions = [];
  }
}
