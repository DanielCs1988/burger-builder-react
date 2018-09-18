import configureStore, {MockStore} from "redux-mock-store";
import thunk from "redux-thunk";
import * as nock from "nock";
import {login, logoutWhenTokenExpires, register} from "./auth";
import {Actions} from "../actions/auth";

const storeCreator = configureStore([thunk]);

describe('Order Effects', () => {
    const payload = { idToken: 'token101', localId: 'James Bond' };
    const expected = { idToken: 'token101', userId: 'James Bond' };
    let store: MockStore;

    beforeEach(() => {
        store = storeCreator({});
        // @ts-ignore
        global.localStorage = {
            getItem: () => {},
            setItem: () => {},
            removeItem: () => {}
        }
    });

    afterEach(() => nock.cleanAll());
    afterAll(() => nock.restore());

    it('should handle a successful login', async () => {
        expect.assertions(1);
        nock('https://www.googleapis.com')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .post('/identitytoolkit/v3/relyingparty/verifyPassword')
            .query({ key: 'AIzaSyBXA34yX9HExl3Hvdl1dN6fvr4fuVbaVS4' })
            .reply(200, payload);
        // @ts-ignore
        await store.dispatch(login());
        const actions = store.getActions();
        expect(actions).toEqual([
            Actions.authStart(),
            Actions.authSuccess(expected),
        ]);
    });

    it('should handle a successful register', async () => {
        expect.assertions(1);
        nock('https://www.googleapis.com')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .post('/identitytoolkit/v3/relyingparty/signupNewUser')
            .query({ key: 'AIzaSyBXA34yX9HExl3Hvdl1dN6fvr4fuVbaVS4' })
            .reply(200, payload);
        // @ts-ignore
        await store.dispatch(register());
        const actions = store.getActions();
        expect(actions).toEqual([
            Actions.authStart(),
            Actions.authSuccess(expected)
        ]);
    });

    it('should call authLogout after the expiration time is passed', async () => {
        expect.assertions(1);
        // @ts-ignore
        await store.dispatch(logoutWhenTokenExpires(1));
        expect(store.getActions()).toEqual([ Actions.authLogout() ]);
    });
});