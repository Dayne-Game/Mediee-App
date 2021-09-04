import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer, staffListReducer, staffRegisterReducer, userDeleteReducer, userUpdateReducer, userDetailsReducer } from "./reducers/userReducers";
import { residentListReducer, residentCreateReducer, residentDeleteReducer } from "./reducers/residentReducers";

const reducer = combineReducers({
  residentList: residentListReducer,
  residentCreate: residentCreateReducer,
  residentDelete: residentDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  staffList: staffListReducer,
  staffRegister: staffRegisterReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
