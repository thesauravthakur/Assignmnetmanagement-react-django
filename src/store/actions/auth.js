import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = user => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};


export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};


export const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_DATA_START
  };
};

export const getUserSuccess = userData => {
  return {
    type: actionTypes.GET_USER_DATA_SUCCESS,
    userData
  };
};

export const getUserFail = error => {
  return {
    type: actionTypes.GET_USER_DATA_FAIL,
    error: error
  };
};







export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const user = {
          token: res.data.key,
          username,
          userId: res.data.user,
          is_student: res.data.user_type.is_student,
          is_teacher: res.data.user_type.is_teacher,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (
  username,
  email,
  password1,
  password2,
  is_student,
  first_name,
  last_name,
) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      username,
      email,
      password1,
      password2,
      is_student,
      is_teacher: !is_student,
      first_name,
      last_name,
    };
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", user)
      .then(res => {
        const user = {
          first_name,
          last_name,
          token: res.data.key,
          username,
          userId: res.data.user,
          is_student,
          is_teacher: !is_student,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const getUserData = () => {
  return dispatch => {
    dispatch(getUserStart());
    const userId = JSON.parse(localStorage.getItem('user')).userId
    axios
      .get(`http://127.0.0.1:8000/users/users_list/${userId}`)
      .then(res => {
        console.log(res.data)
        dispatch(getUserSuccess(res.data));
      })
      .catch(err => {
        dispatch(getUserFail(err));
      });
  };
};
