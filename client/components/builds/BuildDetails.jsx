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

  const budget = Number(build.budget) || 0;

  const totalSpent = (build.modParts || []).reduce((sum, mp) => {
    const cost = Number(mp.cost) || 0;
    return sum + cost;
  }, 0);

  const remaining = budget - totalSpent;

  const isOverBudget = remaining < 0;

  const percentUsed = budget > 0 ? Math.min(Math.max((totalSpent / budget) * 100, 0), 100) : 0;

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
          <div className="build-details-title">
            <h2>{build.vehicleName}</h2>
          </div>
          <p><strong>Goal:</strong> {build.goal} </p>
          <p><strong>Status:</strong> {build.status} </p>
          <p><strong>Notes:</strong> {build.notes} </p>
          <div className="budget-panel">
            {/* Title row for the budget section */}
            <div className="budget-panel-header">
              <h4 className="budget-panel-title">Budget Summary</h4>

              {/* Small badge that changes depending on budget state */}
              <span className={`budget-badge ${isOverBudget ? "budget-badge--danger" : "budget-badge--ok"}`}>
                {isOverBudget ? "Over Budget" : "On Track"}
              </span>
            </div>

            {/* The three key numbers */}
            <div className="budget-stats">
              <div className="budget-stat">
                <span className="budget-label">Budget</span>
                <span className="budget-value">${budget.toLocaleString()}</span>
              </div>

              <div className="budget-stat">
                <span className="budget-label">Spent</span>
                <span className="budget-value">${totalSpent.toLocaleString()}</span>
              </div>

              <div className="budget-stat">
                <span className="budget-label">Remaining</span>
                <span className={`budget-value ${isOverBudget ? "budget-value--danger" : "budget-value--ok"}`}>
                  ${remaining.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="budget-bar">
              <div
                className={`budget-bar-fill ${isOverBudget ? "budget-bar-fill--danger" : ""}`}
                style={{ width: `${percentUsed}%` }}
              />
            </div>
            {isOverBudget && (
              <p className="budget-warning">
                You are over budget by ${Math.abs(remaining).toLocaleString()}.
              </p>
            )}
          </div>
          
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
