import '../../styles/common/PageNation.scss';
import prev_page from '../../icons/prev_page.svg';
import next_page from '../../icons/next_page.svg';

/**
 * 라이트 / 다크 모드 -> light, dark
 * -> 이벤트는 부모 컴포넌트에서 작성해서 props로 넘겨줄 것 (onPageChange)
 * totalPages , currentPage 부모 컴포넌트에서 props 로 넘겨줄 것
 */

const Pagination = ({ currentPage, totalPages, onPageChange, mode }) => {
  const pages = [];

  // 페이지 번호 생성
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        className={`page_nation--${mode}`}
        key={i}
        disabled={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>,
    );
  }

  return (
    <div className="page_nation_container">
      {/* 이전 페이지 버튼 */}
      <div
        className={`page_nation--${mode}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={prev_page} alt="Previous page" />
      </div>

      {/* 페이지 번호 버튼 */}
      {pages}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`page_nation--${mode}`}
      >
        <img src={next_page} alt="Next page" />
      </button>
    </div>
  );
};

export default Pagination;
