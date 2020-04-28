import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  username: null,
  userId: null,
  userData: {},
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.token,
    username: action.user.username,
    userId: action.user.userId,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  });
};



const getUserStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUserSuccess = (state, action) => {
  console.log(state)
  return updateObject(state, {
    userData: action.userData,
    error: null,
    loading: false
  });
};

const getUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};







const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.GET_USER_DATA_START:
      return getUserStart(state, action);
    case actionTypes.GET_USER_DATA_SUCCESS:
      return getUserSuccess(state, action);
    case actionTypes.GET_USER_DATA_FAIL:
      return getUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;
