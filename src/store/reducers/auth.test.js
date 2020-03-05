import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

  it('should return the initial state', () => {

    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    });

  });

  it('should store the token upon login', () => {

    expect(reducer(undefined, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'foo',
      userId: 'bar'
    }))
      .toEqual({
        token: 'foo',
        userId: 'bar',
        error: null,
        loading: false,
        authRedirectPath: '/'
      });

  });

});
