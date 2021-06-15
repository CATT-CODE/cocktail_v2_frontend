import React, { useState, useEffect } from "react";
import axios from "axios";
import Axios from "../lib/axios/Axios";
import { toast } from "react-toastify";
import "./AuthCTDetail.css";

function AuthCTDetail(props) {
	const [ingredientsArray, setIngredientsArray] = useState([]);
	const [measurementsArray, setMeasurementsArray] = useState([]);
	const [ctInstructions, setCtInstructions] = useState("");
	const [ctCategory, setCtCategory] = useState("");
	const [ctName, setCtName] = useState("");
	const [ctGlass, setCtGlass] = useState("");
	const [ctImg, setCtImg] = useState("");
	const [ctID, setCtID] = useState("");
	const [toggleInput, setToggleInput] = useState("");
	const [isToggle, setIsToggle] = useState(false);

	useEffect(() => {
		const getData = async () => {
			let payload = await axios.get(
				`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${props.match.params.id}`
			);

			let raw = Object.values(payload.data.drinks[0]);
			let rawIngredients2 = raw.slice(17, 32);
			let finalIngredients = rawIngredients2.filter((item) => item !== null);
			let rawMeasurements2 = raw.slice(32, 47);
			let finalMeasurements = rawMeasurements2.filter((item) => item !== null);

			setIngredientsArray(finalIngredients);
			setMeasurementsArray(finalMeasurements);
			setCtInstructions(payload.data.drinks[0].strInstructions);
			setCtCategory(payload.data.drinks[0].strCategory);
			setCtName(payload.data.drinks[0].strDrink);
			setCtGlass(payload.data.drinks[0].strGlass);
			setCtImg(payload.data.drinks[0].strDrinkThumb);
			setCtID(Number(payload.data.drinks[0].idDrink));
		};
		getData();
	}, []);

	function getMeasurementsList() {
		return measurementsArray.map((item, index) => {
			return <tr key={index}>{item}</tr>;
		});
	}

	function getIngredientsList() {
		return ingredientsArray.map((item, index) => {
			return <tr key={index}>{item}</tr>;
		});
	}

	function ctInstructionsDisplay() {
		let rawText = ctInstructions
			.split(".")
			.map((item, i) => <p key={i}>{item + "."}</p>);
		rawText.pop();
		return rawText;
	}

	function handleToggleOnChange(event) {
		setToggleInput(event.target.value);
	}

	async function handleSendSms() {
		let recipeDetails = {
			ctName,
			ctID,
			toggleInput: toggleInput.replace(/\D/g, ""),
		};
		try {
			await Axios.post(
				"/users/send-sms-message",
				recipeDetails,
			);
			await setIsToggle(false);
			await toast.success(`Message successfully sent!`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (e) {
			toast.error(`Message was not sent, try again!`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			console.log(e);
		}
	}

	return (
		<body class="featurette-divider">
			<div class="row featurette">
				<div class="col-md-7 text-light">
					<h2 class="featurette-heading text-light">
						{ctName} <span class="text-muted">Recipe</span>
					</h2>
					<p />
					<p class="lead text-muted">{ctCategory}</p>
					<p class="lead text-muted">
						Glass Type <span class="text-light">{ctGlass}</span>
					</p>
					<table class="table table-sm text-light">
						<thead>
							<tr>
								<th scope="col">Ingredients</th>
								<th scope="col">Measurements</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{getIngredientsList()}</td>
								<td>{getMeasurementsList()}</td>
							</tr>
						</tbody>
					</table>
					<br />
					<p class="lead">{ctInstructionsDisplay()}</p>
					<br />
					{!isToggle ? (
						<button
							class="btn btn-secondary"
							type="button"
							onClick={() => setIsToggle(true)}
						>
							Send Recipe to a Friend
						</button>
					) : (
						<div style={{ width: "55%" }} class="input-group mb-3">
							<input
								class="form-control"
								type="text"
								onChange={(e) => handleToggleOnChange(e)}
								placeholder="(XXX) XXX-XXXX"
								value={toggleInput}
							></input>
							<div class="input-group-append">
								<button
									class="btn btn-secondary"
									type="button"
									onClick={() => handleSendSms()}
								>
									Send Message
								</button>
								<button
									class="btn btn-danger"
									type="button"
									onClick={() => setIsToggle(false)}
								>
									Cancel
								</button>
							</div>
						</div>
					)}
				</div>

				<div class="col-md-5">
					<img
						src={ctImg}
						alt="LAME"
						style={{
							height: 500,
							width: 500,
							marginLeft: 10,
							boxShadow:
								"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
						}}
					/>
				</div>
			</div>
		</body>
	);
}

export default AuthCTDetail;
