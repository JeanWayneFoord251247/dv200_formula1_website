import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { teamStyles } from "../Data/TeamData";
import "../App.css";

function F1Dropdown({
  options,
  onSelect,
  activeTab,
  placeholder,
  selectedItem,
}) {
  const isDriver = activeTab === "drivers";

  const getButtonTitle = () => {
    if (!selectedItem) return placeholder;
    return isDriver
      ? `${selectedItem.givenName} ${selectedItem.familyName}`
      : selectedItem.name;
  };

  const handleSelect = (id) => {
    const found = options.find(
      (item) => item.driverId === id || item.constructorId === id
    );
    onSelect(found || null);
  };

  const getItemColor = (item) => {
    if (!item) return "#444";
    const teamId = item.Constructor?.constructorId || item.constructorId;
    const team = teamStyles[teamId];
    if (!team) return "#444";

    if (isDriver && team.drivers && team.drivers[item.driverId]) {
      return team.drivers[item.driverId];
    }
    return team.mainColor || "#444";
  };

  const selectedColor = selectedItem ? getItemColor(selectedItem) : null;

  return (
    <div className="custom-select-wrapper">
      <DropdownButton
        id="dropdown-basic-button"
        className="f1-dropdown"
        title={
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            {selectedColor && (
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: selectedColor,
                  boxShadow: `0 0 6px ${selectedColor}`,
                  display: "inline-block",
                }}
              />
            )}
            {getButtonTitle()}
          </span>
        }
        onSelect={handleSelect}
        variant="dark"
      >
        <Dropdown.Item eventKey="">{placeholder}</Dropdown.Item>
        <Dropdown.Divider />

        {options.map((item) => {
          const id = item.driverId || item.constructorId;
          const label = isDriver
            ? `${item.givenName} ${item.familyName}`
            : item.name;
          const color = getItemColor(item);

          return (
            <Dropdown.Item
              key={id}
              eventKey={id}
              className="dropdown-item"
              style={{ "--team-color": color }}
            >
              {label}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
}

export default F1Dropdown;