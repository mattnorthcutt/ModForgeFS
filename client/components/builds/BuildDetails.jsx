import { Link, useParams } from "react-router-dom";
import { getBuildbyId } from "../../managers/buildManager";
import { useEffect, useState } from "react";
import ModCard from "../mods/ModCard";

export default function BuildDetails() {
  const { id } = useParams();
  const [build, setBuild] = useState(null);

  useEffect(() => {
    getBuildbyId(id).then(setBuild)
  }, [id])

  if (!build) {
    return <p>No Build</p>
  }

  return (
    

    <div className="build-details">

      <div className="build-details-footer">
        <Link to="/" className="btn btn-secondary">
          Back to My Builds
        </Link>

        <Link to={`/builds/edit/${build.id}`} className="btn btn-primary">
          Edit Build
        </Link>
      </div>

      <div className="build-details-h">
        <div className="build-details-buildinfo">
          <h2>{build.vehicleName}</h2>
          <p><strong>Goal:</strong> {build.goal} </p>
          <p><strong>Status:</strong> {build.status} </p>
          <p><strong>Budget:</strong> ${build.budget.toLocaleString()} </p>
          <p><strong>Notes:</strong> {build.notes} </p>
        </div>

        <div className="build-details-image">
          <img src={build.imageLocation} alt={build.vehicleName}/>
        </div>
      </div>

      <div className="build-details-mods">
        <div className="build-details-mods-h">
          <h3>Mod Parts for your {build.vehicleName}</h3>
        </div>

        <div className="build-details-mods-list">
          {build.modParts && build.modParts.length > 0 ? (
            build.modParts.map((mp) => (
              <ModCard key={mp.id} modPart={mp} />
              ))
            ) : (
            <p>No mods</p>
          )}
        </div>
      </div>
    </div>
  )
}
