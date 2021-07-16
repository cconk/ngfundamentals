import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from './common/toastr.service';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { Error404Component } from './errors/404.component';

import {
  CreateEventComponent,
  CreateSessionComponent,
  EventDetailsComponent,
  EventRouteActivator,
  EventThumbnailComponent,
  EventListResolver,
  EventsListComponent,
  EventService,
  SessionListComponent,
  DurationPipe
} from './events/index'

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes'
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

declare let toastr: Toastr
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes), 
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    EventsAppComponent,
    NavBarComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent, 
    Error404Component,
    SessionListComponent, 
    CollapsibleWellComponent,
    DurationPipe
  ],
  providers: [
    EventService,
    {provide: TOASTR_TOKEN, useValue: toastr},
    EventRouteActivator,
    EventListResolver,
    AuthService, 
    {
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState}
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { 
  

}

export function checkDirtyState(component:CreateEventComponent) {
  if(component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')

  return true
}
