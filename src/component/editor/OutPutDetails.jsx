import React from 'react';

const OutputDetails = ({ outputDetails }) => {
  return (
    <>
      <div>
        Status: <span>{outputDetails?.status?.description}</span>
      </div>
      <div>
        Memory: <span>{outputDetails?.memory}</span>
      </div>
      <div>
        Time: <span>{outputDetails?.time}</span>
      </div>
    </>
  );
};

export default OutputDetails;
