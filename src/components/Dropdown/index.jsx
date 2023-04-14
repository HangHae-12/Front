import React, { useState, useRef, useEffect } from "react";
import StyledDropdown from "./styled";

const Dropdown = ({
  isReadOnly,
  buttonLabel,
  children,
  buttonStyle,
  menuStyle,
  containerStyle,
}) => {
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

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledDropdown.Container
      ref={containerRef}
      containerStyle={containerStyle}
    >
      <StyledDropdown.Button
        onClick={toggleDropdown}
        isReadOnly={isReadOnly}
        buttonStyle={buttonStyle}
      >
        {buttonLabel}
        {!isReadOnly ? <StyledDropdown.Icon /> : null}
      </StyledDropdown.Button>
      <StyledDropdown.Menu
        isOpen={isOpen}
        menuStyle={menuStyle}
        onClick={closeDropdown}
      >
        {children}
      </StyledDropdown.Menu>
    </StyledDropdown.Container>
  );
};

const Item = ({ children, onClick, itemStyle }) => {
  return (
    <StyledDropdown.Item onClick={onClick} itemStyle={itemStyle}>
      {children}
    </StyledDropdown.Item>
  );
};

Dropdown.Item = Item;

export default Dropdown;
