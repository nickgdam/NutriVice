import React, { useState } from "react";
import MealList from "../MealList";
import axios from 'axios';
import "./style.css";


export default function GetMeal({ preferences }) {
    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState('');
    const [prefs, setPrefs] = useState("");
    const [cals, setCals] = useState('');


    function handleChange(e) {
        setCalories(e.target.value)

    }

    function useCpd() {
        const decodedToken = localStorage.getItem('decodedTokenID')
        let userId = decodedToken;
        axios.get(`/api/data/${userId}`)
            .then(res => {
                const userData = res.data.slice();
                userData.sort(function (a, b) {
                    var c = new Date(a.date);
                    var d = new Date(b.date);
                    return d - c;
                })
                setCals(
                    userData[0].cpd.toString()
                );
                console.log(cals)
            })
            .catch((err) => { })
    }

    function includePref() {
        const decodedToken = localStorage.getItem('decodedTokenID')
        let userId = decodedToken;
        axios.get(`/api/dataPref/${userId}`)
            .then(res => {
                const userData = res.data.slice();
                userData.sort(function (a, b) {
                    var c = new Date(a.date);
                    var d = new Date(b.date);
                    return d - c;
                })
                setPrefs(
                    userData[0].preferences.toString()
                );
                console.log(userData[0].preferences)
            })
            .catch((err) => { })
    }

    function getMealData() {
        fetch(
            `https://api.spoonacular.com/mealplanner/generate?apiKey=9ea0b3f72d644afe9f02e4073a87573d&timeFrame=day&targetCalories=${calories}${cals}&diet=${preferences}`
        )
            .then((response) => response.json())
            .then((data) => {
                setMealData(data);
                console.log(data)
                console.log(preferences)
            })
            .catch(() => {
                console.log("error");
            })
    }

    return (

        <div className="getMeals-container">
            <div className="getMeals">
                <section className="controls">
                    <input className="form-control" type="number" placeholder="Calories (e.g. 2000)" onChange={handleChange} />
                    <br />
                    <input className="form-check-input" type="checkbox" value="" name="checked" id="flexCheckDefault" onChange={useCpd} />
                    <label className="form-check-label"> Use My Suggested Calories  </label>
                    <br />
                    <input className="form-check-input" type="checkbox" value="" name="checked" id="flexCheckDefault" onChange={includePref} />
                    <label className="form-check-label"> Use My Saved Dietary Preferences </label>

                    <p><small><strong>Note: </strong>Please enter your target calories for the day, or check the box to use your suggested calories that we have calculated with the latest information you have entered,
              <br /> Please ensure one of these options are completed to provide you the best experience from our team!
               </small></p>
                    <br />
                    <button id="filterBtn" className="btn btn-default filter-button" data-filter="irrigation" onClick={getMealData}>Get Daily Meal Plan</button>

                </section>
                {mealData && <MealList mealData={mealData} calories={calories} />}
            </div>
        </div>

    )
}

