import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isShowLoading, setIsShowLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        setIsShowLoading(true);
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("failed to fetch places ");
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setIsError(error);
      }

      setIsShowLoading(false);
    }

    getData();

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
