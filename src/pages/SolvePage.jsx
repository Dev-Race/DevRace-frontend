import React, { useRef, useEffect, useState } from 'react';
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
import CodeEditor from '../component/editor/CodeEditor';

import OpenChatBtn from '../component/chat/OpenChatBtn';
import ChatComponent from '../component/chat/ChatComponent';
import { CSSTransition } from 'react-transition-group';
import { getProblem } from '../apis/problem';
import { useParams } from 'react-router-dom';

const javascriptDefault = `
`;

const SolvePage = () => {
  const { mode } = useSelector((state) => state.toggle);

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

  const [isExampleSuccess, setIsExampleSuccess] = useState(false);
  const [code, setCode] = useState(javascriptDefault);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);

  const editorRef = useRef();
  const [languageId, setLanguageId] = useState(63);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [transitionOpen, setTransitionOpen] = useState(false);
  const [isFirstMounted, setIsFirstMounted] = useState(true);
  const [top, setTop] = useState(180);

  const { roomId } = useParams();
  const [problemData, setProblemData] = useState();
  const [solvedExampleCount, setSolvedExampleCount] = useState(0);

  const handleSelect = (select) => {
    setSelectedLanguage(select);
  };

  useEffect(() => {
    switch (selectedLanguage) {
      case 'C++':
        setLanguageId(54);
        break;
      case 'Java':
        setLanguageId(62);
        break;
      case 'Python':
        setLanguageId(71);
        break;
      case 'javascript':
        setLanguageId(63);
        break;
      default:
        setLanguageId(63);
        break;
    }
  }, [selectedLanguage]);

  useEffect(() => {
    console.log(languageId);
  }, [languageId]);

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
      exampleRef.current.style.height = `calc(100vh - ${newHeight}px - 260px)`;
    } else if (isDraggingSolve) {
      const deltaY = e.clientY - startYSolve;
      const newHeight = startHeightSolve + deltaY;
      solvingRef.current.style.height = `${newHeight}px`;
      outputRef.current.style.height = `calc(100vh - ${newHeight}px - 260px)`;
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
      source_code: btoa(code),
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
        return;
      }
    } catch (err) {
      setProcessing(false);
    }
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setTransitionOpen(true);
    setIsFirstMounted(false);
    console.log(isFirstMounted);
    console.log('open');
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setTransitionOpen(false);
  };

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const data = await getProblem(roomId);
        setProblemData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProblemData();
  }, [roomId]);

  function stripHTML(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  return (
    <>
      <Header
        headerType="solve"
        text={problemData?.problemResponseDto?.title}
        onSelect={handleSelect}
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
            />
          </CSSTransition>
        </div>
        <div className="Solve--Left--Container">
          <div className="Solve--Explain--Container" ref={explainRef}>
            <span>문제설명</span>
            <div className="Solve--Explain--Contents">
              <span className={`Solve--Explain--Title--${mode}`}>문제</span>
              <div className={`Solve--Explain--Text--${mode}`}>
                {stripHTML(problemData?.problemResponseDto?.content)}
              </div>
              <span className={`Solve--Explain--Title--${mode}`}>입력</span>
              <div className={`Solve--Explain--Text--${mode}`}>
                {stripHTML(problemData?.problemResponseDto?.problemInput)}
              </div>
              <span className={`Solve--Explain--Title--${mode}`}>출력</span>
              <div className={`Solve--Explain--Text--${mode}`}>
                {stripHTML(problemData?.problemResponseDto?.problemOutput)}
              </div>
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
                {solvedExampleCount}/
                {stripHTML(problemData?.problemResponseDto?.sampleInput.length)}
              </div>
            </div>
            {problemData?.problemResponseDto?.sampleInput.map(
              (input, index) => (
                <>
                  <div
                    className={`Solve--ExampleInput--Title--${mode}`}
                    style={
                      isExampleSuccess
                        ? { background: '#C8FFA7' }
                        : { background: '#FFB9AA' }
                    }
                    key={index}
                  >
                    <span className="Solve--ExampleInput--HeaderText">
                      예제 {index + 1}
                    </span>
                    <img
                      src={isExampleSuccess ? yes_black : no_black}
                      alt="Example Right"
                      style={{ marginRight: '24px' }}
                    />
                  </div>
                  <div className={`Solve--ExampleInput--Contents--${mode}`}>
                    <span>입력</span>
                    <div className={`Solve--ExampleInput--Text--${mode}`}>
                      {stripHTML(input)}
                    </div>
                    <span>출력</span>
                    <div className={`Solve--ExampleInput--Text--${mode}`}>
                      {stripHTML(
                        problemData?.problemResponseDto?.sampleOutput[index],
                      )}
                    </div>
                  </div>
                </>
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
                language={selectedLanguage}
                theme={mode === 'light' ? 'iPlastic' : 'brilliance-black'}
                onMount={onMount}
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
      <Footer mode={mode} handleCompile={handleCompile} />
    </>
  );
};

export default SolvePage;
