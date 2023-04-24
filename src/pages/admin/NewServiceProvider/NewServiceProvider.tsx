import React, {useState, useEffect} from 'react';
import '../../../index.css';
import { Space, Table, Tag , Button, Modal} from 'antd';
import axios from 'axios';
import ServicePoviderTable from './Table';



const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



  return(
    

    <>

    <ServicePoviderTable/>
    <Modal       
        footer ={[
                <div className="btn" key="submit">
                    <Button  onClick={handleCancel}>no</Button>   
                    <Button  onClick={handleOk}>yes</Button>
                </div>
                
                ]} 
          title="Reject" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Are you sure to reject this provider?</p>


    </Modal>
    
    
  </>
  )
}

export default App;
