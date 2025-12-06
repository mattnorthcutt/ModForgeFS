import { Link, useParams, useNavigate } from "react-router-dom";
import { getBuildbyId, deleteBuild } from "../../managers/buildManager";
import { useEffect, useState } from "react";
import ModCard from "../mods/ModCard";
import { deleteModPart } from "../../managers/modManager";

export default function BuildDetails() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [build, setBuild] = useState(null);

  useEffect(() => {
    getBuildbyId(id).then(setBuild)
  }, [id])

  if (!build) {
    return <p>No Build</p>
  }

  const handleDelete = () => {
    const gettingDeleted = window.confirm(
      "Are you sure you want to delete this build?"
    )
    if (!gettingDeleted) {
      return 
    }

    deleteBuild(build.id).then(() => {
      navigate("/")
    })
  }

  const handleDeleteMod = (modId) => {
    const gettingDeleted = window.confirm(
      "Are you sure you want to delete this mod part?"
    )

    if (!gettingDeleted) {
      return;
    }

    deleteModPart(modId).then(() => {
      getBuildbyId(id).then(setBuild)
    })
  }

  return (
    

    <div className="build-details">

      <div className="build-details-buttons">
        <Link to="/" className="btn btn-secondary">
          Back to My Builds
        </Link>

        <Link to={`/builds/edit/${build.id}`} className="btn btn-primary">
          Edit Build
        </Link>

        <button onClick={handleDelete} className="btn btn-danger">
          Delete Your Build
        </button>
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
          <Link to={`/builds/${build.id}/mods/new`}className="btn btn-primary">
            + Add Mod Part
          </Link>
        </div>

        <div className="build-details-mods-list">
          {build.modParts && build.modParts.length > 0 ? (
            build.modParts.map((mp) => (
              <ModCard key={mp.id} modPart={mp} onDelete={handleDeleteMod}/>
              ))
            ) : (
            <p>No mods</p>
          )}
        </div>
      </div>
    </div>
  )
}
