import { useContext, useEffect } from "react";
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { AuthContext } from "../../context/Authentication";
import Button from "../ui/Button";
import { Input } from "../ui/input";
import { MdOutlineLogin } from "react-icons/md";
import { useToast } from "../ui/use-toast";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const data = useActionData();
  const { setIsAuth, setUserName } = useContext(AuthContext);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { toast } = useToast();

  useEffect(() => {
    if (data && "token" in data) {
      setIsAuth(true);
      setUserName("user"); // ose merre nga backend me /me endpoint
    }
    if (data && "message" in data) {
      const date = new Date();
      toast({
        title: data.message,
        description: date.toString(),
      });
    }
  }, [data, setIsAuth, setUserName, toast]);

  const inputStyle = "h-12 text-md bg-white bg-opacity-60 text-rose-900 placeholder:text-rose-400";

  return (
    <div className="w-[90%] sm:w-[fit-content] gap-4 rounded-2xl flex flex-col items-center bg-rose-100 bg-opacity-40 p-10 shadow-xl backdrop-blur-md">
      <Form
        method="post"
        className="flex flex-col gap-5 mt-4 w-11/12 sm:w-[25rem]"
      >
        <div>
          <h1 className="font-bold text-4xl text-rose-700 dark:text-rose-300">
            {isLogin ? "Welcome Back 🌸" : "Create Your Bloom 🌷"}
          </h1>
          <p className="text-sm max-w-sm mt-2 text-rose-500 dark:text-rose-200">
            {isLogin
              ? "Log in to continue your journey."
              : "Begin your story, one blog at a time."}
          </p>
        </div>
        {!isLogin && (
          <div className="flex gap-3">
            <Input
              type="text"
              name="firstname"
              className={inputStyle}
              placeholder="First Name"
            />
            <Input
              type="text"
              name="lastname"
              className={inputStyle}
              placeholder="Last Name"
            />
          </div>
        )}
        <Input
          type="email"
          name="email"
          className={inputStyle}
          placeholder="Email Address"
        />
        <Input
          type="password"
          name="password"
          className={inputStyle}
          placeholder="Password"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-md gap-2 bg-rose-600 text-white hover:bg-rose-700"
        >
          {isSubmitting ? "Submitting..." : isLogin ? "Login" : "Sign Up"}
          <MdOutlineLogin />
        </Button>
        {data?.error && (
          <p className="text-red-600 text-sm text-center">{data.error}</p>
        )}
        <div className="w-full text-center">
          <Link
            to={`?mode=${isLogin ? "signup" : "login"}`}
            className="text-rose-600 hover:text-rose-800 hover:underline underline-offset-4 transition"
          >
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Login"}
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
