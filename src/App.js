import logo from "./logo.svg";
import "./App.css";
import Map_column from "./Components/Map_column";
import Distance from "./Components/Distance";

import DynamicInput from "react-dynamic-input";
import { useState, useRef } from "react";
// Imported all react-google-map package
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

function App() {
  const [distance, setDistance] = useState("");
  const [direction, setdirection] = useState("");
  const [waypoint, setWaypoint] = useState([{ location: "" }]);
  const [visible, setVisible] = useState(false);

  // Html ref
  const originref = useRef();
  const stopref = useRef();
  const destinationref = useRef();

  // For calculating distance
  async function calculate() {
    if (originref.current.value === "" || destinationref.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    // IF we chooses stoppage
    if (waypoint[0].location != "") {
      var results = await directionsService.route({
        origin: originref.current.value,
        destination: destinationref.current.value,
        waypoints: waypoint,

        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
    }
    // else not
    else {
      var results = await directionsService.route({
        origin: originref.current.value,
        destination: destinationref.current.value,

        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
    }

    setdirection(results);
    setDistance(results.routes[0].legs[0].distance.text);

    // For displaying DISTANCE text
    setVisible(true);
  }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });
  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="App container card shadow border-0 bg-body-tertiary rounded mt-4 p-5">
        {/* <ImageListItem key="1">
          <img src={logo} alt="Graviti-logo" loading="lazy" />
        </ImageListItem> */}
        <h4 className="text-center">
          Let's calculate <strong> distance </strong> from Google maps
        </h4>
        <div className="row mt-3 p-2">
          <div className="col-md-6 col-sm-12">
            <div className="d-flex flex-column">
              <div className="mb-3">
                <label for="exampleInputEmail1 " className="form-label">
                  Origin
                </label>
                <Autocomplete>
                  <input
                    type="text"
                    ref={originref}
                    className="form-control w-75"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </Autocomplete>
              </div>

              <div className="mb-3">
                <label for="exampleInputEmail1 " className="form-label">
                  Stop
                </label>
                <Autocomplete>
                  <DynamicInput
                    inputName="location"
                    addButtonText="➕ Add another stop"
                    setInput={setWaypoint}
                    input={waypoint}
                    addPosition="bottom"
                    type="text"
                  />
                </Autocomplete>
              </div>

              <div className="mb-3">
                <label for="exampleInputEmail1 " className="form-label">
                  Destination
                </label>
                <Autocomplete>
                  <input
                    type="text"
                    ref={destinationref}
                    className="form-control w-75"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </Autocomplete>
              </div>
              <button onClick={calculate} className="btn btn-primary w-25">
                Calculate
              </button>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <Map_column direction={direction} />
          </div>
        </div>
        {visible ? (
          <Distance
            distance={distance}
            origin={originref.current.value}
            destination={destinationref.current.value}
          />
        ) : null}
      </div>
    </>
  );
}

export default App;
