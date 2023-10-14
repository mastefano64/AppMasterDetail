
export class KeyValuePair<J, K> {

  constructor(public key: J, public value: K) { }

}

export class KeyValuePairNum {

  constructor(public key: string, public value: number) { }

}

export class KeyValuePairStr {

  constructor(public key: string, public value: string) { }

}
