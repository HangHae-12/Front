import React, { useState, useRef, useEffect } from "react";
import StyledDropdown from "./styled";

const Dropdown = ({ isReadOnly, buttonLabel, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleDropdown = () => {
    if (!isReadOnly) {
      setIsOpen(!isOpen);
    }
  };

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledDropdown.Container ref={containerRef}>
      <StyledDropdown.Button onClick={toggleDropdown} isReadOnly={isReadOnly}>
        {buttonLabel}
        {!isReadOnly ? <StyledDropdown.Icon /> : null}
      </StyledDropdown.Button>
      <StyledDropdown.Menu isOpen={isOpen}>{children}</StyledDropdown.Menu>
    </StyledDropdown.Container>
  );
};

const Item = ({ children, onClick }) => {
  return (
    <StyledDropdown.Item onClick={onClick}>{children}</StyledDropdown.Item>
  );
};

Dropdown.Item = Item;

export default Dropdown;
