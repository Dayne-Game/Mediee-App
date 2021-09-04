import {
  RESIDENT_LIST_REQUEST,
  RESIDENT_CREATE_FAIL,
  RESIDENT_CREATE_REQUEST,
  RESIDENT_CREATE_RESET,
  RESIDENT_CREATE_SUCCESS,
  RESIDENT_DELETE_FAIL,
  RESIDENT_DELETE_REQUEST,
  RESIDENT_DELETE_SUCCESS,
  RESIDENT_DETAILS_FAIL,
  RESIDENT_DETAILS_REQUEST,
  RESIDENT_DETAILS_SUCCESS,
  RESIDENT_LIST_FAIL,
  RESIDENT_LIST_SUCCESS,
  RESIDENT_UPDATE_FAIL,
  RESIDENT_UPDATE_REQUEST,
  RESIDENT_UPDATE_RESET,
  RESIDENT_UPDATE_SUCCESS,
} from "../constants/residentConstants";

export const residentListReducer = (state = { residents: [] }, action) => {
  switch (action.type) {
    case RESIDENT_LIST_REQUEST:
      return { loading: true, residents: [] };
    case RESIDENT_LIST_SUCCESS:
      return {
        loading: false,
        residents: action.payload.residents,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case RESIDENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const residentDetailsReducer = (state = { resident: {} }, action) => {
  switch (action.type) {
    case RESIDENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case RESIDENT_DETAILS_SUCCESS:
      return { loading: false, resident: action.payload };
    case RESIDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const residentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RESIDENT_DELETE_REQUEST:
      return { loading: true };
    case RESIDENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case RESIDENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const residentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESIDENT_CREATE_REQUEST:
      return { loading: true };
    case RESIDENT_CREATE_SUCCESS:
      return { loading: false, success: true, resident: action.payload };
    case RESIDENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case RESIDENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const residentUpdateReducer = (state = { resident: {} }, action) => {
  switch (action.type) {
    case RESIDENT_UPDATE_REQUEST:
      return { loading: true };
    case RESIDENT_UPDATE_SUCCESS:
      return { loading: false, success: true, resident: action.payload };
    case RESIDENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case RESIDENT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
