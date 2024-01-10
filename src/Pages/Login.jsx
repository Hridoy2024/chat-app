import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { MdError } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Hearts } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailerr, isEmailerr] = useState(false);
  const [nameerr, isNameerr] = useState(false);
  const [passerr, isPasserr] = useState(false);
  const [hide, setHide] = useState(true);
  const [success, isSuccess] = useState(false);
  const provider = new GoogleAuthProvider();

  const handleGoogle = () => {
    signInWithPopup(auth, provider) 
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        toast.success("SignIn Success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })

      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        toast.error("Login Unsuccessful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleHide = () => {
    setHide(!hide);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!email) {
      isEmailerr(true);
      // setMsg("Field is empty");
    }

    if (!password) {
      isPasserr(true);
      // setMsg("Password field is empty");
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      isEmailerr(true);
    }

    if (email && password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // updateProfile(auth.currentUser, {
          //   displayName: name,
          // })
          //   .then(() => {
          //     // Profile updated!
          //     // ...
          //   })
          //   .catch((error) => {
          //     // An error occurred
          //     // ...
          //   });
          // ...

          console.log(user);
          toast.success("SignIn Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          // setDoc(doc(db, "alluser", user.uid), {
          //   id: user.uid,
          //   name: name,
          //   email: email,
          //   password: password,
          // });

          isSuccess(true);

          setEmail("");
          setName("");
          setPassword("");

          // setTimeout(() => {
          //   navigate("/Login");
          // }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..

          console.log(errorMessage);

          if (errorCode.includes("auth/Invalid-credential")) {
            toast.error("Login Unsuccessful", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
    }
  };

  return (
    <div className="flex">
      <ToastContainer />
      <div className="w-1/2 flex items-center justify-end mr-[215px]">
        <div> 
          <h1 className="font-opensans font-bold text-[33.34px] text-[#03014C] mb-[30px] ">
            Login to your account!
          </h1>

          <button
            onClick={handleGoogle}
            className="py-[23px] px-[42px] rounded-[8px]  border-[0.83px] border-[#03014C] font-opensans font-semibold text-[13.34px] text-[#03014C]"
          >
            <FcGoogle className="inline" size={20} />
            Login with Google
          </button>

          {/* form Start */}
          <form action="">
            <div className="mt-[60px] relative">
              <label
                className="font-opensans font-normal text-[13px] text-primary absolute left-0 top-[-17px]"
                htmlFor=""
              >
                Email Address
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  isEmailerr(false);
                }}
                className="w-full border-b-[0.83px] border-primary font-opensans font-semibold text-[20px] text-primary py-[16px] "
                type="email"
                name=""
                id=""
              />

              {emailerr && (
                <>
                  <p className="text-red-500">
                    {" "}
                    Email Field is empty or invalid email
                  </p>

                  <MdError
                    size={25}
                    className="text-red-600 absolute top-[28px] right-[55px]"
                  />
                </>
              )}
            </div>

            <div className="mt-[60px] relative">
              <label
                className="font-opensans font-normal text-[13px] text-primary absolute left-0 top-[-17px]"
                htmlFor=""
              >
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  isPasserr(false);
                }}
                className="w-full border-b-[0.83px] border-primary font-opensans font-semibold text-[20px] text-primary py-[16px] "
                type={hide ? "password" : "text"}
                name=""
                id=""
              />

              {hide ? (
                <FaEyeSlash
                  onClick={handleHide}
                  size={25}
                  className="absolute top-[27px] right-[80px] cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={handleHide}
                  size={25}
                  className="absolute top-[27px] right-[80px] cursor-pointer"
                />
              )}

              {passerr && (
                <p className="text-red-500">Password Field is Empty</p>
              )}
            </div>

            {success ? (
              <div className="flex justify-center w-[368px]">
                <Hearts
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="hearts-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <button
                onClick={handleClick}
                className=" mt-[55px] font-opensans font-semibold text-[28px] rounded-[8px] bg-secondary px-[122px] py-[26px] text-white"
              >
                Login to Continue
              </button>
            )}

            <span className="block font-opensans font-normal text-[13px] text-primary mt-[35px]">
              Don’t have an account ?{" "}
              <Link
                className="font-opensans font-bold   text-[13px] text-[#EA6C00]"
                to="/"
              >
                Sign up
              </Link>
            </span>
          </form>
          {/* form End */}
        </div>
      </div>

      <div className="w-1/2">
        <img className="h-screen w-full object-cover" src="/Login.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
