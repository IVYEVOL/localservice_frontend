import React, {useState, useEffect} from 'react';
import '../../../index.css';
import { Space, Table, Tag , Button, Modal} from 'antd';
import axios from 'axios';
import ServicePoviderTable from './Table';



const App: React.FC = () => {

  return(
    <>
    <ServicePoviderTable/>
    </>
  )
}

export default App;
