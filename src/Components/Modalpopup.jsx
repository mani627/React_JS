import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalPopup = () => {
  const [isOpen, setIsOpen] = useState(true); // Modal initially open
  const [modalSize, setModalSize] = useState({ width: '400px', height: '700px' });
  const navigate = useNavigate()
  // Adjust modal size on window resize
  useEffect(() => {
    const updateModalSize = () => {
      if (window.innerWidth < 768) {
        // Mobile screen size
        setModalSize({ width: '80%', height: 'auto' });
      } else {
        // Desktop size
        setModalSize({ width: '400px', height: 'auto' });
      }
    };

    // Update size on initial load
    updateModalSize();

    // Listen for window resize
    window.addEventListener('resize', updateModalSize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updateModalSize);
  }, []);

  const handleYesClick = () => {
    // Action to be performed when 'Yes' is clicked
   
    navigate("/PortFolio")
    setTimeout(() => {
      const section = document.getElementById('resume');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },400);
    setIsOpen(false); // Close modal
  };

  const handleCancelClick = () => {
    // Close the modal when 'Cancel' is clicked
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '10px',
            width: modalSize.width,
            height: "23%",
            textAlign: 'center',
            position: 'relative',
            transform: 'translateY(100%)',
            animation: 'slideUp 0.5s forwards'
          }}>
            <button onClick={handleCancelClick} style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
            }}>x</button>
            <h2 style={{
              background: 'linear-gradient(to right, #16A085, #F4D03F)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '3vh',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}>Are u Want To See My Projects?</h2>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button onClick={handleYesClick} style={{
                backgroundColor: '#16A085',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>Yes</button>
              <button onClick={handleCancelClick} style={{
                backgroundColor: 'transparent',
                color: '#333',
                padding: '10px 20px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>Cancel</button>
            </div>
          </div>

          {/* Inline keyframes for animation */}
          <style jsx>{`
            @keyframes slideUp {
              from {
                transform: translateY(100%);
              }
              to {
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default ModalPopup;
