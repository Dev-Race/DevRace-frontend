import '../styles/pages/MyCodePage.scss';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import Pagination from '../component/common/Pagination';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import search_white from '../assets/icons/search_white.svg';
import search_dark from '../assets/icons/search.svg';
import success_light from '../assets/icons/success_light.svg';
import success_dark from '../assets/icons/success_dark.svg';
import fail_light from '../assets/icons/fail_light.svg';
import fail_dark from '../assets/icons/fail_dark.svg';

const MyCodePage = () => {
  const { mode } = useSelector((state) => state.toggle);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('전체');
  const [searchResult, setSearchResult] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /*
  // 페이지 접근 권한 검사
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const expirationTime = sessionStorage.getItem('expirationTime');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (!accessToken || !expirationTime || !refreshToken) {
      sessionStorage.clear();
      navigate('/');
    }
  }, []);
  */

  const handleSelect = (select) => {
    setSelectedOption(select);
    setCurrentPage(1);
  };

  const data = [
    { date: '2024.01.03', number: '1203.cpp', status: 'success' },
    { date: '2024.01.03', number: '1204.cpp', status: 'fail' },
    { date: '2024.01.03', number: '1205.cpp', status: 'success' },
    { date: '2024.01.03', number: '1203.cpp', status: 'success' },
    { date: '2024.01.03', number: '1204.cpp', status: 'fail' },
    { date: '2024.01.03', number: '1205.cpp', status: 'success' },
    { date: '2024.01.03', number: '1203.cpp', status: 'success' },
    { date: '2024.01.03', number: '1204.cpp', status: 'fail' },
    { date: '2024.01.03', number: '1205.cpp', status: 'success' },
    { date: '2024.01.03', number: '1203.cpp', status: 'success' },
    { date: '2024.01.03', number: '1204.cpp', status: 'fail' },
    { date: '2024.01.03', number: '1205.cpp', status: 'success' },
    { date: '2024.01.03', number: '1203.cpp', status: 'success' },
    { date: '2024.01.03', number: '1204.cpp', status: 'fail' },
    { date: '2024.01.03', number: '1205.cpp', status: 'success' },
    { date: '2024.01.03', number: '1203.cpp', status: 'success' },
    { date: '2024.01.03', number: '1204.cpp', status: 'fail' },
    { date: '2024.01.03', number: '1205.cpp', status: 'success' },
    { date: '2024.01.03', number: '1203.cpp', status: 'success' },
    { date: '2024.01.03', number: '1204.cpp', status: 'fail' },
    { date: '2024.01.03', number: '1205.cpp', status: 'success' },
    { date: '2024.01.03', number: '1203.cpp', status: 'success' },
    { date: '2024.01.03', number: '1204.cpp', status: 'fail' },
    { date: '2024.01.03', number: '1205.cpp', status: 'success' },
    { date: '2024.01.03', number: '1203.cpp', status: 'success' },
    { date: '2024.01.03', number: '1204.cpp', status: 'fail' },
    { date: '2024.01.03', number: '1205.cpp', status: 'success' },
    { date: '2024.01.03', number: '1203.cpp', status: 'success' },
    { date: '2024.01.03', number: '1204.cpp', status: 'fail' },
    { date: '2024.01.03', number: '1205.cpp', status: 'success' },
  ];

  const filteredData = data.filter((item) => {
    const matchSearch = item.number
      .toLowerCase()
      .includes(searchResult.toLowerCase());

    const optionsStatus =
      selectedOption === '전체' ||
      (selectedOption === '성공' && item.status === 'success') ||
      (selectedOption === '실패' && item.status === 'fail');

    return matchSearch && optionsStatus;
  });

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <Header
        headerType="mycode"
        text="내 코드 페이지"
        onSelect={handleSelect}
      />
      <div className={`MyCode--Container--${mode}`}>
        <div className={`MyCode--SearchBar--Container--${mode}`}>
          <img
            src={mode === 'light' ? search_white : search_dark}
            alt="Search Icon"
            className="MyCode--SearchIcon"
          />
          <input
            className={`MyCode--SearchBar--${mode}`}
            placeholder="Search"
            onChange={(e) => setSearchResult(e.target.value)}
          />
        </div>
        <div className="MyCode--List--Container">
          <div className="MyCode--ListHeader--Container">
            <span>날짜</span>
            <span>문제번호</span>
            <span style={{ marginLeft: '220px' }}>성공여부</span>
          </div>
          {paginatedData.map((item, index) => (
            <div key={index} className="MyCode--Content--Container">
              <div className="MyCode--LeftContent--Container">
                <div className="MyCode--Date">{item.date}</div>
                <div className="MyCode--Number">{item.number}</div>
              </div>
              <div className="MyCode--SuccessOrFail">
                <img
                  src={
                    item.status === 'success'
                      ? mode === 'light'
                        ? success_light
                        : success_dark
                      : mode === 'light'
                      ? fail_light
                      : fail_dark
                  }
                  alt="SuccessOrFail"
                />
              </div>
              <div className="MyCode--CheckBtn">문제확인</div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
      <Footer type="default" />
    </>
  );
};

export default MyCodePage;
