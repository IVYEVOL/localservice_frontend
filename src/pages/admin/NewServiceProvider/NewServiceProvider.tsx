import React, {useState, useEffect} from 'react';
import '../../../index.css';
import { Space, Table, Tag , Button, Modal} from 'antd';
import axios from 'axios';
import ServiceProviderTable from './Table';



const App: React.FC = () => {

  return(
    <>
    <ServiceProviderTable/>
    </>
  )
}

export default App;
