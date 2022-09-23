import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from 'pages';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
