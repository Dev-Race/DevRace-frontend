import React, { useRef, useEffect, useState, useCallback } from 'react';
import '../styles/pages/SolvePage.scss';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import { useSelector } from 'react-redux';
import scroll_light from '../assets/icons/scroll_light.svg';
import large_scroll_light from '../assets/icons/large_scroll_light.svg';
import scroll_dark from '../assets/icons/scroll_dark.svg';
import large_scroll_dark from '../assets/icons/large_scroll_dark.svg';
import check_green from '../assets/icons/check_green.svg';
import yes_black from '../assets/icons/yes_black.svg';
import no_black from '../assets/icons/no_black.svg';

import { useMonaco } from '@monaco-editor/react';
import iPlasticTheme from 'monaco-themes/themes/iPlastic.json';
import brillianceBlackTheme from 'monaco-themes/themes/Brilliance Black.json';
import axios from 'axios';
import Output from '../component/editor/Output';
import OutputDetails from '../component/editor/OutPutDetails';
import CodeEditor from '../component/editor/CodeEditor';

import OpenChatBtn from '../component/chat/OpenChatBtn';
import ChatComponent from '../component/chat/ChatComponent';
import { CSSTransition } from 'react-transition-group';
import { getProblem, getProblemStatus } from '../apis/problem';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Apis from '../apis/Api';
import * as StompJs from '@stomp/stompjs';

import Modal from '../component/common/Modal';
import errorIcon from '../assets/icons/error_icon.svg';
import submitIcon from '../assets/icons/send_icon.svg';
import retryIcon from '../assets/icons/reset_icon.svg';
import successIcon from '../assets/icons/twinkle_icon.svg';
import Button from '../component/common/Button';
import SolveExplain from '../component/solve/SolveExplain';
import Push from '../component/common/Push';

const javascriptDefault = `
`;

