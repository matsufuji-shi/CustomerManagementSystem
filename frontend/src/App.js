import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import CustomerList from "./components/CustomerList"; //一覧
import CustomerForm from "./components/CustomerForm"; //追加・編集
import CustomerDetail from "./components/CustomerDetail"; //詳細
import SearchBar from "./components/SearchBar"; //検索バー
import './App.css';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<CustomerList />} />
      <Route path="/add-form" element={<CustomerForm />} />
      <Route path="/detail/:id" element={<CustomerDetail />} />
      <Route path="/search/:id" element={<SearchBar />} />
    </Routes>
  )
}

export default App;