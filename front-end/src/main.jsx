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
import EditMangaDetailManagement from './page/EditMangaDetailManagement'
import CreateChapter from './components/CreateChapter/CreateChapter';
import ChapterDetail from './components/ChapterDetail/ChapterDetail';
import DashBorad from './page/DashBorad'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<DashBorad />} />
        <Route path="/admin/tag-management" element={<TagManagement />} />
        <Route path="/admin/author-management" element={<AuthorManagement />} />
        <Route path="/admin/guest-management" element={<GuestManagement />} />
        <Route path="/admin/manga-management" element={<MangaManagement />} />
        <Route path="/admin/manga-detail-management/:id" element={<MangaDetailManagement />} />
        <Route path="/admin/edit-manga-detail/:id" element={<EditMangaDetailManagement />} />
        <Route path="/admin/create-chapter/:storyId" element={<CreateChapter />} />
        <Route path="/admin/chapter-detail/:storyId/:chapterId" element={<ChapterDetail />} />
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
