import React from 'react';
import YoutubePlayer from './YoutubePlayer';
import '../styles/modal.scss'

const VideoModal = ({ isOpen, onClose, videoKey }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="btn-close-modal" onClick={onClose}>&times;</button>
        <div className='modal-body'>
          {videoKey ? (
            <YoutubePlayer videoKey={videoKey} />
          ) : (
            <div><h6>no trailer available. Try another movie</h6></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;