import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'auth-service';

@autoinject
export class Header {    
  appTitle = "Movielist";
  isAuthenticated = false;
  
  constructor(private router: Router, private auth: AuthService) {
    this.isAuthenticated = auth.isAuthenticated();

    auth.authNotifier.on('authChange', state => {
      this.isAuthenticated = state.authenticated;
    });
  }
}
