import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
    user:string = "Daniel";
    @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
    reason = '';
    
    close(reason: string) {
        this.reason = reason;
        this.sidenav.close();
    }
    shouldRun = true;

}
