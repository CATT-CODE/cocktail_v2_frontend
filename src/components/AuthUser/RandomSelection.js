import React, { useState, useEffect } from "react";
import axios from "axios";

function RandomSelection() {
	
	const [randomResults, setRandomResults] = useState([]);

	useEffect(() => {
		const getData = async () => {
			let payload = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail");
			const generateRandom = () => {
				const randomArray = [];
				for (let i = 0; i < 12; ) {
					const random = Math.floor(Math.random() * 100);
					if (!randomArray.includes(random)) {
						randomArray.push(random);
						i++;
					}
				}
				return randomArray;
			};
			let randomIndex = await generateRandom();
			let resultsArray = [];
			console.log(randomIndex);
			await randomIndex.map((item) => {
				return resultsArray.push(payload.data.drinks[`${item}`]);
			});
			setRandomResults(resultsArray);
		}
		getData();
	}, [])

	function showResultsArray() {
		return randomResults.map((item) => {
			return (
				<div class="col-lg-4" key={item.idDrink}>
					<img
						src={item.strDrinkThumb}
						alt="something"
						className="bd-placeholder-img rounded-circle"
						width="225"
						height="225"
						style={{
							marginBottom: 15,
							boxShadow:
								"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
						}}
					/>
					<h2 style={{ marginBottom: 15 }} class="text-light">
						{item.strDrink}
					</h2>
					<p>
						<a
							class="btn btn-secondary"
							href={`/recipe-detail/${item.idDrink}`}
						>
							View Recipe &raquo;
						</a>
					</p>
				</div>
			);
		});
	};

		return (
			<div class="container marketing">
				<h2
					style={{ marginBottom: 20, marginTop: 20, textAlign: "center" }}
					class="text-light"
				>
					Random Cocktails <span class="text-muted">To Try</span>
				</h2>
				<div class="row">{showResultsArray()}</div>
			</div>
		);
	}

export default RandomSelection;
