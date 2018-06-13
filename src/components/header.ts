import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject
export class Header {    
  appTitle = "Movielist";
  
  constructor(private router: Router) {
    
  }
}
