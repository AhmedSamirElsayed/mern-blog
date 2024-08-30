/* eslint-disable react/no-unescaped-entities */
import { Button, Label, TextInput } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const SignUpPage = () => {
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
              fugiat neque! <br /> <b>•</b> You can sign up with your email and
              password or with Google.
            </p>
          </div>
          {/* {right side} */}
          <div className=" flex-1">
            <form className="flex flex-col gap-4">
              <div>
                <Label value="Your username"></Label>
                <TextInput type="text" placeholder="username" id="username" />
              </div>
              <div>
                <Label value="Your Email"></Label>
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                />
              </div>
              <div>
                <Label value="Your password"></Label>
                <TextInput
                  type="password"
                  placeholder="********"
                  id="password"
                />
              </div>

              <Button gradientDuoTone="purpleToPink" type="submit">
                Sign Up
              </Button>
              <Button gradientDuoTone="purpleToPink" outline>
                <AiFillGoogleCircle /> continue with Google
              </Button>
              <div className="flex gap-2 text-sm mt-5">
                <span>Have an account?</span>
                <Link to="/signin" className="text-blue-500">
                  signin
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
