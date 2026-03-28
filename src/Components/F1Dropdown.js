import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../App.css";

function F1Dropdown({
  options,
  onSelect,
  activeTab,
  placeholder,
  selectedItem,
}) {
  /* these properties act as inputs for a machine to tell it how it should behave */

  const getButtonTitle = () => {
    if (!selectedItem)
      return placeholder; /* !selectedItem checks if the option is null, empty or undefined, if the driver has not selected a driver it returns the placeholder */
    return activeTab ===
      "drivers" /* here we check if the active tab is drivers */
      ? `${selectedItem.givenName} ${selectedItem.familyName}` /* the ? checks if the drivers tab is selected then it put the drivers given name and family name usually there surname and puts it into a string */
      : selectedItem.name; /* the : says if we are not in the drivers tab then return just the team name */
  };

  const handleSelect = (id) => {
    const found = options.find(
      /* here we look threw the entire list of drivers/teams one by one */
      (item) =>
        item.driverId === id ||
        item.constructorId ===
          id /* here we want the program to return whatever we selected whether from the drivers OR(||) the constructors*/,
    );
    onSelect(found || null); /*here we send the result back to compare.js */
  };

  return (
    <div className="custom-select-wrapper">
      <DropdownButton
        id="dropdown-basic-button"
        className="f1-dropdown"
        title={getButtonTitle()}
        onSelect={handleSelect}
        variant="dark"
      >
        <Dropdown.Item eventKey="">{placeholder}</Dropdown.Item>
        <Dropdown.Divider />

        {options.map((item) => {
          /* here map loops threw the options array and item represents the specific driver/constructor tht its holding in its hand */
          const id =
            item.driverId ||
            item.constructorId; /* here we have a variable which doesn't change hense the const and its called id it checks if the activeTab is drivers and returns those ids or if its contstructors then returns undefined and checks throough the second list of options and then saves that into id */
          const label =
            activeTab === "drivers"
              ? `${item.givenName} ${item.familyName}`
              : item.name;

          return (
            <Dropdown.Item key={id} eventKey={id} className="f1-dropdown-item">
              {label}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
}

export default F1Dropdown;
