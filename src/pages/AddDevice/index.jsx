import React from 'react';
import SlideBar from '../../components/Slider_bar';
import AddDevice from '../../components/AddDevice';

function Add_Device() {
  return (
    <div className="addDevice">
      <SlideBar>
        <AddDevice></AddDevice>
      </SlideBar>
    </div>
  );
}

export default Add_Device;