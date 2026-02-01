import Modal from 'react-bootstrap/Modal'; // Import Modal from react-bootstrap
import StockChart from './StockChart';
import { useSelector } from 'react-redux';
import { CustomCloseButton } from './ChartModal.style';
function ChartModal({ show, onHide, code, name}) { 
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        // fullscreen={true} // Set fullscreen to true correctly
        size="xl"
        aria-labelledby="example-custom-modal-styling-title"
        centered
        
      >
          <Modal.Header  style={{backgroundColor:darkMode ? "#282828" : "white"}}>
          <div style={{ marginLeft:"20px"}}>
        <span style={{fontSize:"30px", color:darkMode ? "white" : "black"}}>{code}</span><span style={{fontSize:"20px", marginLeft:"15px",color:darkMode ? "white" : "black" }}>{name}</span>
        </div>
        <CustomCloseButton darkMode={darkMode} onClick={onHide}>&times;</CustomCloseButton>
        </Modal.Header>

        <Modal.Body
        style={{backgroundColor:darkMode ? "#282828" : "white"}}>
          <StockChart symbol={code} />    
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChartModal;
