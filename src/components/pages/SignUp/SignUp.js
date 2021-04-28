import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { checkIsUserLoggedIn } from "../lib/helpers";
import Axios from "../../lib/axios/Axios";

import useSignUpHooks from "./useSignUpHooks";

function SignUp(props) {

	const [firstName, setFirstName] = useSignUpHooks()
	const [lastName, setLastName] = useSignUpHooks()
	const [email, setEmail] = useSignUpHooks()
	const [password, setPassword] = useSignUpHooks()
	const [confirmPassword, setConfirmPassword] = useSignUpHooks()
  

  // componentDidMount() {
  //   if (checkIsUserLoggedIn()) {
  //     this.props.history.push("/");
  //   } else {
  //     this.props.history.push("/sign-up");
  //   }
  // }


  // async function handleOnSubmit(event) {
  //   event.preventDefault();
  //   let { firstName, lastName, email, password } = this.state;
  //   // if (isError) {
  //   //     toast.error("Please fix password", {
  //   //         position: "top-center",
  //   //         autoClose: 5000,
  //   //         hideProgressBar: false,
  //   //         closeOnClick: true,
  //   //         pauseOnHover: true,
  //   //         draggable: true,
  //   //         progress: undefined,
  //   //         });
  //   //     return;
  //   // }
  //   try {
  //     // await axios.post("http://localhost:3002/users/sign-up", {
  //     //   firstName,
  //     //   lastName,
  //     //   email,
  //     //   password,
  //     // });
  //     let result = await Axios.post("/users/sign-up", {
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //     })
  //     this.setState({
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       password: "",
  //       confirmPassword: "",
  //     });
  //     toast.success("Sweet, lets mix a drink!", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   } catch (e) {
  //     toast.error(e.message, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };

  return( 
      <body className="form-body" style={{ textAlign: "center" }}>
        <main class="form-signin">
          <form onSubmit={null}>
            <h1 class="h3 mb-3 fw-normal text-light" style={{ textAlign: "left" }}>Please Sign Up</h1>
            <input
              type="text"
              class="form-control"
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={firstName}
						onChange={setFirstName}
              pattern="[A-Za-z]*"
              required
              autoFocus
            />
            <label htmlFor="inputFirstName" className="sr-only" />

            <input
              type="text"
              class="form-control"
              id="lastName"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={setLastName}
              pattern="[A-Za-z]*"
              required
              autoFocus
            />
            <label htmlFor="inputLastName" className="sr-only" />
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={setEmail}
              required
              autoFocus
            />
            <label htmlFor="inputEmail" className="sr-only" />
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={setPassword}
              required
            />
            <label htmlFor="inputPassword" className="sr-only" />
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
            />
            <label htmlFor="inputConfirmPassword" className="sr-only" />
            <button class="w-100 btn btn-lg btn-secondary" type="submit">
              Sign Up &raquo;
            </button>
            <br />
            <br />
            <Link className="p-2" to="/login">
              Need to login?
            </Link>
          </form>
        </main>
      </body>
	)
}

export default SignUp;
