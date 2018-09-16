import configureStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as nock from 'nock';
import  {Ingredients } from "../../models";
import { Actions } from "../actions/ingredients";
import {fetchIngredients} from "./ingredients";

const storeCreator = configureStore([thunk]);

describe('Order Effects', () => {
    const ingredients: Ingredients = {
        meat: 0,
        cheese: 0,
        bacon: 0,
        salad: 0
    };
    let store: MockStore;

    beforeEach(() => {
        store = storeCreator({});
    });

    afterEach(() => nock.cleanAll());
    afterAll(() => nock.restore());

    it('should handle a successful fetchIngredients', async () => {
        expect.assertions(1);
        nock('https://burger-builder-738ba.firebaseio.com')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get('/ingredients.json')
            .reply(200, ingredients);
        // @ts-ignore
        await store.dispatch(fetchIngredients());
        const actions = store.getActions();
        expect(actions).toEqual([
            Actions.fetchIngredientsStarted(),
            Actions.fetchIngredientsSuccess(ingredients)
        ]);
    });

    it('should handle errors in fetchIngredients', async () => {
        expect.assertions(1);
        nock('https://burger-builder-738ba.firebaseio.com')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get('/ingredients.json')
            .reply(400);
        // @ts-ignore
        await store.dispatch(fetchIngredients());
        const actions = store.getActions();
        expect(actions).toEqual([
            Actions.fetchIngredientsStarted(),
            Actions.fetchIngredientsFailed('Request failed with status code 400')
        ]);
    });
});