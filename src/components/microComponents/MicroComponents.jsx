import { useNavigate } from "react-router";
import { saveUser } from "../../api/utils";
import googleIcon from "../../assets/icons/google-icon.svg";
import { useAuth } from "../../hooks/useAuth";
export const FormButton = ({ isSubmitting, text }) => {
  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className="min-w-full cursor-pointer rounded-sm bg-green-800 py-2.5 text-lg font-semibold text-white transition-all duration-300 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      {text}
    </button>
  );
};

export const GoogleLogin = ({ isSubmitting }) => {
  const navigate = useNavigate("");
  const { signInWithGoogle } = useAuth();
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user);
      console.log(data?.user);
      navigate("/plants");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button
        disabled={isSubmitting}
        onClick={handleGoogleSignIn}
        className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-xl py-2 text-lg font-medium shadow-sm shadow-slate-200 transition-all duration-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 lg:gap-12"
      >
        <img src={googleIcon} />
        Continue with google
      </button>
    </div>
  );
};
