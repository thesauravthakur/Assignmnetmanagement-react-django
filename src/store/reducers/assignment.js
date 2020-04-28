import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  assignments: [],
  assignment: {},
  error: null,
  loading: false,
  grade: [],
};

const getAssignmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAssignmentSuccess = (state, action) => {
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



const getGradedAssignmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getGradedAssignmentSuccess = (state, action) => {
  return updateObject(state, {
    grade: action.grade,
    error: null,
    loading: false
  });
};

const getGradedAssignmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};






const getDetailAssignmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDetailAssignmentSuccess = (state, action) => {
  return updateObject(state, {
    assignment: action.assignment,
    error: null,
    loading: false
  });
};

const getDetailAssignmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};




const submitAssignmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const submitAssignmentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const submitAssignmentFail = (state, action) => {
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
    case actionTypes.GET_DETAIL_ASSIGNMENT_START:
      return getDetailAssignmentStart(state, action);
    case actionTypes.GET_DETAIL_ASSIGNMENT_SUCCESS:
      return getDetailAssignmentSuccess(state, action);
    case actionTypes.GET_DETAIL_ASSIGNMENT_FAIL:
      return getDetailAssignmentFail(state, action);
    case actionTypes.SUBMIT_ASSIGNMENT_START:
      return submitAssignmentStart(state, action);
    case actionTypes.SUBMIT_ASSIGNMENT_SUCCESS:
      return submitAssignmentSuccess(state, action);
    case actionTypes.SUBMIT_ASSIGNMENT_FAIL:
      return submitAssignmentFail(state, action);
    case actionTypes.GET_GRADED_ASSIGNMENT_START:
      return getGradedAssignmentStart(state, action);
    case actionTypes.GET_GRADED_ASSIGNMENT_SUCCESS:
      return getGradedAssignmentSuccess(state, action);
    case actionTypes.GET_GRADED_ASSIGNMENT_FAIL:
      return getGradedAssignmentFail(state, action);
    default:
      return state;
  }
};

export default reducer;
