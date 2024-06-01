import React from 'react';

const Output = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // 컴파일 에러 일때
      return <span>{atob(outputDetails?.compile_output)}</span>;
    } else if (statusId === 3) {
      return (
        <span>
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </span>
      );
    } else if (statusId === 5) {
      return <span>{`Time Limit Exceeded`}</span>;
    } else {
      return <span>{atob(outputDetails?.stderr)}</span>;
    }
  };

  return (
    <>
      <span>{outputDetails ? <>{getOutput()}</> : null}</span>
    </>
  );
};

export default Output;
