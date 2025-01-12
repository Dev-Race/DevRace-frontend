import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import arrow_down_white from '../../assets/icons/arrow_down_white.svg';
import group_icon from '../../assets/icons/group_icon.svg';
import basic_small_image from '../../assets/icons/basic_small_image.svg';
import '../../styles/common/RankList.scss';

/**
 * Rank List component with dark/light mode support.
 * The `rankings` object is passed from the parent component.
 */

const RankList = ({ rankings, roomState }) => {
  const { mode } = useSelector((state) => state.toggle);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`rank-container rank-container--${mode}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="rank-wrapper">
          <img src={group_icon} alt="Group Icon" />
          <img src={arrow_down_white} alt="Dropdown arrow" />
        </div>
        {isOpen && (
          <div className={`rank-list rank-list--${mode}`}>
            {rankings.map((ranking, index) => (
              <div
                key={index}
                className={`rank-item ${
                  ranking.rank === '-' ? 'rank-item--inactive' : ''
                }`}
              >
                {index + 1}
                <img
                  src={
                    ranking.senderImageUrl
                      ? ranking.senderImageUrl
                      : ranking.imageUrl
                      ? ranking.imageUrl
                      : basic_small_image
                  }
                  alt=""
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '10px',
                  }}
                />
                <div style={{ fontSize: '14px' }}>
                  {roomState === 'RETRY' || roomState === 'FINISH'
                    ? ranking.nickname
                    : ranking.senderName}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RankList;
