import './App.css';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { notification, List } from 'antd';
import { useEffect, useState } from 'react';
import Axios from 'axios';

import { AiFillExclamationCircle } from 'react-icons/ai';

function App() {
  const [api, contextHolder] = notification.useNotification();
  const [list, setList] = useState();

  useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
      setList(res.data);
      console.log(1);
    });
  }, []);

  const openNotification = () => {
    api.info({
      message: 'notification',
      description: 'hello',
      placement: 'bottomRight',
    });
  };

  return (
    <div className="flex h-screen w-screen">
      {contextHolder}
      <YMaps>
        <Map
          defaultState={{ center: [47.2, 38.9], zoom: 12 }}
          options={{
            copyrightProvidersVisible: false,
            copyrightLogoVisible: false,
            suppressMapOpenBlock: true,
          }}
          className="w-[70%] h-[95%] m-[20px]"
        >
          <Placemark
            geometry={[47.2, 38.9]}
            options={{
              draggable: true,
            }}
            properties={{
              hintContent: '2',
              iconContent: '5',
              iconCaption: '10',
              balloonContent: '1',
              balloonContentBody: '11',
            }}
          />
        </Map>
      </YMaps>
      <List
        className="w-[30%] h-[99%] p-[5px] m-[5px]"
        bordered
        header={<div>Log</div>}
        dataSource={list}
        renderItem={(item) => (
          <List.Item className="flex justify-between">
            <div className="w-[220px]">{item.title}</div>
            <AiFillExclamationCircle
              className="w-[30px] h-[30px]"
              color="red"
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
