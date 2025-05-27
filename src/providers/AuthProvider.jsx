import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import { createContext } from "react";
import auth from "../firebase/firebase.config";
import { useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);
export const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
            email: currentUser.email,
          });
          if (res.data.token) {
            setUser(currentUser);
            localStorage.setItem("token", res.data.token);
          }
        } catch (error) {
          console.error("Error generating jwt token");
        }
      }
    });
    return () => unSubscribe;
  }, []);
  return <div>AuthProvider</div>;
};
