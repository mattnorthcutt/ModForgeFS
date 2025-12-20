import { useEffect, useState } from "react";
import { getPublicBuilds } from "../../managers/buildManager";
import BuildCard from "../builds/BuildCard";

export default function CommunityBuildList() {
  const [publicBuilds, setPublicBuilds] = useState([]);

  useEffect(() => {
    getPublicBuilds().then(setPublicBuilds);
  }, []);

  return (
    <div className="build-list page-container">
      <h2>Community Builds</h2>

      <div className="build-list-layout">
        {publicBuilds.map((b) => (
          <BuildCard key={b.id} build={b} />
        ))}
      </div>
    </div>
  );
}
