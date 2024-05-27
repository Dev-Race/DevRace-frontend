import React, { useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const Resizable = ({ direction, initialHeight, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [height, setHeight] = useState(initialHeight);

  useEffect(() => {
    const resizeWindow = () => {
      setInnerHeight(window.innerHeight);
      if (window.innerHeight * 0.9 < height) {
        setHeight(window.innerHeight * 0.9);
      }
    };

    window.addEventListener('resize', resizeWindow);

    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, [height]);

  let resizableProps;
  if (direction === 'vertical') {
    resizableProps = {
      className: 'resize-vertical',
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, innerHeight * 0.9],
      width: Infinity,
      height,
      resizeHandles: ['s'],
      onResizeStop: (event, data) => {
        setHeight(data.size.height);
      },
    };
  } else {
    resizableProps = {
      // Placeholder for horizontal resizing
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
