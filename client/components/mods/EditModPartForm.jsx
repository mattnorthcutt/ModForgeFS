import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getModPartById, updateModPart } from "../../managers/modManager";
import { BRANDS, MOD_TYPES } from "./modOptions";

export default function EditModPartForm() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formField, setFormField] = useState({
    selectedBrands: [],
    selectedTypes: [],
    modName: "",
    cost: "",
    installDate: "",
    link: "",
    notes: "",
    buildId: null,
  });

  useEffect(() => {
    getModPartById(id).then((mod) => {
      const brands = mod.brand ? mod.brand.split(",").map((b) => b.trim()) : []
      const types = mod.modType ? mod.modType.split(",").map((t) => t.trim()) : []

      setFormField({
        selectedBrands: brands,
        selectedTypes: types,
        modName: mod.modName,
        cost: mod.cost,
        installDate: mod.installDate.slice(0, 10),
        link: mod.link,
        notes: mod.notes,
        buildId: mod.buildId
      })
    })
  }, [id])

  const handleChange = (event) => {
    const { name, value} = event.target

    setFormField((prev) => ({
      ...prev, [name]: value, 
    }))
  }

  const handleBrandCheckbox = (brand) => {
    setFormField((prev) => {
      const alreadySelected = prev.selectedBrands.includes(brand)

      return {
        ...prev, selectedBrands: alreadySelected ? prev.selectedBrands.filter((b) => b !== brand) : [...prev.selectedBrands, brand],
      }
    })
  }

  const handleTypeCheckbox = (type) => {
    setFormField((prev) => {
      const alreadySelected = prev.selectedTypes.includes(type)

      return {
        ...prev, selectedTypes: alreadySelected ? prev.selectedTypes.filter((t) => t !== type) : [...prev.selectedTypes, type],
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const modFields = {
      id: parseInt(id),
      buildId: formField.buildId,
      brand: formField.selectedBrands.join(", "),
      modName: formField.modName,
      modType: formField.selectedTypes.join(", "),
      cost: formField.cost ? parseFloat(formField.cost) : 0,
      installDate: formField.installDate || null,
      link: formField.link,
      notes: formField.notes,
    }

    updateModPart(id, modFields).then(() => {
      navigate(`/builds/${formField.buildId}`)
    })
  }

  if (formField.buildId === null) {
    return <p>Errrorrrrrr Loading</p>
  }

  return (
    <div className="mod-form">
      <h2>Edit Mod Part</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="modName">Mod Name</label>
          <input
            id="modName"
            name="modName"
            type="text"
            value={formField.modName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Brands</label>
          <div className="checkbox-group">
            {BRANDS.map((brand) => (
              <label key={brand} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formField.selectedBrands.includes(brand)}
                  onChange={() => handleBrandCheckbox(brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Mod Types</label>
          <div className="checkbox-group">
            {MOD_TYPES.map((type) => (
              <label key={type} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formField.selectedTypes.includes(type)}
                  onChange={() => handleTypeCheckbox(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cost">Cost</label>
          <input
            id="cost"
            name="cost"
            type="number"
            value={formField.cost}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="installDate">Install Date</label>
          <input
            id="installDate"
            name="installDate"
            type="date"
            value={formField.installDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="link">Product Link</label>
          <input
            id="link"
            name="link"
            type="text"
            value={formField.link}
            onChange={handleChange}
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
