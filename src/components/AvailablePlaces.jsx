import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import { getData } from "../http.js";
export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isShowLoading, setIsShowLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    async function fetchPlaces() {
      setIsShowLoading(true);
      try {
        const places = await getData();
        setAvailablePlaces(places);
        setIsShowLoading(false);
      } catch (err) {
        console.log(err);
        setIsError(err);
        setIsShowLoading(false);
      }
    }

    fetchPlaces();

    //   setIsShowLoading(true);
    //   fetch("http://localhost:3000/placess")
    //     .then((data) => {
    //       return data.json();
    //     })
    //     .catch((err) => {
    //       setIsError(err);
    //       setIsShowLoading(false);
    //     })
    //     .then((resData) => {
    //       setAvailablePlaces(resData.places);
    //       setIsShowLoading(false);
    //     });
  }, []);

  if (isError) {
    console.log("Err is " + isError);
    return <h1>Error occured ... and Error is {isError.message} </h1>;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      loadingText="Fetching the data !!"
      isLoading={isShowLoading}
    />
  );
}
