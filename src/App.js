import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import Change_pw_page from './pages/Change_password/index.jsx';
// import Page_update_owner from './pages/Page_update_owner/Page_update_owner.jsx';
import CreateOwner_page from './pages/CreateOwner_page/index.jsx';

import Devices from './pages/Devices/index.jsx';
import { GuestRoutes } from './middleware/PrivateRoutes.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<GuestRoutes />}>
          <Route path="/" element={<Devices />} />
          <Route path="/Devices/add_device" element={<CreateOwner_page />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
