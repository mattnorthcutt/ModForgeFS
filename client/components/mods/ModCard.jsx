import { useNavigate } from "react-router-dom";

export default function ModCard({ modPart }) {
  const navigate = useNavigate()

  if (!modPart) {
    return null;
  }

  return (
    <div className="modpart-card">
      <button className="btn btn-secondary" onClick={() => navigate(`/mods/edit/${modPart.id}`)}>
        Edit
      </button>
      <div className="modpart-card-h">
        <h4 className="modpart-title">{modPart?.modName}</h4>
        <p className="modpart-brand">
          <strong>Brand:</strong> {modPart?.brand}
        </p>
      </div>

      <div className="modpart-card-body">
        <p className="modpart-type">
          <strong>Type:</strong> {modPart?.modType}
        </p>
      </div>

      <p className="modpart-cost">
        <strong>Cost:</strong> ${modPart?.cost.toLocaleString()}
      </p>

      <p className="modpart-notes">
        {modPart?.notes}
      </p>

      <div className="modpart-tags">
        {modPart.modTags && modPart?.modTags.length > 0 ? (
          modPart.modTags.map((mt) => (
            <span key={mt.id} className="tag-pill">
              {mt.tag.name} 
            </span>
          ))
        ) : (
          <span className="tag-pill tag-pill-empty">No tags </span>
        )}
      </div>
    </div>
  )
}
