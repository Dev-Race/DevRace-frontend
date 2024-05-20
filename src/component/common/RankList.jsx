import React, { useState } from 'react';
import arrow_down_white from '../../assets/icons/arrow_down_white.svg';
import group_icon from '../../assets/icons/group_icon.svg';
import basic_small_image from '../../assets/icons/basic_small_image.svg';
import '../../styles/common/RankList.scss';
import { useSelector } from 'react-redux';

/**
 * 랭크 리스트 -> 다크, 라이트모드 설정 가능
 * rankings 객체 부모 컴포넌트에서 가져오기
 */

const RankList = ({ rankings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = useSelector((state) => state.toggle);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`rank_container--${mode}`} onClick={toggleDropdown}>
        <div className="rank_header">
          <img src={group_icon} alt="Group Icon" />
          <img src={arrow_down_white} alt="Dropdown arrow" />
        </div>
      </div>
      {isOpen && (
        <div className={`rank_list_container--${mode}`}>
          {rankings.map((ranking, index) => (
            <li
              key={index}
              className={`rank_item ${
                ranking.rank === '-' ? 'rank_item--inactive' : ''
              }`}
            >
              {ranking.rank}
              <img src={basic_small_image} alt="Basic img" />
              {ranking.name}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default RankList;
