import { Link } from "react-router-dom";

export default function BuildCard({ build }) {
  return (
    <div className="build-card">
      <img src={build.imageLocation} alt={build.vehicleName} className="build-card-image"/>

      <div className="build-card-body">
        <h3 className="build-card-title">{build.vehicleName}</h3>

        <p className="build-card-goal">Goal: {build.goal}</p>

        <p className="build-card-status">
          Status: <strong>{build.status}</strong>
        </p>

        <p className="build-card-budget">
          Budget: ${build.budget.toLocaleString()}
        </p>

        <p className="build-card-notes">
          {build.notes}
        </p>

        <div className="build-card-buttons">
          <Link to={`/builds/${build.id}`} className="btn btn-sm btn-primary">
            View Details
          </Link>
        </div>

      </div>
    </div>
  )
}
