import React from 'react';
import '../index.css'

function DownloadButton() {
  const handleDownload = () => {
    fetch('/api/download')
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx';
        a.click();
      })
      .catch(err => console.error(err));
  };

  return <button id='DownloadBtn' onClick={handleDownload}>Download Data</button>;
}

export default DownloadButton;
