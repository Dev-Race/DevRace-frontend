import { useState } from 'react';
import './DropDown.scss';
import down_arrow from '../../icons/down_arrow.svg';

/**
 * 드롭다운 타입 -> language , status
 * -> 선택된 option 은 부모 컴포넌트에서 onSelect 로 가져옴
 */

const Dropdown = ({ type, onSelect }) => {
  const languages = ['JavaScript', 'C++', 'Java', 'Python'];
  const statuses = ['전체', '성공', '실패'];

  const options = type === 'language' ? languages : statuses;

  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // 부모 컴포넌트로 선택항목 전달
  };

  return (
    <div className="dropdown_container">
      <div className="dropdown_selected_container" onClick={toggleDropdown}>
        <span>{selectedOption}</span>
        <img src={down_arrow} alt="Dropdown arrow" />
      </div>
      {isOpen && (
        <>
          <div>
            {options.map((option, index) => (
              <li
                key={index}
                className={`dropdown_item_container ${
                  selectedOption === option ? 'selected' : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
