import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ onChange, language, code, theme, isRetry }) => {
  const [value, setValue] = useState('');
  const [compileLanguage, setCompileLanguage] = useState('');

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
      case 'JAVA':
        setCompileLanguage('java');
        break;
      case 'Python':
      case 'PYTHON':
        setCompileLanguage('python');
        break;
      case 'Javascript':
      case 'JAVASCRIPT':
        setCompileLanguage('javascript');
        break;
      default:
        setCompileLanguage('javascript');
        break;
    }
  }, [language]);
  useEffect(() => {
    console.log(compileLanguage);
  }, [compileLanguage]);

  useEffect(() => {
    let initialCode = '';

    if (isRetry === 'FINISH' || isRetry === 'RETRY') {
      initialCode = localStorage.getItem('retryCode');
    } else {
      initialCode = localStorage.getItem('editorValue');
    }
    console.log(initialCode);
    setValue(initialCode || '');
    console.log(value);
  }, [isRetry]);

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
