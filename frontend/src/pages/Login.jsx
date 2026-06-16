import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (
      email === "admin@shnoor.com" &&
      password === "123456"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-3xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-blue-800">
            SHNOOR
          </h1>

          <p className="text-gray-500 mt-2">
            Import Export Intelligence
          </p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-3">
            Login As
          </label>

          <div className="bg-slate-100 rounded-xl p-1 flex">
            <button
              onClick={() => setRole("Admin")}
              className={`flex-1 py-2 rounded-lg ${
                role === "Admin"
                  ? "bg-blue-700 text-white"
                  : ""
              }`}
            >
              Admin
            </button>

            <button
              onClick={() => setRole("Customer")}
              className={`flex-1 py-2 rounded-lg ${
                role === "Customer"
                  ? "bg-blue-700 text-white"
                  : ""
              }`}
            >
              Customer
            </button>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-medium mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl p-4"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl p-4"
          />
        </div>

        <div className="text-right mb-6">
          <button className="text-blue-700 text-sm">
            Forgot Password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-800 text-white py-4 rounded-xl font-semibold hover:bg-blue-900 transition"
        >
          Sign In
        </button>

        <div className="text-center mt-6 text-gray-500 text-sm">
          Demo Login:
          <br />
          admin@shnoor.com
          <br />
          123456
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-700 font-semibold hover:underline"
          >
            Create a new account
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;