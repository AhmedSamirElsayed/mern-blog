/* eslint-disable react/no-unescaped-entities */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const SignInPage = () => {
  const dispatch = useDispatch();
  // state
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      // return setErrorMessage("please fill out all fields. ");
      return dispatch(signInFailure("please fill out all fields."));
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        // setErrorMessage(data.message);
        // setLoading(false);
        // return;
        dispatch(signInFailure(data.message));
      } else {
        if (res.ok) {
          dispatch(signInSuccess(data));
          navigate("/");
        }
      }
    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <div className="min-h-screen mt-20">
        <div className="flex  p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          {/* {left side} */}
          <div className="flex-1">
            <Link to="/" className=" font-bold dark:text-white text-4xl">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Ahmed's
              </span>
              Blog
            </Link>
            <p className="text-sm mt-5">
              <b>•</b> Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima <br />
              consequatur hic eaque autem cumque dolores optio voluptas ut
              fugiat neque! <br /> <b>•</b> You can <b>sign in</b> with your
              email and password or with Google.
            </p>
          </div>
          {/* {right side} */}
          <div className=" flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Your Email"></Label>
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your password"></Label>
                <TextInput
                  type="password"
                  placeholder="********"
                  id="password"
                  onChange={handleChange}
                />
              </div>

              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <Button gradientDuoTone="purpleToPink" outline>
                <AiFillGoogleCircle /> continue with Google
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Don't have an account</span>
              <Link to="/signup" className="text-blue-500">
                sign Up
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
