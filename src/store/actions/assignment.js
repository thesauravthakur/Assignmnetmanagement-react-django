import axios from "axios";
import * as actionTypes from "./actionTypes";


export const getAssignmentStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_START
  };
};

export const getAssignmentSuccess = (assignments) => {
  return {
    type: actionTypes.GET_ASSIGNMENT_SUCCESS,
    assignments
  };
};

export const getAssignmentFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENT_FAIL,
    error: error
  };
};








export const getDetailAssignmentStart = () => {
  return {
    type: actionTypes.GET_DETAIL_ASSIGNMENT_START
  };
};

export const getDetailAssignmentSuccess = (assignment) => {
  return {
    type: actionTypes.GET_DETAIL_ASSIGNMENT_SUCCESS,
    assignment
  };
};

export const getDetailAssignmentFail = error => {
  return {
    type: actionTypes.GET_DETAIL_ASSIGNMENT_FAIL,
    error: error
  };
};






export const submitAssignmentStart = () => {
  return {
    type: actionTypes.SUBMIT_ASSIGNMENT_START
  };
};

export const submitAssignmentSuccess = () => {
  return {
    type: actionTypes.SUBMIT_ASSIGNMENT_SUCCESS,
  };
};

export const submitAssignmentFail = error => {
  return {
    type: actionTypes.SUBMIT_ASSIGNMENT_FAIL,
    error: error
  };
};





export const postAssignmentStart = () => {
  return {
    type: actionTypes.POST_ASSIGNMENT_START
  };
};

export const postAssignmentSuccess = assignment => {
  return {
    type: actionTypes.POST_ASSIGNMENT_SUCCESS,
    assignment
  };
};

export const postAssignmentFail = error => {
  return {
    type: actionTypes.POST_ASSIGNMENT_FAIL,
    error: error
  };
};





export const getGradedAssignmentStart = () => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENT_START
  };
};

export const getGradedAssignmentSuccess = grade => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENT_SUCCESS,
    grade
  };
};

export const getGradedAssignmentFail = error => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENT_FAIL,
    error: error
  };
};







export const getAssignment = (token) => {
  return dispatch => {
    dispatch(getAssignmentStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,

    };
    axios
      .get("http://127.0.0.1:8000/assignments/assignment_list/")
      .then(res => {
        const assignments = res.data
        dispatch(getAssignmentSuccess(assignments));
      })
      .catch(err => {
        dispatch(getAssignmentFail(err));
      });
  };
};

export const getDetailAssignment = (token, id) => {
  return dispatch => {
    dispatch(getDetailAssignmentStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`http://127.0.0.1:8000/assignments/assignment_list/${id}`)
      .then(res => {
        dispatch(getDetailAssignmentSuccess(res.data));
      })
      .catch(err => {
        dispatch(getDetailAssignmentFail(err));
      });
  };
};




export const postAssignment = (assignment, token) => {
  return dispatch => {
    dispatch(postAssignmentStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,

    };
    axios
      .post("http://127.0.0.1:8000/assignments/assignment_list/", assignment)
      .then(res => {
        dispatch(postAssignmentSuccess(assignment));
      })
      .catch(err => {
        dispatch(postAssignmentFail(err));
      });
  };
};



export const submitAssignment = (userAnswer, token) => {
  return dispatch => {
    dispatch(submitAssignmentStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,

    };
    axios
      .post("http://127.0.0.1:8000/assignments-grade/", userAnswer)
      .then(res => {
        dispatch(submitAssignmentSuccess());
      })
      .catch(err => {
        dispatch(submitAssignmentFail(err));
      });
  };
};



export const getGradedAssignment = (username, token) => {
  return dispatch => {
    dispatch(getGradedAssignmentStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,

    };
    axios
      .get(`http://127.0.0.1:8000/assignments-grade/create/?username=${username}`)
      .then(res => {
        dispatch(getGradedAssignmentSuccess(res.data));
      })
      .catch(err => {
        dispatch(getGradedAssignmentFail(err));
      });
  };
};
