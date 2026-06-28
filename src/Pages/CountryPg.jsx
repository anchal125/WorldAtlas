import { useEffect, useTransition, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "../Components/Loader";
import "./CountryPg.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaArrowLeftLong } from "react-icons/fa6";

export const CountryPg = () => {
  const { name } = useParams();
  const [isPending, startTransition] = useTransition();
  const [apiData, setApiData] = useState();
  const navigate = useNavigate();

  useGSAP(() => {
    if (isPending || !apiData) return;

    const tl = gsap.timeline();
    tl.from(".countrypgbox", {
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
    })
      .from(".countrypgbox img", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
      })
      .from(".countrypgbox h2", {
        opacity: 0,
        x: 200,
        duration: 0.5,
      })
      .from(".countrypgbox p", {
        opacity: 0,
        x: 200,
        duration: 0.3,
        stagger: 0.25,
      });
  }, [apiData, isPending]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await fetch(`https://restcountries.com/v5.1/name/${name}`);
        if (!data.ok) {
          throw new Error(`HTTP error! Status: ${data.status}`);
        }
        const response = await data.json();
        setApiData(response[0]);
      } catch (error) {
        navigate("/error");
      }
    });
  }, [name, navigate]);

  if (isPending || !apiData) {
    return <Loader />;
  }

  return (
    <div className="countrypg">
      <Link
        to="/Country"
        style={{ zIndex: 1, color: "blue", cursor: "pointer" }}
      >
        <FaArrowLeftLong />
      </Link>
      <div className="countrypgbox">
        <img src={apiData.flags.svg} alt="flag" />
        <div className="countrydata">
          <h2>{apiData.name.common}</h2>
          <p>
            Native Names:{" "}
            {apiData?.name?.nativeName &&
              [
                ...new Set(
                  Object.keys(apiData.name.nativeName).map(
                    (key) => apiData.name.nativeName[key].official,
                  ),
                ),
              ].join(", ")}
          </p>
          <p>Region: {apiData.region}</p>
          <p>
            Languages:{" "}
            {apiData.languages &&
              Object.keys(apiData.languages).map(
                (item) => apiData.languages[item],
              )}
          </p>
          <p>
            Currency:{" "}
            {apiData.currencies &&
              Object.keys(apiData.currencies)
                .map((item) => apiData.currencies[item].name)
                .join(", ")}
          </p>
          <p>Population: {apiData.population.toLocaleString()}</p>
          <p>Capital: {apiData.capital}</p>
        </div>
      </div>
    </div>
  );
};
