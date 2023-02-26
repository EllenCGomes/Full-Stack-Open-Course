import { useState } from "react";
import CountryData from "./CountryData"

const CountrySearch = ({ countriesToShow }) => {
    const [clicked, setClicked] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const handleClick = (country) => {
        setClicked(country.name.common);
        setIsActive(!isActive);
    }

    if (countriesToShow) {
        if (countriesToShow.length > 10) {
            return (
                <p>"Too many matches, specify another filter"</p>
            )
        } else if (countriesToShow.length > 1) {
            return (
                countriesToShow.map((country, index) => {
                    return (
                        <div key={index} className="marginBottom">
                            <p className="inline marginRight">{country.name.common}</p>
                            <button onClick={() => handleClick(country)}>{(clicked === country.name.common && isActive) ? "Hide" : "Show"}</button>
                            {(clicked === country.name.common && isActive) ? <CountryData country={country} /> : null}
                        </div>
                    )
                }
                )
            )
        } else if (countriesToShow.length === 1) {

            return (
                <CountryData country={countriesToShow[0]} />
            )
        }
        return (
            <p>"No country found"</p>
        )
    }
}

export default CountrySearch;