import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {
  img: string = '';
  @Input() set changeImg(newImg: string) {
    this.img = newImg;
  }
  imgDefault = './assets/images/default.png';
  @Output() loaded = new EventEmitter<string>();

  constructor() {}

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    this.loaded.emit(this.img);
  }
}
