import { useContext, useEffect } from "react";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import AuthForm from "../../components/authForm/authForm";
import { AuthContext } from "../../context/Authentication";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuth, username } = useContext(AuthContext);

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam !== "login" && modeParam !== "signup") {
      navigate("/auth?mode=signup");
    }
    if (isAuth) {
      navigate(`/users/${username}`);
    }
  }, [searchParams, navigate, isAuth, username]);

  return (
    <div className="flex items-center justify-center h-lvh">
      <AuthForm />
    </div>
  );
};

export default Auth;

export async function action({ request }) {
  const params = new URL(request.url).searchParams;
  let mode = params.get("mode") || "login";
  if (mode === "signup") mode = "register";

  try {
    const data = await request.formData();
    let authData = {};
    let usernameForRedirect = "";

    if (mode === "register") {
      const firstname = data.get("firstname");
      const lastname = data.get("lastname");
      authData = {
        username: firstname + " " + lastname,
        email: data.get("email"),
        password: data.get("password"),
      };
      usernameForRedirect = firstname.toLowerCase();
    }

    if (mode === "login") {
      authData = {
        email: data.get("email"),
        password: data.get("password"),
      };
    }

    const response = await fetch(import.meta.env.VITE_BASE_URL + `/${mode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    const resData = await response.json();

    if ([400, 401, 404].includes(response.status)) {
      return { error: resData.message };
    }

    if (!response.ok) {
      return { error: "Could not authenticate user." };
    }

    // ✅ Ruaj tokenin
    if ("token" in resData) {
      localStorage.setItem("authToken", "Bearer " + resData.token);

      if (mode === "login") {
        return redirect("/users/me");
      } else {
        return redirect(`/users/${usernameForRedirect}`);
      }
    } else {
      return redirect("/auth?mode=login");
    }
  } catch (error) {
    return { error: error.message };
  }
}
