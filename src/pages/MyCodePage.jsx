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
import { fetchRoomsData } from '../apis/room';

const MyCodePage = () => {
  const { mode } = useSelector((state) => state.toggle);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('전체');
  const [searchResult, setSearchResult] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [myRoomsData, setMyRoomsData] = useState();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRoomsData();
        setMyRoomsData(data);
      } catch (error) {
        console.error('Failed to fetch rooms data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('My Rooms Data:', myRoomsData);
  }, [myRoomsData]);

  const handleSelect = (select) => {
    setSelectedOption(select);
    setCurrentPage(1);
  };

  const filteredData = myRoomsData?.content.filter((item) => {
    const numberString = String(item.number);
    const matchSearch = numberString
      .toLowerCase()
      .includes(searchResult.toLowerCase());

    const optionsStatus =
      selectedOption === '전체' ||
      (selectedOption === '성공' && item.isPass === 1) ||
      (selectedOption === '실패' && item.isPass === 0);

    return matchSearch && optionsStatus;
  });

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const pageSize = myRoomsData?.pageable.pageSize || 9;
  const totalElements = myRoomsData?.totalElements || 0;
  const totalPages = Math.ceil(totalElements / pageSize);

  const handleClick = (roomId) => {
    navigate(`/solve/${roomId}`, { state: { isRetry: 1 } });
  };

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
            <span style={{ marginLeft: '200px' }}>성공여부</span>
          </div>
          {filteredData &&
            filteredData.map((item, index) => (
              <div key={index} className="MyCode--Content--Container">
                <div className="MyCode--LeftContent--Container">
                  <div className="MyCode--Date">
                    {formatDate(item.createdTime)}
                  </div>

                  <div className="MyCode--Number">
                    {item.number}.{item.language}
                  </div>
                </div>
                <div className="MyCode--SuccessOrFail">
                  <img
                    src={
                      item.isPass === 1
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
                <div
                  className="MyCode--CheckBtn"
                  onClick={() => handleClick(item.roomId)}
                >
                  문제확인
                </div>
              </div>
            ))}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      <Footer type="default" />
    </>
  );
};

export default MyCodePage;