const SolvePage = () => {
  const { mode } = useSelector((state) => state.toggle);
  const navigate = useNavigate();

  const explainRef = useRef(null);
  const exampleRef = useRef(null);
  const solvingRef = useRef(null);
  const outputRef = useRef(null);

  const [isDraggingExplain, setIsDraggingExplain] = useState(false);
  const [isDraggingSolve, setIsDraggingSolve] = useState(false);

  const [startYExplain, setStartYExplain] = useState(0);
  const [startHeightExplain, setStartHeightExplain] = useState(0);
  const [startYSolve, setStartYSolve] = useState(0);
  const [startHeightSolve, setStartHeightSolve] = useState(0);

  const [isExampleSuccess, setIsExampleSuccess] = useState([]);
  const [code, setCode] = useState(javascriptDefault);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);

  const editorRef = useRef();
  const [languageId, setLanguageId] = useState();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [transitionOpen, setTransitionOpen] = useState(false);
  const [isFirstMounted, setIsFirstMounted] = useState(true);
  const [top, setTop] = useState(180);

  const { roomId } = useParams();
  const [problemData, setProblemData] = useState();
  const [solvedExampleCount, setSolvedExampleCount] = useState(0);
  const [problemStatus, setProblemStatus] = useState();

  const [isExit, setIsExit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [retry, setRetry] = useState(false);
  const [success, setSuccess] = useState(false);

  /**************************************************************************/
  const CHAT_WS = process.env.REACT_APP_CHAT_WS;
  const CHAT_SUB = process.env.REACT_APP_CHAT_SUB;
  const CHAT_PUB = process.env.REACT_APP_CHAT_PUB;

  let [client, setClient] = useState(null);
  const [chat, setChat] = useState(''); // 입력된 chat을 받을 변수
  const [chatData, setChatData] = useState([]);
  const [rank, setRank] = useState([]);
  const [page, setPage] = useState(0);
  const [prevCount, setPrevCount] = useState(null);
  const [currentCount, setCurrentCount] = useState(null);
  const [toast, setToast] = useState(false);

  // Call Chat Data
  useEffect(() => {
    Apis.get(`/rooms/${roomId}/chats`, {
      params: {
        page: page,
      },
    }).then((response) => {
      setChatData((prevChatData) => [
        ...response.data.data.content,
        ...prevChatData,
      ]);
    });
  }, [page]);

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const connect = () => {
    if (client) disConnect();
    if (localStorage.getItem('hasConnected') === null) {
      localStorage.setItem('hasConnected', JSON.stringify(false));
    }

    try {
      const clientdata = new StompJs.Client({
        brokerURL: CHAT_WS,
        connectHeaders: {
          Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
        },
        reconnectDelay: 5000, // 자동 재연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      clientdata.onConnect = function () {
        clientdata.subscribe(CHAT_SUB + roomId, (message) => {
          let jsonMessageBody = JSON.parse(message.body);
          if (jsonMessageBody.messageType === 'TALK') {
            setChatData((prevChatData) => [...prevChatData, jsonMessageBody]);
          } else if (jsonMessageBody.messageType === 'RANK') {
            setToast(true);
            setRank((prevRank) => [...prevRank, jsonMessageBody]);
          } else if (jsonMessageBody.messageType === 'ENTER') {
            setChatData((prevChatData) => [...prevChatData, jsonMessageBody]);
          } else if (jsonMessageBody.messageType === 'LEAVE') {
            setChatData((prevChatData) => [...prevChatData, jsonMessageBody]);
          }
        });

        if (JSON.parse(localStorage.getItem('hasConnected')) === false) {
          localStorage.setItem('hasConnected', JSON.stringify(true));
          sendWait(clientdata);
        }
      };

      clientdata.activate();
      setClient(clientdata);
    } catch (err) {
      console.error(err);
    }
  };

  const disConnect = () => {
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  const sendWait = (connectedClient) => {
    connectedClient.publish({
      destination: CHAT_PUB,
      headers: {
        Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        roomId: roomId,
        senderId: sessionStorage.getItem('userId'),
        messageType: 'ENTER',
        message: null,
      }),
    });
  };

  // Send Chat to Socket
  const sendMessage = (e) => {
    if (chat === '') {
      return;
    }
    client.publish({
      destination: CHAT_PUB,
      headers: {
        Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        roomId: roomId,
        senderId: sessionStorage.getItem('userId'),
        messageType: 'TALK',
        message: chat,
      }),
    });
    setChat('');
    e.preventDefault();
  };

  const onChangeChat = (e) => {
    setChat(e.target.value);
  };

  const changeLanguage = (language) => {
    switch (language) {
      case 'JavaScript':
        return 'JAVASCRIPT'
        break;
      case 'C++':
        return 'CPP'
        break;
      case 'Java':
        return 'JAVA'
        break;
      case 'Python':
        return 'PYTHON'
        break;
      default:
        break;
    }
  }

  const onLeaveChatRoom = (isRetry, code, isPass) => {
    client.publish({
      destination: CHAT_PUB,
      headers: {
        Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        roomId: roomId,
        senderId: sessionStorage.getItem('userId'),
        messageType: 'LEAVE',
        message: null,
      }),
    });

    Apis.post('/rooms/' + roomId, {
      isRetry: isRetry,
      code: code,
      isPass: isPass,
      language : changeLanguage(selectedLanguage)
    });
  };

  /**************************************************************************/
  const onSuccessCheck = async () => {
    try {
      console.log('Calling getCount...');
      await getCount();
    } catch (error) {
      console.error('Failed to process success check', error);
    }
  };

  const getCount = async () => {
    try {
      const response = await Apis.get('/users/solved-count');
      const newCount = response.data.data.solvedCount;

      console.log('Received newCount:', newCount);

      setPrevCount((prev) => {
        const updatedPrevCount = currentCount;
        setCurrentCount(newCount);

        if (client !== null) {
          compareCounts(updatedPrevCount, newCount);
        }
        return updatedPrevCount;
      });
    } catch (error) {
      console.error('Failed to fetch solved count', error);
    }
  };

  const compareCounts = (prevCount, currentCount) => {
    console.log('prevCount:', prevCount);
    console.log('currentCount:', currentCount);

    if (prevCount === currentCount) {
      setCheckSubmit(false);
      setRetry(true);
    } else {
      client.publish({
        destination: CHAT_PUB,
        headers: {
          Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
        },
        body: JSON.stringify({
          roomId: roomId,
          senderId: sessionStorage.getItem('userId'),
          messageType: 'RANK',
          message: null,
        }),
      });
      setCheckSubmit(false);
      setSuccess(true);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  const getMyRanking = (userId) => {
    const myRankIndex = rank.findIndex((r) => r.senderId === Number(userId));
    return myRankIndex + 1;
  };

  /**************************************************************************/

  const handleSelect = (select) => {
    setSelectedLanguage(select);
  };

  const encodeToBase64 = (text) => {
    return btoa(text);
  };

  console.log(selectedLanguage)
  useEffect(() => {
    switch (selectedLanguage) {
      case 'C++':
      case 'CPP':
        setLanguageId(54);
        break;
      case 'Java':
      case 'JAVA':
        setLanguageId(62);
        break;
      case 'Python':
      case 'PYTHON':
        setLanguageId(71);
        break;
      case 'JavaScript':
      case 'JAVASCRIPT':
        setLanguageId(63);
        break;
      default:
        setLanguageId(63);
        break;
    }
  }, [selectedLanguage]);

  console.log(languageId);

  const handleMouseDownExplain = (e) => {
    setIsDraggingExplain(true);
    setStartYExplain(e.clientY);
    setStartHeightExplain(explainRef.current.clientHeight);
  };

  const handleMouseDownSolve = (e) => {
    setIsDraggingSolve(true);
    setStartYSolve(e.clientY);
    setStartHeightSolve(solvingRef.current.clientHeight);
  };

  const handleMouseMove = (e) => {
    if (isDraggingExplain) {
      const deltaY = e.clientY - startYExplain;
      const newHeight = startHeightExplain + deltaY;
      explainRef.current.style.height = `${newHeight}px`;
      exampleRef.current.style.height = `calc(100vh - ${newHeight}px - 80px)`;
    } else if (isDraggingSolve) {
      const deltaY = e.clientY - startYSolve;
      const newHeight = startHeightSolve + deltaY;
      solvingRef.current.style.height = `${newHeight}px`;
      outputRef.current.style.height = `calc(100vh - ${newHeight}px - 80px)`;
    }
  };

  const handleMouseUp = () => {
    setIsDraggingExplain(false);
    setIsDraggingSolve(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingExplain, isDraggingSolve]);

  const onChange = (action, data) => {
    switch (action) {
      case 'code': {
        setCode(data);
        break;
      }
      default: {
        console.warn('case not handled!', action, data);
      }
    }
  };

  const monaco = useMonaco();
  useEffect(() => {
    if (!monaco) return;

    if (mode === 'light') {
      monaco.editor.defineTheme('iPlastic', iPlasticTheme);
      monaco.editor.setTheme('iPlastic');
    } else {
      monaco.editor.defineTheme('brilliance-black', brillianceBlackTheme);
      monaco.editor.setTheme('brilliance-black');
    }
  }, [monaco, mode]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleCompile = async () => {
    setProcessing(true);
    const formData = {
      language_id: languageId,
      source_code: encodeToBase64(code),
      stdin: '',
    };

    const options = {
      method: 'POST',
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log('catch block...', error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: 'GET',
      url: process.env.REACT_APP_RAPID_API_URL + '/' + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        console.log('response.data', response.data);
        return;
      }
    } catch (err) {
      console.log('err', err);
      setProcessing(false);
    }
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setTransitionOpen(true);
    setIsFirstMounted(false);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setTransitionOpen(false);
  };

  const changeRetryLanguage = (language) => {
    switch (language) {
      case 'JAVASCRIPT':
        return 'Javasript';
      case 'CPP':
        return 'C++';
      case 'JAVA':
        return 'Java';
      case 'PYTHON':
        return 'Python';
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const data = await getProblem(roomId);
        setProblemData(data);
        console.log(data);
        setCode(data?.code);
        localStorage.setItem('retryCode', data?.code);
        localStorage.setItem('retryLanguage', data?.language);
        setSelectedLanguage(data?.language ? data?.language : 'JavaScript');
      } catch (error) {
        console.error(error);
      }
    };

    fetchProblemData();
  }, [roomId]);

  useEffect(() => {
    const fetchProblemStatus = async () => {
      try {
        const res = await getProblemStatus(roomId);
        setProblemStatus(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProblemStatus();
  }, [roomId]);

  const handleExampleCompile = async () => {
    setProcessing(true);
    let successArray = [];

    const compileExample = async (input) => {
      const formData = {
        language_id: languageId,
        source_code: encodeURIComponent(code),
        stdin: encodeURIComponent(input),
      };

      const options = {
        method: 'POST',
        url: process.env.REACT_APP_RAPID_API_URL,
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        },
        data: formData,
      };

      try {
        const response = await axios.request(options);
        const token = response.data.token;
        const result = await checkStatus(token);
        return result;
      } catch (err) {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.error(error);
        return null;
      }
    };

    const checkStatus = async (token) => {
      const options = {
        method: 'GET',
        url: `${process.env.REACT_APP_RAPID_API_URL}/${token}`,
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
          'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        },
      };

      try {
        let response = await axios.request(options);
        let statusId = response.data.status?.id;

        if (statusId === 1 || statusId === 2) {
          setTimeout(() => {
            return checkStatus(token);
          }, 2000);
        } else {
          setProcessing(false);
          return response.data;
        }
      } catch (err) {
        setProcessing(false);
        return null;
      }
    };

    await Promise.all(
      problemData?.problemResponseDto?.sampleInput.map(async (input, index) => {
        const expectedOutput =
          problemData.problemResponseDto.sampleOutput[index];
        const result = await compileExample(input);
        if (result) {
          const output = atob(result.stdout || '');
          successArray[index] = output.trim() === expectedOutput.trim();
        } else {
          successArray[index] = false;
        }
      }),
    );

    setIsExampleSuccess(successArray);
    setProcessing(false);
  };

  const openProblemPage = () => {
    const link = `https://www.acmicpc.net/submit/${problemData?.problemResponseDto?.number}`;
    window.open(link, '_blank');
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(
      `https://www.devrace.site/invite/${problemData?.link}`,
    );
  };

  const exitButton = [
    <Button
      type="modal"
      shape="angle"
      text="확인"
      onClick={() => {
        localStorage.removeItem('retryCode');
        localStorage.removeItem('retryLanguage');
        onLeaveChatRoom(0, code, 0);
        setIsExit(false);
        navigate('/');
      }}
    />,
  ];

  const submitButton = [
    <Button
      type="modalBtn1"
      shape="angle"
      text="코드 복사하기"
      onClick={() => {
        navigator.clipboard.writeText(code);
      }}
    />,
    <Button
      type="modalBtn2"
      shape="angle"
      text="제출하러가기"
      onClick={() => {
        openProblemPage();
        setIsSubmit(false);
        setCheckSubmit(true);
      }}
    />,
  ];

  const submittedButton = [
    <Button
      type="modalBtn1"
      shape="angle"
      text="아니요"
      onClick={() => {
        setCheckSubmit(false);
        setIsSubmit(true);
      }}
    />,
    <Button
      type="modalBtn2"
      shape="angle"
      text="제출 완료"
      onClick={() => {
        onSuccessCheck();
      }}
    />,
  ];

  const retryButton = [
    <Button
      type="modal"
      shape="angle"
      text="확인"
      onClick={() => {
        setRetry(false);
      }}
    />,
  ];

  const successButton = [
    <Button
      type="modal"
      shape="angle"
      text="확인"
      onClick={() => {
        setSuccess(false);
        localStorage.removeItem('editorValue');
        onLeaveChatRoom(1, code, 1);
        navigate('/');
      }}
    />,
  ];

  return (
    <>
      {toast && (
        <div className="Solve--Push--Rank">
          <Push
            type="inviteFriend"
            text="성공한 사용자가 랭킹에 반영되었습니다!"
          />
        </div>
      )}
      {isExit && (
        <div className="Solve--Modal--Wrapper">
          <Modal
            imageSource={errorIcon}
            title="퇴장하시나요?"
            content="해당 문제는 코드 목록에 실패로 저장됩니다."
            buttons={exitButton}
            isActive={isExit}
            setIsActive={setIsExit}
          />
        </div>
      )}
      {isSubmit && (
        <div className="Solve--Modal--Wrapper">
          <Modal
            imageSource={submitIcon}
            title="백준에 코드를 제출하세요!"
            content="코드를 붙여넣기하여 제출해요!"
            buttons={submitButton}
            isActive={isSubmit}
            setIsActive={setIsSubmit}
          />
        </div>
      )}
      {checkSubmit && (
        <div className="Solve--Modal--Wrapper">
          <Modal
            imageSource={submitIcon}
            title="백준에 코드를 제출하셨나요?"
            content="코드 제출 여부를 선택해주세요."
            buttons={submittedButton}
            isActive={checkSubmit}
            setIsActive={setCheckSubmit}
          />
        </div>
      )}
      {retry && (
        <div className="Solve--Modal--Wrapper">
          <Modal
            imageSource={retryIcon}
            title="문제풀이에 실패했어요."
            content="재도전을 위해 문제풀이로 돌아갑니다."
            buttons={retryButton}
            isActive={retry}
            setIsActive={setRetry}
          />
        </div>
      )}
      {success && (
        <div className="Solve--Modal--Wrapper">
          <Modal
            imageSource={successIcon}
            title={`${getMyRanking(
              sessionStorage.getItem('userId'),
            )}등으로 성공했어요!`}
            content="방에서 자동 퇴장됩니다."
            buttons={successButton}
            isActive={success}
            setIsActive={setSuccess}
          />
        </div>
      )}
      <Header
        headerType={
          problemStatus?.roomState === 'RETRY' ||
          problemStatus?.roomState === 'FINISH'
            ? 'review'
            : 'solve'
        }
        text={`${problemData?.problemResponseDto?.title}`}
        onSelect={handleSelect}
        invite={handleCopyUrl}
        rank={
          problemStatus?.roomState === 'RETRY' ||
          problemStatus?.roomState === 'FINISH'
            ? problemData?.rankUserDtoList
            : rank
        }
        onClick={() => setIsExit(true)}
        compileLanguage={
          problemStatus?.roomState === 'RETRY' ||
          problemStatus?.roomState === 'FINISH'
            ? changeRetryLanguage(localStorage.getItem('retryLanguage'))
            : selectedLanguage
        }
        roomState={problemStatus?.roomState}
      />
      <div className={`Solve--Container--${mode}`}>
        <div>
          {!isChatOpen && (
            <OpenChatBtn
              onClick={handleOpenChat}
              isFirstMounted={isFirstMounted}
              top={top}
              setTop={setTop}
            />
          )}
          <CSSTransition
            in={isChatOpen}
            timeout={500}
            classNames="slide"
            unmountOnExit
          >
            <ChatComponent
              onClick={handleCloseChat}
              top={top}
              setTop={setTop}
              chat={chat}
              chatData={chatData}
              sendMessage={sendMessage}
              onChangeChat={onChangeChat}
              page={page}
              setPage={setPage}
              isRetry={problemStatus?.roomState}
            />
          </CSSTransition>
        </div>
        <div className="Solve--Left--Container">
          <div className="Solve--Explain--Container" ref={explainRef}>
            <span>문제설명</span>
            <div className="Solve--Explain--Contents">
              <span className={`Solve--Explain--Title--${mode}`}>문제</span>
              <SolveExplain
                htmlContent={problemData?.problemResponseDto?.content}
                mode={mode}
              />
              <span className={`Solve--Explain--Title--${mode}`}>입력</span>
              <SolveExplain
                htmlContent={problemData?.problemResponseDto?.problemInput}
                mode={mode}
              />
              <span className={`Solve--Explain--Title--${mode}`}>출력</span>
              <SolveExplain
                htmlContent={problemData?.problemResponseDto?.problemOutput}
                mode={mode}
              />
              {problemData?.problemResponseDto?.problemLimit && (
                <>
                  <span className={`Solve--Explain--Title--${mode}`}>제한</span>
                  <SolveExplain
                    htmlContent={problemData?.problemResponseDto?.problemLimit}
                    mode={mode}
                  />
                </>
              )}
            </div>
          </div>
          <div className="Solve--ExampleInput--Container" ref={exampleRef}>
            <div
              className={`Solve--ResizeBar--${mode}`}
              onMouseDown={handleMouseDownExplain}
            >
              <img
                src={mode === 'light' ? scroll_light : scroll_dark}
                alt="Scroll Light"
                style={{ height: '14px' }}
              />
            </div>
            <div className="Solve--ExampleInput--Header">
              <span className="Solve--ExampleInput--HeaderText">예제 입력</span>
              <div className="Solve--ExampleInput--SuccessCount">
                <img src={check_green} alt="Right" />
                {isExampleSuccess.filter((success) => success).length}/
                {problemData?.problemResponseDto?.sampleInput.length}
              </div>
            </div>

            {problemData?.problemResponseDto?.sampleInput.map(
              (input, index) => (
                <div key={index} style={{ width: '100%' }}>
                  <div
                    className={`Solve--ExampleInput--Title--${mode}`}
                    style={
                      isExampleSuccess[index]
                        ? { background: '#C8FFA7' }
                        : { background: '#FFB9AA' }
                    }
                  >
                    <span className="Solve--ExampleInput--HeaderText">
                      예제 {index + 1}
                    </span>
                    <img
                      src={isExampleSuccess[index] ? yes_black : no_black}
                      alt="Example Right"
                      style={{ marginRight: '24px' }}
                    />
                  </div>
                  <div className={`Solve--ExampleInput--Contents--${mode}`}>
                    <span>입력</span>
                    <SolveExplain htmlContent={input} mode={mode} />
                    <span>출력</span>
                    <SolveExplain
                      htmlContent={
                        problemData?.problemResponseDto?.sampleOutput[index]
                      }
                      mode={mode}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
        <div className={`Solve--Right--Container--${mode}`}>
          <div className="Solve--ProblemSolving--Container" ref={solvingRef}>
            <span style={{ marginLeft: '24px' }}>문제 풀이</span>
            <div className="Solve--ProblemSolving--Editor">
              <CodeEditor
                code={code}
                onChange={onChange}
                language={
                  problemStatus?.roomState === 'RETRY' ||
                  problemStatus?.roomState === 'FINISH'
                    ? localStorage.getItem('retryLanguage')
                    : selectedLanguage
                }
                theme={mode === 'light' ? 'iPlastic' : 'brilliance-black'}
                onMount={onMount}
                isRetry={problemStatus?.roomState}
              />
            </div>
          </div>
          <div className="Solve--Output--Container" ref={outputRef}>
            <div
              className={`Solve--ResizeBar--${mode}`}
              onMouseDown={handleMouseDownSolve}
            >
              <img
                src={mode === 'light' ? large_scroll_light : large_scroll_dark}
                alt="Scroll Light"
                style={{ height: '14px' }}
              />
            </div>
            <span className="Solve--Right--Container--Title">출력 결과</span>
            <div className={`Solve--Output--Contents--${mode}`}>
              {processing ? (
                <span>컴파일 진행 중입니다...</span>
              ) : (
                <Output outputDetails={outputDetails} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer
        mode={mode}
        handleCompile={handleCompile}
        handleExampleCompile={handleExampleCompile}
        onClick={() => setIsSubmit(true)}
      />
    </>
  );
};

export default SolvePage;
