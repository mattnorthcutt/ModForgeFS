import { useState } from "react";
import { createBuild } from "../../managers/buildManager";
import { useNavigate } from "react-router-dom";

export default function BuildForm() {
  const navigate = useNavigate();

  const [formField, setFormField] = useState({
    vehicleName: "",
    imageLocation: "",
    goal: "",
    status: "Planned",
    startDate: "",
    budget: "",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormField((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

   const handleSubmit = (event) => {
    event.preventDefault(); 

    createBuild(formField).then(() => {
      navigate("/")
    })
  };


    return (
    <div className="build-form">
      <h2>Add New Build</h2>

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
          Save Build
        </button>
      </form>
    </div>
  );
}
