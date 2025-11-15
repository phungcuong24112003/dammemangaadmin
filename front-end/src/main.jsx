import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import './index.css'
import TagManagement from './page/TagManagement'
import AuthorManagement from './page/AuthorManagement'
import GuestManagement from './page/GuestManagement'
import Dashborad from './page/Dashborad'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Navigate to="/dashboard" replace />} />
  <Route path="/dashboard" element={<Dashborad />} />
  <Route path="/tagmanagement" element={<TagManagement />} />
  <Route path="/authormanagement" element={<AuthorManagement />} />
  <Route path="/guestmanagement" element={<GuestManagement />} />
</Routes>

    </BrowserRouter>
  </StrictMode>,
)
