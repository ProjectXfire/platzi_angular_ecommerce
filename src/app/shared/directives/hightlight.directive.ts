import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHightlight]',
})
export class HightlightDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.backgroundColor = '';
  }

  constructor(private elementRef: ElementRef) {
    // this.elementRef.nativeElement.style.backgroundColor = 'red';
  }
}
