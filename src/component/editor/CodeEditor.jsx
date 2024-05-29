import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || '');
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

  return (
    <div>
      <Editor
        height="532px"
        width="1100px"
        language={compileLanguage}
        value={value}
        onChange={handleEditorChange}
        theme={theme}
      />
    </div>
  );
};

export default CodeEditor;
