import React from "react";

const Distance = (props) => {
  return (
    <div className="row mt-3">
      <div className="col-4 d-flex justify-content-between">
        <h4 className="bold-900">Distance</h4>
        <h4 style={{ color: "var(--blue-color)" }}>{props.distance}s</h4>
      </div>
      <p className="text-black">
        The distance between <strong>{props.origin} </strong> and{" "}
        <strong>{props.destination}</strong> via the seleted route is{" "}
        <strong>{props.distance}s</strong>.{" "}
      </p>
    </div>
  );
};

export default Distance;
