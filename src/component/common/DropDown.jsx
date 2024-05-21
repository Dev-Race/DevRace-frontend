import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/common/DropDown.scss';
import BlackDropdownArrow from '../../assets/icons/black_down_arrow.svg';
import WhiteDropdownArrow from '../../assets/icons/white_down_arrow.svg';

const optionsData = {
  language: ['JavaScript', 'C++', 'Java', 'Python'],
  status: ['전체', '성공', '실패'],
};

const Dropdown = (props) => {
  const { mode } = useSelector((state) => state.toggle);
  const { type, onSelect } = props;
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
    <div className={`Dropdown_Wrapper Dropdown_Wrapper--${mode}`}>
      <div className="Dropdown_Selected_Item" onClick={toggleDropdown}>
        <span className="Dropdown_Selected_Item_Text">{selectedOption}</span>
        <img
          src={(mode !== 'dark') ? BlackDropdownArrow : WhiteDropdownArrow}
          alt="Dropdown arrow"
          className="Dropdown_ArrowIcon"
        />
      </div>
      {isOpen && (
        <div className={`Dropdown_List Dropdown_List--${mode}`}>
          {options.map((option, index) =>
            selectedOption !== option ? (
              <div
                key={index}
                className={`Dropdown_Item Dropdown_Item--${mode}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
