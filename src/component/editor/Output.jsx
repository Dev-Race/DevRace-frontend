import React from 'react';

const Output = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // 컴파일 에러 일때
      return <pre>{atob(outputDetails?.compile_output)}</pre>;
    } else if (statusId === 3) {
      return (
        <pre>
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return <pre>{`Time Limit Exceeded`}</pre>;
    } else {
      return <pre>{atob(outputDetails?.stderr)}</pre>;
    }
  };

  return (
    <>
      <div>{outputDetails ? <>{getOutput()}</> : null}</div>
    </>
  );
};

export default Output;
