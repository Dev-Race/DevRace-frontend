import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ onChange, language, code, theme }) => {
  const savedValue = localStorage.getItem('editorValue');
  const [value, setValue] = useState(savedValue || code || '');
  const [compileLanguage, setCompileLanguage] = useState('');

  const handleEditorChange = (value) => {
    setValue(value);
    onChange('code', value);
  };

  useEffect(() => {
    switch (language) {
      case 'C++':
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
    console.log(compileLanguage);
  }, [compileLanguage]);

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
