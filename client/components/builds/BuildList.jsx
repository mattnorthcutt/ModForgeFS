import { useEffect, useState } from "react";
import { getMyBuilds } from "../../managers/buildManager";
import BuildCard from "./BuildCard";

export default function BuildList() {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    getMyBuilds().then(setBuilds)
  }, [])


  return (
    <div className="build-list">
      <h2>My Builds</h2>
      <div className="build-list-layout">
        {builds.map((b) => (
          <BuildCard key={b.id} build={b} />
        ))}
      </div>
    </div>
  )
}
