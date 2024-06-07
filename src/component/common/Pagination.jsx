import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/common/Pagination.scss';
import prev_page from '../../assets/icons/prev_page.svg';
import next_page from '../../assets/icons/next_page.svg';

/**
 * Pagination Component
 * Props:
 * - currentPage: Number (현재 페이지)
 * - setCurrentPage: Function (페이지 변경 함수)
 */
const Pagination = (props) => {
  const { currentPage, setCurrentPage, totalPages } = props;
  const { mode } = useSelector((state) => state.toggle);

  const pagesPerGroup = 9;

  // 숫자 그룹의 시작과 끝 번호를 게산
  const groupStartNumber =
    Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
  const groupEndNumber = Math.min(
    groupStartNumber + pagesPerGroup - 1,
    totalPages,
  );

  // 현재 그룹에 들어가야할 숫자를 생성 후, 추가
  const pages = Array.from(
    { length: groupEndNumber - groupStartNumber + 1 },
    (_, i) => groupStartNumber + i,
  );

  // 숫자 관련 이벤트 핸들러 함수
  const goToPrevGroup = () => setCurrentPage(Math.max(1, groupStartNumber - 1));
  const goToNextGroup = () =>
    setCurrentPage(Math.min(totalPages, groupEndNumber + 1));

  return (
    <div className="pagination_container">
      {groupStartNumber > 1 && (
        <button className={`pagination--${mode}`} onClick={goToPrevGroup}>
          <img src={prev_page} alt="Previous group" />
        </button>
      )}

      {pages.map((page) => (
        <button
          className={`pagination--${mode}`}
          key={page}
          disabled={page === currentPage}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      {groupEndNumber < totalPages && (
        <button className={`pagination--${mode}`} onClick={goToNextGroup}>
          <img src={next_page} alt="Next group" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
