import React, { useState } from 'react';
import '../../styles/common/DropDown.scss';
import DropdownArrow from '../../assets/icons/down_arrow.svg';

const optionsData = {
  language: ['JavaScript', 'C++', 'Java', 'Python'],
  status: ['전체', '성공', '실패'],
};

const Dropdown = ({ type, onSelect }) => {
  const options = optionsData[type] || [];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="Dropdown_Wrapper">
      <div className="Dropdown_Selected_Item" onClick={toggleDropdown}>
        <span className="Dropdown_Selected_Item_Text">{selectedOption}</span>
        <img
          src={DropdownArrow}
          alt="Dropdown arrow"
          className="Dropdown_ArrowIcon"
        />
      </div>
      {isOpen &&
        options.map((option, index) =>
          selectedOption !== option ? (
            <div
              key={index}
              className="Dropdown_Item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ) : (
            <></>
          ),
        )}
    </div>
  );
};

export default Dropdown;
