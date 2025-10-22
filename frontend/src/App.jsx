import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";  
import CampaignDasboard from './pages/CampaignDasboard';
import CreateCampaign from './pages/CreateCampaign';
import CampaignList from './pages/CampaignList';
import UpdateCampaign from './pages/UpdateCampaign';
import CampaignPage from './pages/CampaignPage';
import ParticipantList from './pages/ParticipantList';
import CampaignFinance from './pages/CampaignFinance';
import FinanceDashboard from './pages/FinanceDashboard';
import CreateBill from './pages/CreateBill';
import AddTransaction from './pages/AddTransaction';
import TransactionList from './pages/TransactionList';
import Reports from './pages/Reports';
import AddServiceForm from './pages/AddServiceForm';
import TestPaymentPage from './pages/TestPaymentPage';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path='/' element={<CampaignDasboard />} />
        <Route path='/createcampaign' element={<CreateCampaign />} />
        <Route path='/campaignlist' element={<CampaignList />} />
        <Route path='/updatecampaign' element={<UpdateCampaign />} />
        <Route path='/campaignpage' element={<CampaignPage />} />
        <Route path='/participantlist' element={<ParticipantList />} />
        <Route path='/campaignfinance' element={<CampaignFinance />} />
        <Route path='/financedashboard' element={<FinanceDashboard />} />
        <Route path='/createbill' element={<CreateBill />} />
        <Route path='/addtransaction' element={<AddTransaction />} />
        <Route path='/transactionlist' element={<TransactionList />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/addserviceform' element={<AddServiceForm />} />
        <Route path='/testpaymentpage' element={<TestPaymentPage />} />
      </Routes>
    </div>  
  );
}

export default App
