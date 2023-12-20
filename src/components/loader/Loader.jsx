import React from 'react'

export default function Loader() {
  return (
    <div className="container text-center vh-100 w-100 z-3 d-flex align-items-center justify-content-center position-fixed">
      <div className="spinner-grow text-secondary text-opacity-50" role="status">
      </div>
    </div>
  );
}
