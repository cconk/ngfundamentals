import { Component } from '@angular/core'
import { ISession } from '../events';
import { AuthService } from '../user/auth.service';
import { EventService } from '../events';


@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styles: [`
        .nav.navbar-nav { font-size: 15px;}
        #searchForm {margin-right: 100px}
        @media (max-width: 1200px) {#searchForm {display:none}}
        li > a.active { color: #f97924; }
    `]
})

export class NavBarComponent {
    searchTerm = '';
    foundSessions: ISession[];

    constructor(public auth:AuthService, private eventService: EventService) {

    }

    searchSessions(searchTerm)  {
        //console.log(searchTerm);
        this.eventService.searchSessions(searchTerm).subscribe(sessions => {
            this.foundSessions = sessions;
            //console.log(this.foundSessions);
        })
    }

}