import { autoinject, bindable } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from "aurelia-router";

@autoinject
export class Search {

  @bindable searchTerm: string

  constructor(private router: Router, private events: EventAggregator) {
    this.events.subscribe('router:navigation:success', r => {      
      if (r.instruction.config.name === 'search') {
        this.searchTerm = r.instruction.params.term;
      }
    });
  }

  doSearch() {
    if (this.searchTerm && this.searchTerm! + "") {
      this.router.navigate(`search/${this.searchTerm}`);
    }
  }
}
