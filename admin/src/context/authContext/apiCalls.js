import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
const api_url = "http://50.62.182.51:8800/api/";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(api_url + "auth/login", user);

    if(res.data.isAdmin){
      dispatch(loginSuccess(res.data))
    }
    else{
      alert("Unauthorized access!")
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};
