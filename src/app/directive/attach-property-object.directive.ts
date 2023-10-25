import { Directive, ElementRef, Renderer2, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[attachPropertyObject]'
})
export class AttachPropertyObjectDirective {
  @Input() attachPropertyObject: any;

  constructor(private element: ElementRef, private render: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attachPropertyObject']) {
      const currelem = this.element.nativeElement;
      this.render.setProperty(currelem, 'myProperty', this.attachPropertyObject);
      //console.log('attachPropertyObject');
    }
  }

}
