import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  imports: [RouterLink],
  templateUrl: './sign-in-page.html',
  styleUrls: ['../../../../shared/styles/page-shared.css', './sign-in-page.css'],
})
export class SignInPage {
  onGoogleSignIn() {
    // TODO: wire up Google sign-in (for example Firebase Auth or Google Identity Services)
  }
}
