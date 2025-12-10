import { useEffect, useState } from "react";
import { getMyBuilds } from "../../managers/buildManager";
import BuildCard from "./BuildCard";
import { Link } from "react-router-dom";
import "../../src/styles/builds.css"

export default function BuildList() {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    getMyBuilds().then(setBuilds)
  }, [])


  return (
    <div className="build-list page-container">
      <h2>My Builds</h2>
      <Link to="/builds/new" className="btn btn-primary" style={{
      }}>
        + Add Build
      </Link>
      <div className="build-list-layout"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.5rem",
        paddingBottom: "2rem",
      }}>
        {builds.map((b) => (
          <BuildCard key={b.id} build={b} />
        ))}
      </div>
    </div>
  )
}
