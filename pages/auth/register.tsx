import Link from "next/link";
import { useForm } from "react-hook-form";
import { firebase } from "../../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { RootState } from "../../redux/reducers/rootReducer";

interface formValues {
  name: string;
  email: string;
  password: string;
  password2: string;
}

export default function register() {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit, watch, errors, reset } = useForm<FormData>();
  const { name, email, password, password2 }: formValues = errors;

  const passwordValue = watch("password");

  const onSubmit = (data: Object) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: data.name, photoURL: null });

        const userInfo = {
          username: user?.displayName,
          avatar: user?.photoURL,
          uid: user?.uid,
        };

        dispatch({ type: "START_LOGIN", payload: userInfo });
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
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
            src="/undraw_Work_chat_re_qes4.svg"
            alt="Workflow"
          ></img>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Start be connect with your friends
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <section className="flex flex-row relative">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  ref={register({
                    required: true,
                    pattern: /[A-Za-z0-9_]{3,15}/,
                  })}
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="name"
                ></input>
                {name && (
                  <i
                    title="Name must have at least 3 characters"
                    className="fas fa-exclamation-circle absolute -right-6 inset-y-1/4 hover:text-red-500"
                  ></i>
                )}
              </section>
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <section className="flex flex-row relative">
                <input
                  id="email-address"
                  name="email"
                  ref={register({
                    required: true,
                    pattern: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i,
                  })}
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                ></input>

                {email && (
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
                  ref={register({
                    required: true,
                    pattern: /[A-Za-z0-9_]{8,50}/,
                  })}
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                ></input>
                {password && (
                  <i
                    title="Password must have at least 8 characters and can't have symbols"
                    className="fas fa-exclamation-circle absolute -right-6 inset-y-1/4 hover:text-red-500"
                  ></i>
                )}
              </section>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Confirm your password
              </label>

              <section className="flex flex-row relative">
                <input
                  id="password2"
                  name="password2"
                  ref={register({
                    required: true,
                    pattern: /[A-Za-z0-9_]{8,50}/,
                    validate: (value) => value === passwordValue,
                  })}
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm your password"
                ></input>
                {password2 && (
                  <i
                    title="Passwords must be the same"
                    className="fas fa-exclamation-circle absolute -right-6 inset-y-1/4 hover:text-red-500"
                  ></i>
                )}
              </section>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
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
              <Link href="/auth/login" className="hover:text-indigo-700">
                Do you already have an account?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
