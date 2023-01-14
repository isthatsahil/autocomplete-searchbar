import "./styles.css";
import React, { useState } from "react";
const dataArray = [
	{
		name: "Sugar"
	},
	{
		name: "Soap"
	},
	{
		name: "Salt"
	},
	{
		name: "Rolex"
	},
	{
		name: "Apple"
	},
	{
		name: "Ants"
	},
	{
		name: "Books"
	},
	{
		name: "beyblade"
	},
	{
		name: "basket"
	}
];
const Main = () => {
	const [result, setResult] = useState([]);

	const fetchData = async (el) => {
		if (!el) {
			setResult([]);
			return;
		}
		const data = await new Promise((res, rej) => {
			res(
				dataArray.filter((eachData) =>
					eachData?.name?.toLowerCase().startsWith(el.toLowerCase())
				)
			);
		});
		console.log("fire");
		setResult(data);
	};
	const handleSearch = (e) => {
		// get the value from box
		const element = e.target.value;
		// make the api call
		fetchData(element);
	};
	const debounceFunc = (func, delay) => {
		let timer;
		return function (...args) {
			const context = this;
			console.log("this", this);
			console.log("args", args);
			clearTimeout(timer);
			timer = setTimeout(() => func.apply(context, args), delay);
		};
	};
	const optimisedSearchHandler = debounceFunc(handleSearch, 500);

	return (
		<div>
			<h4>AutoComplete Search</h4>
			<input type="text" onChange={optimisedSearchHandler} />
			<div>
				<ul>
					{result?.map((res) => (
						<li key={res}>{res?.name}</li>
					))}
				</ul>
			</div>
		</div>
	);
};
export default function App() {
	return (
		<div className="App">
			<Main />
		</div>
	);
}
