import LoginForm, { FormWithoutHookForm } from '@/components/form';
import TableComp from '@/components/table';
import React from 'react';
import api from '../pages/api/hello.js';
import { useEffect } from 'react';
import { useState } from 'react';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = useState([])
  const [activeUser, setActiveUser] = useState([])
  const [records, setRecords] = useState([])
  const LoadData = async () => {
    try {
      const result = await api.getUsers();
      setData(result);
      let tempFilter = result.filter(e => e.isActive == "true")
      setActiveUser(tempFilter.length)
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const LoadRecords = async () => {
    try {
      const result = await api.getRecords()
      setRecords(result)
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    LoadData()
    LoadRecords()
    setIsLoading(false)
  }, []);
  if (isLoading) {
    return (
      <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <a>Yükleniyor...</a>
      </div>
    );
  } else {
    return (
      <div className='bg-image' style={{  height: '100%', flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
        <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'space-between', minHeight: 400 }}>

          <div style={{ display: 'flex', flexDirection: 'column', width: '60%', alignItems: 'center', justifyContent: 'space-between', }}>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'space-around' }}>
              <div style={{ backgroundColor: 'red', width: '40%', height: '75%', padding: '20px' }}>
                <h3>Toplam Kullanıcımız</h3>
                <p>{data.length}</p>
              </div>
              <div style={{ backgroundColor: 'blue', width: '40%', height: '75%', padding: '20px' }}>
                <h3>Toplam Kayıt</h3>
                <p>{records.length}</p>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'space-around' }}>
              <div style={{ backgroundColor: 'green', width: '40%', height: '75%', padding: '20px' }}>
                <h3>Aktif Kullanıcı</h3>
                <p>{activeUser}</p>
              </div>
            </div>
          </div>
          <TableComp data={data} getUsers={LoadData}></TableComp>

        </div>
        <div style={{ alignSelf: 'center', width: '30%', height: 300, margin: "auto", justifyContent: 'center', alignItems: 'center' }}>
          <LoginForm getUsers={LoadData}></LoginForm>
        </div>
      </div>
    );
  }






};

export default DashboardPage;
