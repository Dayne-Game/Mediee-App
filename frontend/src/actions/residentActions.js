import axios from "axios";
import {
  RESIDENT_LIST_REQUEST,
  RESIDENT_CREATE_FAIL,
  RESIDENT_CREATE_REQUEST,
  //   RESIDENT_CREATE_RESET,
  RESIDENT_CREATE_SUCCESS,
  RESIDENT_DELETE_FAIL,
  RESIDENT_DELETE_REQUEST,
  RESIDENT_DELETE_SUCCESS,
  //   RESIDENT_DETAILS_FAIL,
  //   RESIDENT_DETAILS_REQUEST,
  //   RESIDENT_DETAILS_SUCCESS,
  RESIDENT_LIST_FAIL,
  RESIDENT_LIST_SUCCESS,
  //   RESIDENT_UPDATE_FAIL,
  //   RESIDENT_UPDATE_REQUEST,
  //   RESIDENT_UPDATE_RESET,
  //   RESIDENT_UPDATE_SUCCESS,
} from "../constants/residentConstants";
import { logout } from "./userActions";

export const listResidents =
  (keyword = "", pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: RESIDENT_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/residents?keyword=${keyword}&pageNumber=${pageNumber}`, config);

      dispatch({ type: RESIDENT_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: RESIDENT_LIST_FAIL,
        payload: message,
      });
    }
  };

export const deleteResident = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESIDENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/residents/${id}`, config);

    dispatch({ type: RESIDENT_DELETE_SUCCESS });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: RESIDENT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createResident = (name, nhi, dob, gender, height, weight, bloodtype) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESIDENT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/residents`, { name, nhi, dob, gender, height, weight, bloodtype }, config);

    dispatch({
      type: RESIDENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: RESIDENT_CREATE_FAIL,
      payload: message,
    });
  }
};
