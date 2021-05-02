import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { checkIsUserLoggedIn } from "../../lib/helpers";
import Axios from "../../lib/axios/Axios";

import "./SignUp.css";
// import useSignUpHooks from "./useSignUpHooks";

function SignUp() {
	const history = useHistory();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// componentDidMount() {
	//   if (checkIsUserLoggedIn()) {
	//     this.props.history.push("/");
	//   } else {
	//     this.props.history.push("/sign-up");
	//   }
	// }

	useEffect(() => {
		const navigate = async () => {
			const authorized = await checkIsUserLoggedIn();

			if (authorized) {
				history.push("/");
				console.log(history);
			}
		};

		navigate();
	}, []);

	async function handleOnSubmit(e) {
		e.preventDefault();
		try {
			await Axios.post("/users/sign-up", {
				firstName,
				lastName,
				email,
				password,
			});

			history.push("/login");
			toast.success("Sign up was successful! Please login.", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (e) {
			toast.error(e.message, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}

	return (
		<body className="form-body" style={{ textAlign: "center" }}>
			<main class="form-signin">
				<form onSubmit={handleOnSubmit}>
					<h1
						class="h3 mb-3 fw-normal text-light"
						style={{ textAlign: "left" }}
					>
						Please Sign Up
					</h1>
					<input
						type="text"
						class="form-control"
						id="firstName"
						placeholder="First Name"
						name="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
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
						onChange={(e) => setLastName(e.target.value)}
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
						onChange={(e) => setEmail(e.target.value)}
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
						onChange={(e) => setPassword(e.target.value)}
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
						onChange={(e) => setConfirmPassword(e.target.value)}
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
	);
}

export default SignUp;
