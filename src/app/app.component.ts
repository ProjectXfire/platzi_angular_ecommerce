import { Component, OnInit } from '@angular/core';
// Services
import { FilesService } from '@services/files/files.service';
import { TokenService } from '@services/token/token.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private filesService: FilesService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    const signed = this.tokenService.existToken();
    if (signed) {
      this.authService.profile().subscribe();
    }
  }

  downloadPDF() {
    this.filesService
      .getFile(
        'archivo.pdf',
        'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
        'application/pdf'
      )
      .subscribe();
  }
  uploadFile(e: Event) {
    const element = e.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file).subscribe((res) => console.log(res));
    }
  }
}
