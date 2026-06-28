import { Link } from "react-router-dom";

const error = { color: "blue", cursor: "pointer" };

export const Error = () => {
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <div>
        <h1>An Error occured</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" style={error}>
          Go Back
        </Link>
      </div>
    </div>
  );
};
