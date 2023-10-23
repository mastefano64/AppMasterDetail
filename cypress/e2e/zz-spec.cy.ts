describe('zzTemplate spec', () => {
  const x = 123;

  before(() => {

  })

  it('verify1', () => {
    //cy.visit('https://example.cypress.io');

    const ret1 = add(x, 9 , 3); // 12
    expect(ret1).to.equal(12);

    const ret2 = sub(x, 9 , 3); // 6
    expect(ret2).to.equal(6);

    const ret3 = mul(x, 9 , 3); // 27
    expect(ret3).to.equal(27);

    const ret4 = div(x, 9 , 3); // 3
    expect(ret4).to.equal(3);
  })

  it('verify2', () => {
    //cy.visit('https://example.cypress.io');

    const ret1 = add(x, 9 , 3); // 12
    expect(ret1).to.equal(12);

    const ret2 = sub(x, 9 , 3); // 6
    expect(ret2).to.equal(6);

    const ret3 = mul(x, 9 , 3); // 27
    expect(ret3).to.equal(27);

    const ret4 = div(x, 9 , 3); // 3
    expect(ret4).to.equal(3);
  })
})

function add(x: number, a: number, b: number): number {
  //debugger;
  return a + b;
}

function sub(x: number, a: number, b: number): number {
  //debugger;
  return a - b;
}

function mul(x: number, a: number, b: number): number {
  //debugger;
  return a * b;
}

function div(x: number, a: number, b: number): number {
  //debugger;
  return a / b;
}
