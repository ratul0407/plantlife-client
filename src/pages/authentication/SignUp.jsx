import { Link } from "react-router";
import signUpImg from "../../assets/static/sign-up-page-img.jpg";
import googleIcon from "../../assets/icons/google-icon.svg";
export const SignUp = () => {
  return (
    <div className="px-4 pt-20 lg:flex lg:max-h-screen lg:items-center lg:gap-12 lg:p-0 2xl:container 2xl:mx-auto">
      <div className="hidden basis-1/2 lg:block">
        <img src={signUpImg} className="max-h-screen w-full" />
      </div>
      <div className="pt-20 lg:flex lg:h-full lg:max-w-lg lg:basis-1/2 lg:items-center lg:justify-center">
        {/* <p className="text-right text-lg font-medium">
          Don't have an account?{" "}
          <Link to="/login" className="text-green-800 uppercase underline">
            Create Account
          </Link>
        </p> */}
        <div className="space-y-8">
          <div className="flex flex-col gap-4 text-center">
            <Link to="/" className="font-metal text-4xl sm:text-3xl">
              PlantLife
            </Link>
            <p className="font-metal text-3xl text-gray-600">
              One step closer to bringing nature home
            </p>
          </div>
          <form>
            <div className="flex flex-col gap-4">
              <div className="input-container">
                <label htmlFor="name" className="w-20 text-gray-600">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="enter your name"
                  className="input"
                />
              </div>
              <div className="input-container">
                <label htmlFor="email" className="w-20 text-gray-600">
                  Email:{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="input"
                />
              </div>
              <div className="input-container">
                <label htmlFor="email" className="w-20 text-gray-600">
                  Password:{" "}
                </label>
                <input
                  placeholder="type your password"
                  type="password"
                  name="password"
                  className="input"
                />
              </div>
              <button
                type="submit"
                className="min-w-full cursor-pointer rounded-sm bg-green-800 py-2.5 text-lg font-semibold text-white transition-all duration-300 hover:bg-green-700"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-xl text-gray-400">Or</p>
          <div>
            <button className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-xl py-2 text-lg font-medium shadow-sm shadow-slate-200 transition-all duration-300 hover:bg-slate-50 lg:gap-12">
              <img src={googleIcon} />
              Continue with google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
