import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  assignments: [],
  assignment: {},
  error: null,
  loading: false,
};

const getAssignmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAssignmentSuccess = (state, action) => {
  console.log(action)
  return updateObject(state, {
    assignments: action.assignments,
    error: null,
    loading: false
  });
};

const getAssignmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const postAssignmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const postAssignmentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const postAssignmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_ASSIGNMENT_SUCCESS:
      return postAssignmentStart(state, action);
    case actionTypes.POST_ASSIGNMENT_SUCCESS:
      return postAssignmentSuccess(state, action);
    case actionTypes.POST_ASSIGNMENT_FAIL:
      return postAssignmentFail(state, action);
    case actionTypes.GET_ASSIGNMENT_START:
      return getAssignmentStart(state, action);
    case actionTypes.GET_ASSIGNMENT_SUCCESS:
      return getAssignmentSuccess(state, action);
    case actionTypes.GET_ASSIGNMENT_FAIL:
      return getAssignmentFail(state, action);
    default:
      return state;
  }
};

export default reducer;
