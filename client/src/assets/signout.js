import { signOutSuccess } from "../redux/user/userSlice";

export const SignoutFun = async (dispatch) => {
  try {
    const res = await fetch("api/user/signout", {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      dispatch(signOutSuccess());
    }
  } catch (error) {
    console.log(error.message);
  }
};
