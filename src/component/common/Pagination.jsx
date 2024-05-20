/**
 * 라이트 / 다크 모드 -> light, dark
 * -> 이벤트는 부모 컴포넌트에서 작성해서 props로 넘겨줄 것 (onPageChange)
 * totalPages , currentPage 부모 컴포넌트에서 props 로 넘겨줄 것
 * default page -> 9
 */

import React from 'react';
import '../../styles/common/Pagination.scss';
import prev_page from '../../assets/icons/prev_page.svg';
import next_page from '../../assets/icons/next_page.svg';

const Pagination = ({ currentPage, totalPages, onPageChange, mode }) => {
  const pages = [];
  const pagesPerGroup = 9;

  let groupStartNumber =
    Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;

  let groupEndNumber = Math.min(
    groupStartNumber + pagesPerGroup - 1,
    totalPages,
  );

  for (let i = groupStartNumber; i <= groupEndNumber; i++) {
    pages.push(
      <button
        className={`pagination--${mode}`}
        key={i}
        disabled={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>,
    );
  }

  const goToPrevGroup = () => {
    const newCurrentPage = Math.max(1, groupStartNumber - 1);
    onPageChange(newCurrentPage);
  };

  const goToNextGroup = () => {
    const newCurrentPage = Math.min(totalPages, groupEndNumber + 1);
    onPageChange(newCurrentPage);
  };

  return (
    <div className="pagination_container">
      {/* 이전 페이지 그룹 버튼 */}
      {groupStartNumber > 1 && (
        <button className={`pagination--${mode}`} onClick={goToPrevGroup}>
          <img src={prev_page} alt="Previous group" />
        </button>
      )}

      {/* 페이지 번호 버튼 */}
      {pages}

      {/* 다음 페이지 그룹 버튼 */}
      {groupEndNumber < totalPages && (
        <button onClick={goToNextGroup} className={`pagination--${mode}`}>
          <img src={next_page} alt="Next group" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
