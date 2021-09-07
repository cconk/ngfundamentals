import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CollapsibleWellComponent } from "src/app/common";
import { AuthService } from "src/app/user/auth.service";
import { SessionListComponent, UpvoteComponent, VoterService } from ".";
import { DurationPipe } from "..";


describe('SessionListComponent', () => {

    let mockAuthService,
        mockVoterService,
        fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement

    beforeEach(() => {
        mockAuthService = { isAuthenticated: () => true, currentUser:{userName: 'joe'}}
        mockVoterService = { userHasVoted: () => true}

        TestBed.configureTestingModule({
            declarations: [
                SessionListComponent,
                DurationPipe,
                //CollapsibleWellComponent,
                //UpvoteComponent
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService},
                { provide: VoterService, useValue: mockVoterService}
            ],
            schemas: [
                NO_ERRORS_SCHEMA //keeps shallow integration tests approach 
            ]
        });
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    })

    describe('initial display', () => {

        it('should have the correct name', () => {
            component.sessions = [
                {name: 'Session 1', id: 3, presenter:'Joe', duration: 1, level: 'beginner', abstract: 'abstract',
                voters: ['john', 'james']}
            ]
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;
            component.ngOnChanges();

            fixture.detectChanges();
            // same thing just two ways to do it
            expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
        })
    });
});

