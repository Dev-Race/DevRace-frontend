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
import { fetchAllRoomsData } from '../apis/room';

const MyCodePage = () => {
  const { mode } = useSelector((state) => state.toggle);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('전체');
  const [searchResult, setSearchResult] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [myRoomsData, setMyRoomsData] = useState([]);

  const fetchData = async () => {
    try {
      const isPass =
        selectedOption === '성공' ? 1 : selectedOption === '실패' ? 0 : null;
      const data = await fetchAllRoomsData(0, isPass, searchResult);
      console.log('Fetched data:', data);
      setMyRoomsData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch rooms data:', error);
      setMyRoomsData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption, searchResult]);

  useEffect(() => {
    console.log('My Rooms Data:', myRoomsData);
    console.log('Type of myRoomsData:', typeof myRoomsData);
    console.log('Is myRoomsData an array:', Array.isArray(myRoomsData));
  }, [myRoomsData]);

  const handleSelect = (select) => {
    setSelectedOption(select);
    setCurrentPage(1);
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const pageSize = 9;
  const totalPages = Math.ceil(myRoomsData.length / pageSize);
  const displayedData = myRoomsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleClick = (roomId) => {
    navigate(`/solve/${roomId}`);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

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
          {displayedData.map((item, index) => (
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
