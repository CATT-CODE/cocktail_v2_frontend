import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
import { checkIsUserLoggedIn } from "../../lib/helpers";
import Axios from "../../lib/axios/Axios";

import "../SignUp/SignUp.css";

function Login(props) {
		const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const navigate = async () => {
			const authorized = await checkIsUserLoggedIn();

			if (authorized) {
				history.push("/");
				console.log(history);
			}
		};

		navigate();
	}, [])

	async function handleLoginSubmit(e) {
		e.preventDefault();
		try {
			let result = await Axios.post("/users/login", {
				email,
				password,
			});

			localStorage.setItem("jwtToken", result.data.jwtToken);

			let decodedJWToken = jwtDecode(result.data.jwtToken);

			props.handleUserLogin(decodedJWToken);

			history.push("/");
			toast.success("Sweet, lets mix a drink!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (e) {
			console.log(e.message);
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
			<main className="form-signin">
				<form onSubmit={handleLoginSubmit}>
					<h1
						class= "h3 mb-3 fw-normal text-light"
						style={{ textAlign: "left" }}
					>
						Please Login
					</h1>
					<label htmlFor="inputEmail" className="sr-only">
					</label>
					<input
						type="text"
						id="inputEmail"
						className="form-control"
						placeholder="Email address"
						required
						autoFocus
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="inputPassword" className="sr-only"/>
					<input
						type="password"
						id="inputPassword"
						className="form-control"
						placeholder="Password"
						required
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="w-100 btn btn-lg btn-secondary" type="submit">
						Login &raquo;
					</button>
					<br />
					<br />
					<Link className="p-2" to="/sign-up" style={{ textAlign: "center" }}>
						Need to sign up?
					</Link>
				</form>
			</main>
		</body>
	);
}

export default Login;
