import React from 'react';
import './Work.css';

import { Checkbox } from 'antd';

function Work() {
  const options = [
    { label: '타입스크립트 리덕스 복습', value: '타입스크립트 리덕스 복습' },
    {
      label: '공모전 zip파일 확인 및 api 호출 에러날 시 확인',
      value: '공모전 zip파일 확인 및 api 호출 에러날 시 확인',
    },
    { label: '리엑트 채팅 복습(firebase)', value: '리엑트 채팅 복습(firebase)' },
    { label: '리엑트 채팅 복습(socket)', value: '리엑트 채팅 복습(socket)' },
  ];
  const onChange = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
  };
  return (
    <div className="today">
      <h2>오늘 할일</h2>
      <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
      <br />
    </div>
  );
}
export default Work;
