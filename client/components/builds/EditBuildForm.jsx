import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBuildbyId, updateBuild } from "../../managers/buildManager";

export default function EditBuildForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  
  const [formField, setFormField] = useState({
    id: 0,
    vehicleName: "",
    imageLocation: "",
    goal: "",
    status: "Planned",
    startDate: "",
    budget: "",
    notes: "",
    userProfileId: 0
  });

  useEffect(() => {
    getBuildbyId(id).then((build) => {
      setFormField({
        id: build.id,
        vehicleName: build.vehicleName || "",
        imageLocation: build.imageLocation || "",
        goal: build.goal || "",
        status: build.status || "Planned",
        // slice to get the correct formst for the date 
        startDate: build.startDate ? build.startDate.slice(0, 10) : "",
        budget: build.budget ?? "", 
        notes: build.notes || "",
        userProfileId: build.userProfileId,
      })
    })
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormField((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    updateBuild(id, formField).then(() => {
      navigate(`/builds/${id}`);
    });
  };

  return (
    <div className="build-form">
      <h2>Edit Build</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="vehicleName">Vehicle Name</label>
          <input
            id="vehicleName"
            name="vehicleName"
            type="text"
            value={formField.vehicleName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageLocation">Image URL</label>
          <input
            id="imageLocation"
            name="imageLocation"
            type="text"
            value={formField.imageLocation}
            onChange={handleChange}
            placeholder="image"
          />
        </div>

        <div className="form-group">
          <label htmlFor="goal">Build Goal</label>
          <input
            id="goal"
            name="goal"
            type="text"
            value={formField.goal}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formField.status}
            onChange={handleChange}
          >
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formField.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget</label>
          <input
            id="budget"
            name="budget"
            type="number"
            value={formField.budget}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formField.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}
