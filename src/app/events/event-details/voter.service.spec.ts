import { VoterService } from "./voter.service";
import { ISession } from "../shared/event.model";
import { Observable, of } from "rxjs";

describe('VoterService', () => {
    let voterService: VoterService,
    mockHttp;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', () => {
        it('should remove voter from list of voters', () => {
            const session = {id: 6, voters: ['joe', 'john']};
            mockHttp.delete.and.returnValue(of(false));
            voterService.deleteVoter(<ISession>session,"joe", 3);

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('john');
        });

        it('should call http.delete with right URL', () => {
            const session = {id: 6, voters: ['joe', 'john']};
            mockHttp.delete.and.returnValue(of(false));
            voterService.deleteVoter(<ISession>session,"joe", 3);

            expect(mockHttp.delete).toHaveBeenCalledWith(`/api/events/3/sessions/6/voters/joe`);
        });
    });

    describe('addVoter', () => {
        it('should call http.post with the right URL', () => {
            const session = {id: 6, voters: ['john']};
            mockHttp.post.and.returnValue(of(false));
            voterService.addVoter(<ISession>session,"joe", 3);

            expect(mockHttp.post).toHaveBeenCalledWith(`/api/events/3/sessions/6/voters/joe`, {}, jasmine.any(Object));
        })
    })
   
})