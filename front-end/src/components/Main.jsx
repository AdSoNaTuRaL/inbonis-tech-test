import { useEffect, useState } from "react";
import "./Main.css";
import api from "../services/api";

export function Main() {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [code, setCode] = useState();

    function showList() {
        const list = document.querySelector(".options-list");
        list.classList.toggle("options-list--visible");
    }

    function hideList() {
        const list = document.querySelector(".options-list");
        list.classList.remove("options-list--visible");
    }

    function handleChange(value) {
        const filtered = activities.filter((activity) => {
            return activity.description
                .toLowerCase()
                .includes(value.toLowerCase());
        });
        setFilteredActivities(filtered);
    }

    function handleItem(e) {
        const input = document.querySelector(".form-predictive__field");
        input.value = e.target.textContent;
        setCode(e.target.value);
        hideList();
    }

    function handleSubmit(e) {
        e.preventDefault();

        const business = {
            nif: e.target.nif.value,
            activity_sector: code.toString(),
        };

        console.log(business);

        api.post("diagnosis/anon", business).then((response) => {
            console.log(response);
        });
    }

    useEffect(() => {
        api.get("activities").then((response) => {
            const sortedActivities = response.data.sort((a, b) =>
                a.description.localeCompare(b.description)
            );
            setActivities(sortedActivities);
            setFilteredActivities(sortedActivities);
        });
    }, []);

    return (
        <main className="main-content">
            <div className="wrapper wrapper--inner">
                <div className="banner banner--home">
                    <img
                        src="https://demos.inbonis.com/coach-es-informa/assets/home-banner.jpg"
                        alt=""
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <h1 className="title title--main">
                        Evalúa y mejora tu negocio
                    </h1>
                    <div className="form-group">
                        <input
                            type="text"
                            name="nif"
                            placeholder="NIF"
                            className="form-field"
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-predictive">
                            <input
                                type="text"
                                placeholder="Sector de actividad"
                                name="activity_sector"
                                id="lsu80gr1"
                                autoComplete="Off"
                                className="form-field form-predictive__field"
                                onClick={showList}
                                onChange={(e) => {
                                    handleChange(e.target.value);
                                }}
                            />
                            <label
                                htmlFor="lsu80gr1"
                                className="form-predictive__button"
                            >
                                <span>Elegir</span>
                                <svg
                                    className="icon arrow-select"
                                    viewBox="0 0 27 15"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        d="M24.005,2l-9.239,9.239c-0.974,0.974-2.553,0.974-3.527,0L2,2"
                                    ></path>
                                </svg>
                            </label>
                            <ol className="options-list">
                                {filteredActivities.map((activity) => {
                                    return (
                                        <li
                                            key={activity.code}
                                            value={activity.code}
                                            className="options-list__item"
                                            onClick={(e) => handleItem(e)}
                                        >
                                            {activity.description}
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button className="btn btn--xl">
                            <span>Continuar</span>
                            <svg
                                className="icon btn__icon arrow"
                                viewBox="0 0 14 14"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g>
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.302"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        d="M7.891,1l4.665,4.665c0.601,0.6,0.601,1.573,0,2.174l-4.665,4.664"
                                    ></path>
                                    <line
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.302"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        x1="12.839"
                                        y1="6.751"
                                        x2="1"
                                        y2="6.751"
                                    ></line>
                                </g>
                            </svg>
                        </button>
                    </div>
                </form>
                <ol className="diagnosis-steps">
                    <li className="diagnosis-steps__item">
                        <span className="diagnosis-steps__hex">
                            <svg
                                className="icon diagnosis-steps__icon textWrite"
                                viewBox="0 0 36 36"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <desc>
                                    Introduce el NIF y la actividad de tu
                                    negocio
                                </desc>
                                <g>
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        d="M13.25,0.75 c1.5,0,9.5,0,9.5,0"
                                    ></path>
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        d="M13.25,35.25 c1.5,0,9.5,0,9.5,0"
                                    ></path>
                                    <line
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        x1="18"
                                        y1="0.845"
                                        x2="18"
                                        y2="35.25"
                                    ></line>
                                </g>
                            </svg>
                        </span>
                        <p>Introduce el NIF y la actividad de tu negocio</p>
                    </li>
                    <li className="diagnosis-steps__item">
                        <span className="diagnosis-steps__hex">
                            <svg
                                className="icon diagnosis-steps__icon tick"
                                viewBox="0 0 36 36"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <desc>Contesta un breve cuestionario</desc>
                                <polyline
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    points="2.333,21.167 10.667,29.5 33.667,6.5 "
                                ></polyline>
                            </svg>
                        </span>
                        <p>Contesta un breve cuestionario</p>
                    </li>
                    <li className="diagnosis-steps__item">
                        <span className="diagnosis-steps__hex">
                            <svg
                                className="icon diagnosis-steps__icon grafic"
                                viewBox="0 0 36 36"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <desc>
                                    Consigue una evaluación y consejos de mejora
                                </desc>
                                <g>
                                    <polyline
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        points="2.825,4.27 2.825,31.191 31.526,31.191   "
                                    ></polyline>
                                    <polyline
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        points="8.34,19.587 16.142,11.786 20.508,16.152 30.138,6.521  "
                                    ></polyline>
                                    <polyline
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        points="25.162,6.521 30.138,6.521 30.138,11.498   "
                                    ></polyline>
                                </g>
                            </svg>
                        </span>
                        <p>Consigue una evaluación y consejos de mejora</p>
                    </li>
                </ol>
            </div>
        </main>
    );
}
