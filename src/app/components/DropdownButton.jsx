"use client";

import Dropdown from "react-bootstrap/Dropdown";
import { BeakerIcon } from "@heroicons/react/24/solid";

function DropdownButton() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <BeakerIcon height={24} width={24} className="bi me-2" />
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownButton;
