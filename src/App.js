import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import Change_pw_page from './pages/Change_password/index.jsx';
import UpdateDevices from './pages/Page_update_owner/Page_update_owner.jsx';
import CreateDevice from './pages/AddDevice/index.jsx';

import Devices from './pages/Devices/index.jsx';
import { AuthRoutes, GuestRoutes } from './middleware/PrivateRoutes.js';
import Login from './pages/authorization/Login/index.jsx';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<GuestRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthRoutes />}>
          {/* Remove this line from AuthRoutes */}
          {/* <Route path="/" element={<Devices />} /> */}
          <Route path="/Devices/add_device/" element={<CreateDevice />} />
          <Route path="/GarageOwner/update/:id" element={<UpdateDevices />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
