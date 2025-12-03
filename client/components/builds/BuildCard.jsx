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

        
      </div>
    </div>
  )
}
