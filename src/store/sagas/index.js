import {takeEvery,takeLatest,all} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {logoutSaga,checkAuthTimoutSaga,authUserSaga,authCheckStateSaga} from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import { purchaseBurgerSaga,fetchOrdersSaga } from './order';

export function* watchAuth(){
    yield all([
        yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga),
        yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimoutSaga),
        yield takeEvery(actionTypes.AUTH_USER,authUserSaga),
        yield takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga),
    ]);
    
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS,initIngredientsSaga);
}

export function* watchOrder(){
    yield takeLatest(actionTypes.PURCHASE_BURGER,purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS,fetchOrdersSaga);
}