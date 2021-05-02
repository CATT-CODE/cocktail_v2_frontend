import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AuthCTDetail.css";

function AuthCTDetail (props) {

	const [ctData, setCtData] = useState([]);
	const [ingredientsArray, setIngredientsArray] = useState([]);
	const [measurementsArray, setMeasurementsArray] = useState([]);
	const[ctInstructions, setCtInstructions] = useState("");
	const [ctCategory, setCtCategory] = useState("");
	const [ctName, setCtName] = useState("");
	const [ctGlass, setCtGlass] = useState("");
	const[ctImg, setCtImg] = useState("");
	
	useEffect(() => {
		const getData = async () => {
			let payload = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${props.match.params.id}`);
			setCtData(payload.data.drinks[0])

			let rawIngredients = Object.values(this.state.ctData);
			let rawIngredients2 = rawIngredients.slice(17, 32);
			let finalIngredients = rawIngredients2.filter((item) => item !== null);
			let rawMeasurements = Object.values(this.state.ctData);
			let rawMeasurements2 = rawMeasurements.slice(32, 47);
			let finalMeasurements = rawMeasurements2.filter((item) => item !== null);

			setIngredientsArray(finalIngredients);
			setMeasurementsArray(finalMeasurements);
			setCtInstructions(ctData.strInstructions);
			setCtCategory(ctData.strCategory);
			setCtName(ctData.strDrink);
			setCtGlass(ctData.strGlass);
			setCtImg(ctData.strDrinkThumb)
		}
		getData();
	}, [])



	function getMeasurementsList () {
		return measurementsArray.map((item, index) => {
			return (
				<tr key={index}>
					<td>{item}</td>
				</tr>
			);
		});
	};

	function getIngredientsList () {
		return ingredientsArray.map((item, index) => {
			return (
				<tr key={index}>
					<td>{item}</td>
				</tr>
			);
		});
	};

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
						<span class="lead">{ctInstructions}</span>
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
