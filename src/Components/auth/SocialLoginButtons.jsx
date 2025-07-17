import React from "react";
import { FaGoogle} from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-hot-toast";

export default function SocialLoginButtons() {
  const login = useAuthStore((state) => state.login);

  const handleSocialLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/social-login`,
        { idToken: token, provider: "google" }
      );

      login(res.data.user);
      toast.success("Login successful");
      const lastPage = localStorage.getItem("lastPage");

     setTimeout(() => {
        window.location.href = lastPage || "/";
        localStorage.removeItem("lastPage");
     }, 1500); 
      
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Social login failed");
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex items-center justify-center bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600"
      >
        <FaGoogle className="mr-2" /> Google
      </button>
    </div>
  );
}
