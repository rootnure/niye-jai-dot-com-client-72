import PropTypes from "prop-types";
import { useState } from "react";
import { createContext } from "react";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import moment from "moment/moment";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const passwordLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserInfo = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo || "https://i.ibb.co/yp2YxZf/Profile.png",
    });
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (
        currentUser &&
        currentUser?.email &&
        currentUser?.photoURL &&
        currentUser?.displayName
      ) {
        axiosPublic.post(`/users/${currentUser?.email}`, {
          role: "User",
          createdOn: moment.utc().format(),
          name: currentUser.displayName,
          photo: currentUser.photoURL,
        });
      }
      if (currentUser) {
        const userInfo = {
          email: currentUser.email,
        };
        const { data } = await axiosPublic.post("/jwt", userInfo);
        if (data?.token) {
          localStorage.setItem("access-token", data.token);
        }
      } else {
        localStorage.removeItem("access-token");
      }
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const value = {
    user,
    loading,
    createUser,
    passwordLogin,
    googleLogin,
    updateUserInfo,
    resetPassword,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
