import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Hearts } from "react-loader-spinner";
import { config } from "../Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import {
  getStorage,
  ref as rasel,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
  const storage = getStorage();
  const database = getDatabase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [uploadFile, setuploadfile] = useState(null);

  const [emailerr, isEmailerr] = useState(false);
  const [nameerr, isNameerr] = useState(false);
  const [passerr, isPasserr] = useState(false);
  const [fileerr, isfileerr] = useState(false);

  const [hide, setHide] = useState(true);
  const [success, isSuccess] = useState(false);

  const handleHide = () => {
    setHide(!hide);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!email) {
      isEmailerr(true);
    }

    if (!name) {
      isNameerr(true);
    }

    if (!password) {
      isPasserr(true);
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      isEmailerr(true);
    }

    if (!uploadFile) {
      isfileerr(true);
    }

    if (email && name && password && uploadFile) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          // ...

          console.log(user);

          const storageRef = rasel(storage, "imgs/${uploadFile.name}");
          const uploadTask = uploadBytesResumable(storageRef, uploadFile);

          uploadTask.on(

            "state_changed",
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads

              console.log(error);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // console.log("File available at", downloadURL);

                set(ref(database, "users/" + user.uid), {
                  id: user.uid,
                  name: name,
                  email: email,
                  photo: downloadURL,
                });
              });
            }
          );

          toast.success("SignUp Success", {
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

          if (errorCode.includes("auth/email-already-in-use")) {
            toast.error("Email Already Used", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }

          if (errorCode.includes("auth/weak-password")) {
            toast.error("Weak Password", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          isSuccess(false);
        });
    }
  };

  return (
    <div className="flex ">
      <ToastContainer />
      <div className="w-1/2 flex items-center justify-end">
        <div className="mr-[69px]">
          <h1 className="font-nunito font-bold text-[34px] text-primary ">
            Get started with easily register
          </h1>

          <p className="font-nunito font-regular text-[20pxpx] text-primary mt-[13px]">
            Free register and you can enjoy it
          </p>

          <form action="">
            <div className="relative mt-[61px]">
              <label
                className="font-nunito font-semibold text-[13px] text-primary absolute top-[-9px] left-[42px] bg-white px-[18px]"
                htmlFor=""
              >
                Email Address
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  isEmailerr(false);
                }}
                className="px-[52px] py-[26px] font-nunito font-semibold text-[20px] text-primary  w-[368px] h-[81px] rounded-[8px]  border-[1.72px] border-primary"
                type="text"
              />

              {emailerr && (
                <p className="text-red-500">
                  {" "}
                  Email Field is empty or invalid email
                </p>
              )}
            </div>

            <div className="relative mt-[61px]">
              <label
                className="font-nunito font-semibold text-[13px] text-primary absolute top-[-9px] left-[42px] bg-white px-[18px]"
                htmlFor=""
              >
                Full Name
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                  isNameerr(false);
                }}
                className="px-[52px] py-[26px] font-nunito font-semibold text-[20px] text-primary  w-[368px] h-[81px] rounded-[8px]  border-[1.72px] border-primary"
                type="text"
              />

              {nameerr && <p className="text-red-500">Name field is empty</p>}
            </div>

            <div className="relative mt-[61px]">
              <label
                className="font-nunito font-semibold text-[13px] text-primary absolute top-[-9px] left-[42px] bg-white px-[18px]"
                htmlFor=""
              >
                Password
              </label>

              <input
                className="px-[52px] py-[26px] font-nunito font-semibold text-[20px] text-primary  w-[368px] h-[81px] rounded-[8px]  border-[1.72px] border-primary"
                onChange={(e) => {
                  setPassword(e.target.value);
                  isPasserr(false);
                }}
                type={hide ? "password" : "text"}
              />

              {hide ? (
                <FaEyeSlash
                  onClick={handleHide}
                  size={25}
                  className="absolute top-[27px] right-[147px] cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={handleHide}
                  size={25}
                  className="absolute top-[27px] right-[147px] cursor-pointer"
                />
              )}

              {passerr && (
                <p className="text-red-500">Password Field is Empty</p>
              )}
            </div>

            <input
              onChange={(e) => setuploadfile(e.target.files[0])}
              className="block mt-[61px]"
              type="file"
              name=""
              id=""
            />

            {fileerr && <p className="text-red-500 "> Picture Not Added</p>}

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
                className="font-nunito font-semibold text-[20px] text-white bg-secondary py-[20px] px-[150px] rounded-[86px] mt-[51px]"
              >
                Sign up
              </button>
            )}

            <p className="font-opensans font-normal text-[13px] text-primary text-center w-[368px] mt-[35px]">
              Already have an account ?{" "}
              <Link
                className="font-opensans  font-bold text-[13px] text-[#EA6C00]"
                to="/Login"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="w-1/2 ">
        <img className="h-screen w-full object-cover" src="Signup.png" alt="" />
      </div>
    </div>
  );
};

export default Signup;
