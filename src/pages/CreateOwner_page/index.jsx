import React from 'react';
import SlideBar from '../../components/Slider_bar';
import CreateOwner from '../../components/CreateOwner';

function CreateOwnerPage() {
  return (
    <div className="CreateOwner_page">
      <SlideBar>
        <CreateOwner></CreateOwner>
      </SlideBar>
    </div>
  );
}

export default CreateOwnerPage;