import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import CustomerList from "./components/CustomerList"; //一覧
import CustomerForm from "./components/CustomerForm"; //追加・編集
import CustomerDetail from "./components/CustomerDetail"; //詳細

import './styles.css';


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<CustomerList />} />
      <Route path="/add-form" element={<CustomerForm />} /> {/*追加 */}
      <Route path="/form/:id" element={<CustomerForm />} /> {/*編集 */}
      <Route path="/detail/:id" element={<CustomerDetail />} /> {/*詳細 */}
      {/* <Route path="/search" element={<SearchBar />} /> 検索コンポーネント */}
    </Routes>
  )
}

export default App;