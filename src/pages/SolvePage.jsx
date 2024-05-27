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

import { Editor, useMonaco } from '@monaco-editor/react';
import iPlasticTheme from 'monaco-themes/themes/iPlastic.json';
import brillianceBlackTheme from 'monaco-themes/themes/Brilliance Black.json';

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
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleSelect = (select) => {
    setSelectedLanguage(select);
    console.log(select);
    console.log(selectedLanguage);
  };
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

  const onChangeEditor = (action, data) => {
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

  return (
    <div>
      <Header headerType="solve" text="problem 이름" onSelect={handleSelect} />
      <div className={`Solve--Container--${mode}`}>
        <div className="Solve--Left--Container">
          <div className="Solve--Explain--Container" ref={explainRef}>
            <span>문제설명</span>
            <div className="Solve--Explain--Contents">
              <text className={`Solve--Explain--Title--${mode}`}>문제</text>
              <div className={`Solve--Explain--Text--${mode}`}>
                Lorem ipsum dolor sit amet consectetur. Sit egestas sagittis nec
                augue vitae feugiat. Aliquet sed sem consequat amet ultricies
                massa elit. Vulputate blandit ipsum egestas urna. Tortor augue
                id facilisis cursus elit in leo in sed. Egestas ut mauris nec
                aliquet adipiscing vitae lectus egestas.{' '}
              </div>
              <text className={`Solve--Explain--Title--${mode}`}>입력</text>
              <div className={`Solve--Explain--Text--${mode}`}>
                Lorem ipsum dolor sit amet consectetur. Sit egestas sagittis nec
                augue vitae feugiat. Aliquet sed sem consequat amet ultricies
                massa elit. Vulputate blandit ipsum egestas urna. Tortor augue
                id facilisis cursus elit in leo in sed. Egestas ut mauris nec
                aliquet adipiscing vitae lectus egestas.{' '}
              </div>
              <text className={`Solve--Explain--Title--${mode}`}>출력</text>
              <div className={`Solve--Explain--Text--${mode}`}>
                Lorem ipsum dolor sit amet consectetur. Sit egestas sagittis nec
                augue vitae feugiat. Aliquet sed sem consequat amet ultricies
                massa elit. Vulputate blandit ipsum egestas urna. Tortor augue
                id facilisis cursus elit in leo in sed. Egestas ut mauris nec
                aliquet adipiscing vitae lectus egestas.{' '}
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              background: mode === 'dark' ? '#2E2F33' : '',
              cursor: 'ns-resize',
            }}
            onMouseDown={handleMouseDownExplain}
          >
            <img
              src={mode === 'light' ? scroll_light : scroll_dark}
              alt="Scroll Light"
              style={{ height: '14px' }}
            />
          </div>
          <div className="Solve--ExampleInput--Container" ref={exampleRef}>
            <div className="Solve--ExampleInput--Header">
              <span className="Solve--ExampleInput--HeaderText">예제 입력</span>
              <div style={{ display: 'flex', gap: '8px', marginRight: '24px' }}>
                <img src={check_green} alt="Right" />
                4/10
              </div>
            </div>
            <div
              className={`Solve--ExampleInput--Title--${mode}`}
              style={
                isExampleSuccess
                  ? { background: '#C8FFA7' }
                  : { background: '#FFB9AA' }
              }
            >
              <span className="Solve--ExampleInput--HeaderText">예제 1</span>
              <img
                src={isExampleSuccess ? yes_black : no_black}
                alt="Example Right"
                style={{ marginRight: '24px' }}
              />
            </div>
            <div className={`Solve--ExampleInput--Contents--${mode}`}>
              <text>입력</text>
              <div className={`Solve--ExampleInput--Text--${mode}`}>
                Lorem ipsum dolor sit amet consectetur. Sit egestas sagittis nec
                augue vitae feugiat. Aliquet sed sem consequat amet ultricies
                massa elit.
              </div>
              <text>출력</text>
              <div className={`Solve--ExampleInput--Text--${mode}`}>
                Lorem ipsum dolor sit amet consectetur. Sit egestas sagittis nec
                augue vitae feugiat. Aliquet sed sem consequat amet ultricies
                massa elit.
              </div>
            </div>
          </div>
        </div>
        <div className="Solve--Right--Container">
          <div className="Solve--ProblemSolving--Container" ref={solvingRef}>
            <span className="Solve--Right--Container--Title">문제 풀이</span>
            <div className="Solve--ProblemSolving--Editor">
              <Editor
                height="532px"
                onChange={onChangeEditor}
                language={selectedLanguage}
                theme={mode === 'light' ? 'iPlastic' : 'pastels-on-dark'}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              background: mode === 'dark' ? '#2E2F33' : '',
              cursor: 'ns-resize',
            }}
            onMouseDown={handleMouseDownSolve}
          >
            <img
              src={mode === 'light' ? large_scroll_light : large_scroll_dark}
              alt="Scroll Light"
              style={{ height: '14px' }}
            />
          </div>
          <div className="Solve--Output--Container" ref={outputRef}>
            <span className="Solve--Right--Container--Title">출력 결과</span>
            <div className={`Solve--Output--Contents--${mode}`}></div>
          </div>
        </div>
      </div>
      <Footer mode={mode} />
    </div>
  );
};

export default SolvePage;
