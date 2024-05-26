import React from 'react';

const HeatMapToggle = ({ onClick }) => {
  return (
    <img src="/img/heatmap icon.png" style={{
        position: 'absolute',
        top: 'auto',
        bottom: '20px',
        left: '20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        fontSize: '12px',
        height: '87px',
      }} onClick={onClick} />
  );
};

export default HeatMapToggle;