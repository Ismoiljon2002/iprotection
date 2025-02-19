import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';
import { LuBuilding2 } from 'react-icons/lu';
import { NavLink, Route, Routes } from 'react-router-dom';
import CompanySubpage from '../components/admin/CompanySubpage';

function AdminPanel() {
  return (
    <div className='admin-panel'>
      <div className='sidebar'>
        <NavLink
          className='nav-link'
          to={'/admin/company'}
          activeClassName='active'
        >
          <LuBuilding2 /> Kompaniya
        </NavLink>

        <NavLink
          className='nav-link'
          to={'/admin/market'}
          activeClassName='active'
        >
          <HiOutlineBuildingStorefront /> Market
        </NavLink>

        <NavLink
          className='nav-link'
          to={'/admin/user'}
          activeClassName='active'
        >
          <FaRegUser /> Foydalanuvchi
        </NavLink>
      </div>

      <div className='panel-subpage'>
        <Routes>
          <Route path='/company' element={<CompanySubpage />} />
          <Route path='/market' element={<>market page</>} />
          <Route path='/user' element={<>user page</>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;
