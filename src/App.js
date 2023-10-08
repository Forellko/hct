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
    <div className="flex max-md:flex-col h-screen w-screen">
      {contextHolder}
      <YMaps>
        <Map
          defaultState={{ center: [47.2, 38.9], zoom: 12 }}
          options={{
            copyrightProvidersVisible: false,
            copyrightLogoVisible: false,
            suppressMapOpenBlock: true,
          }}
          className="w-[70%] h-[95%] m-[20px] max-md:h-[50%] max-md:w-[95%]"
        >
          <Placemark
            onDragEnd={(e) => {
              console.log(e.originalEvent);
            }}
            geometry={[47.2, 38.9]}
            options={{
              draggable: true,
            }}
            properties={{
              iconLayout: (
                <div style={{ width: '10px', height: '10px' }}>1</div>
              ),
              balloonContent:
                '<div class="flex flex-col justify-between"><div>1</div><div>2</div><div>3</div></div>',
            }}
            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
          />
        </Map>
      </YMaps>
      <List
        className="w-[30%] h-[95%] m-[20px] max-md:h-[40%] max-md:w-[95%]"
        bordered
        header={<div>Log</div>}
        dataSource={list}
        pagination={{
          align: 'center',
          pageSize: 3,
          position: 'bottom',
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
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
