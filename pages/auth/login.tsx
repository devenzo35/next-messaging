import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { firebase, provider } from "../../firebase/firebaseConfig";
import { RootState } from "../../redux/reducers/rootReducer";

function login() {
  const { user } = useSelector((state: RootState) => state.auth);
  const handleGoogle = () => {
    try {
      firebase.auth().signInWithPopup(provider);
    } catch (e) {
      console.log(e);
    }
  };

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
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true"></input>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              ></input>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              ></input>
            </div>
          </div>

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

            <div className="text-sm">
              <Link
                href="/auth/register"
                /* className="font-medium text-indigo-600 hover:text-indigo-500" */
              >
                Don't have an account yet?
              </Link>
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
