import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ onChange, language, code, theme, isRetry }) => {
  const [value, setValue] = useState('');
  const [compileLanguage, setCompileLanguage] = useState('');
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleEditorChange = (value) => {
    setValue(value);
    onChange('code', value);
  };

  useEffect(() => {
    switch (language) {
      case 'C++':
      case 'CPP':
        setCompileLanguage('cpp');
        break;
      case 'Java':
        setCompileLanguage('java');
        break;
      case 'Python':
        setCompileLanguage('python');
        break;
      case 'Javascript':
        setCompileLanguage('javascript');
        break;
      default:
        setCompileLanguage('javascript');
        break;
    }
  }, [language]);

  useEffect(() => {
    if (isFirstRender) {
      if (isRetry === 'FINISH' || isRetry === 'RETRY') {
        const initialCode = localStorage.getItem('retryCode') || '';
        setValue(initialCode);
      } else {
        const initialCode = localStorage.getItem('editorValue') || '';
        setValue(initialCode);
      }
      setIsFirstRender(false);
    } else {
      localStorage.setItem('editorValue', value);
    }
  }, [isRetry, isFirstRender]);

  useEffect(() => {
    const unloadHandler = (event) => {
      localStorage.setItem('editorValue', value);
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', unloadHandler);
    return () => {
      window.removeEventListener('beforeunload', unloadHandler);
    };
  }, [value]);

  return (
    <>
      <Editor
        height="532px"
        width="1100px"
        language={compileLanguage}
        value={value}
        onChange={handleEditorChange}
        theme={theme}
      />
    </>
  );
};

export default CodeEditor;
