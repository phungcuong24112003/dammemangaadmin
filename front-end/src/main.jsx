import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import './index.css'
import TagManagement from './page/TagManagement'
import AuthorManagement from './page/AuthorManagement'
import GuestManagement from './page/GuestManagement'
import MangaManagement from './page/MangaManagemnt'
import MangaDetailManagement from './page/MangaDetailManagement'
import DashBorad from './page/DashBorad'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashBorad />} />
        <Route path="/tagmanagement" element={<TagManagement />} />
        <Route path="/author-management" element={<AuthorManagement />} />
        <Route path="/guestmanagement" element={<GuestManagement />} />
        <Route path="/manga-management" element={<MangaManagement />} />
        <Route path="/manga-detail-management/:id" element={<MangaDetailManagement />} />
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
