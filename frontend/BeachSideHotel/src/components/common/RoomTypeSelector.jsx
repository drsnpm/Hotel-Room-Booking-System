import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType.trim() !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      handleRoomInputChange({ target: { name: "roomType", value: newRoomType } });
      setNewRoomType("");
      setShowNewRoomTypesInput(false);
    }
  };

  return (
    <>
      <select
        id="roomType"
        name="roomType"
        className="form-select mb-2"
        value={newRoom.roomType}
        onChange={(e) => {
          if (e.target.value === "Add New") {
            setShowNewRoomTypesInput(true);
          } else {
            handleRoomInputChange(e);
          }
        }}
      >
        <option value="">Select Room Type</option>
        <option value="Add New">Add New</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>

      {showNewRoomTypeInput && (
        <div className="input-group mb-2">
          <input
            className="form-control"
            type="text"
            placeholder="Enter a new room type"
            value={newRoomType}
            onChange={handleNewRoomTypeInputChange}
          />
          <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
            Add
          </button>
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
