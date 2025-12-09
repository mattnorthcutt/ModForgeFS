import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getModPartById, setTagsForModPart, updateModPart } from "../../managers/modManager";
import { BRANDS, MOD_TYPES } from "./modOptions";
import { createTag, deleteTag, getAllTags, updateTag } from "../../managers/tagManager";

export default function EditModPartForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [newTagName, setNewTagName] = useState("");
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
    getAllTags().then(setAvailableTags)
    getModPartById(id).then((mod) => {
      const brands = mod.brand ? mod.brand.split(",").map((b) => b.trim()) : []
      const types = mod.modType ? mod.modType.split(",").map((t) => t.trim()) : []

      const tagIds = mod.modTags ? mod.modTags.map((mt) => mt.tagId) : []

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
      setSelectedTagIds(tagIds)
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

  const handleTagCheckbox = (tagId) => {
    setSelectedTagIds((prev) => 
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  const handleAddTag = (event) => {
    event.preventDefault()

    const trimmedTag = newTagName.trim();
    if(!trimmedTag)return

    createTag({ name: trimmedTag }).then((created) => {
      setAvailableTags((prev) => [...prev, created])
      setSelectedTagIds((prev) => [...prev, created.id])
      setNewTagName("")
    })
  }

  const handleEditTag = (tag) => {
    const newName = window.prompt("Edit Tag Name", tag.name)
    if (!newName) return
  
    const trimmedTag = newName.trim();
    if (!trimmedTag) return
  
    updateTag(tag.id, { id: tag.id, name: trimmedTag }).then(() => {
      setAvailableTags((prev) => 
        prev.map((t) => (t.id === tag.id ? { ...t, name: trimmedTag } : t))
      )
    })
  }
    
  const handleDeleteTag = (tagId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tag?"
    )
    if (!confirmDelete) return
  
    deleteTag(tagId).then(() => {
      setAvailableTags((prev) => prev.filter((t) => t.id !== tagId))
      setSelectedTagIds((prev) => prev.filter((id) => id !== tagId))
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
      return setTagsForModPart(parseInt(id), selectedTagIds)
    }).then(() => {
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
          <label>Tags</label>
          <div className="checkbox-group">
            {availableTags.map((tag) => (
              <div key={tag.id} className="checkbox-item tag-row">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTagIds.includes(tag.id)}
                    onChange={() => handleTagCheckbox(tag.id)}
                  />
                  {tag.name}
                </label>
                <div className="tag-actions">
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEditTag(tag)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteTag(tag.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="inline-tag-form">
            <input
              type="text"
              placeholder="Add New Tag"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
            />
            <button type="button" onClick={handleAddTag}>
              Add Tag
            </button>
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
