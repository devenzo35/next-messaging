import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { firebase, provider } from "../../firebase/firebaseConfig";
import { RootState } from "../../redux/reducers/rootReducer";
import { types } from "../../redux/types";

interface formData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

function login() {
  const { register, handleSubmit, errors } = useForm<formData>();
  const { user, authError } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleGoogle = () => {
    try {
      firebase.auth().signInWithPopup(provider);
    } catch (err) {
      dispatch({ type: types.LOGIN_FAILED, payload: err.message });
    }
  };

  const onSubmit = ({ email, password, reset }) => {
    dispatch({
      type: types.START_LOGIN,
      payload: { email, password, reset },
    });
  };

  const cleanAuthError = () => dispatch({ type: types.CLEAN_ERRORS });

  const Router = useRouter();
  useEffect(() => {
    user && Router.replace("/");
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-indigo-700">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg">
        <div>
          <img
            className="mx-auto h-36 w-auto"
            src="/undraw_begin_chat_c6pj.svg"
            alt="Workflow"
          ></img>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Next Chat
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <input type="hidden" name="remember" value="true"></input>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <section className="flex flex-row relative">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={register({
                    required: true,
                    pattern: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i,
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                ></input>
                {errors.email && (
                  <i
                    title="Enter a valid email"
                    className="fas fa-exclamation-circle absolute -right-6 inset-y-1/4 hover:text-red-500"
                  ></i>
                )}
              </section>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <section className="flex flex-row relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={register({
                    required: true,
                    pattern: /[A-Za-z0-9_]{8,50}/,
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                ></input>
                {errors.password && (
                  <i
                    title="Password must have at least 8 characters and can't have symbols"
                    className="fas fa-exclamation-circle absolute -right-6 inset-y-1/4 hover:text-red-500"
                  ></i>
                )}
              </section>
            </div>
          </div>

          {authError && (
            <p className="m-auto mt-0 text-sm text-center w-full h-max">
              {authError}
              <i
                title="Passwords must be the same"
                className="fas fa-exclamation-circle text-lg text-red-700"
              ></i>
            </p>
          )}
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoogle}
              type="button"
              style={{
                background: "#4285f4",
                color: "white",
                border: "none",
                width: "130px",
                height: "40px",
                borderRadius: "3%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <img
                src="https://www.iconfinder.com/data/icons/social-media-2210/24/Google-512.png"
                style={{
                  width: "30px",
                  background: "white",
                  borderRadius: "50%",
                }}
                alt=""
              ></img>
              <b style={{ position: "relative" }}>Google</b>
            </button>

            <div className="text-sm" onClick={cleanAuthError}>
              <Link href="/auth/register">Don't have an account yet?</Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default login;
