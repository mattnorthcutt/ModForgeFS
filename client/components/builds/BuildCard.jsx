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

        {build.isPublic ? (
          <span className="badge bg-danger ms-2">Public</span>
        ) : (
          <span className="badge bg-dark ms-2">Private</span>
        )}

        <div className="build-card-buttons">
          <Link to={`/builds/${build.id}`} className="btn btn-sm btn-primary">
            View Details
          </Link>
        </div>

      </div>
    </div>
  )
}
