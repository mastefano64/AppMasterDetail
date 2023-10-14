export type NavbarPagingAction = 'first' | 'prev' | 'next' | 'last' | 'cellpage';

export class NavbarPagingArgs {

  constructor(public action: NavbarPagingAction, public page: number) { }

}
