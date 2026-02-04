import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './components/ui/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import CompanySetup from './pages/auth/CompanySetup';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ChatGroup from './pages/chat-group/ChatGroup';
import BlastSchedule from './pages/dashboard/BlastSchedule';
import BlastThread from './pages/dashboard/BlastThread';
import HsmTemplate from './pages/dashboard/HsmTemplate';
import DashboardOutbound from './pages/dashboard/Outbound';
import QaReport from './pages/dashboard/QaReport';
import Ticket from './pages/dashboard/Ticket';
import Compose from './pages/email/Compose';
import Draft from './pages/email/Draft';
import EmailHistory from './pages/email/History';
import Email from './pages/email/Inbox';
import Sent from './pages/email/Sent';
// import BlastHistory from './pages/report/BlastHistory';
// import AgentProductivity from './pages/report/AgentProductivity';
import ReportArticle from './pages/report/Article';
import ReportBlastHistory from './pages/report/BlastHistory';
// import CallDetail from './pages/report/CallDetail';
// import DailyCallPerformance from './pages/report/DailyCallPerformance';
// import DailyCallReport from './pages/report/DailyCallReport';
import AgentPerformance from './pages/home/AgentPerformance';
import AgentProductivity from './pages/home/AgentProductivity';
import Overview from './pages/home/Overview';
import Analytic from './pages/monitoring/Analytic';
import CallRecording from './pages/monitoring/CallRecording';
import ChannelInteraction from './pages/monitoring/ChannelInteraction';
import OutboundInteraction from './pages/monitoring/OutboundInteraction';
import ReportOmnichat from './pages/report/Omnichat';
import ReportOutbound from './pages/report/Outbound';
import OutboundCategory from './pages/setting/data-outbound/Category';
import OutboundImportData from './pages/setting/data-outbound/ImportData';
import OutboundPriority from './pages/setting/data-outbound/Priority';
import OutboundScriptOutbound from './pages/setting/data-outbound/ScriptOutbound';
import OutboundStatus from './pages/setting/data-outbound/Status';
import OutboundSubCategory from './pages/setting/data-outbound/SubCategory';
import Article from './pages/setting/data-ticket/Article';
import Category from './pages/setting/data-ticket/Category';
import Priority from './pages/setting/data-ticket/Priority';
import Status from './pages/setting/data-ticket/Status';
import SubCategory from './pages/setting/data-ticket/SubCategory';
import QaCategory from './pages/setting/form-builder-qa/Category';
import QaComponent from './pages/setting/form-builder-qa/Component';
import QaConfigField from './pages/setting/form-builder-qa/ConfigField';
import QaField from './pages/setting/form-builder-qa/Field';
import QaJenisPengaduan from './pages/setting/form-builder-qa/JenisPengaduan';
import FormBuilderTicketCategory from './pages/setting/form-builder-ticket/Category';
import FormBuilderTicketComponent from './pages/setting/form-builder-ticket/Component';
import FormBuilderTicketConfigField from './pages/setting/form-builder-ticket/ConfigField';
import FormBuilderTicketField from './pages/setting/form-builder-ticket/Field';
import FormBuilderTicketJenisPengaduan from './pages/setting/form-builder-ticket/JenisPengaduan';
import Blast from './pages/setting/general/Blast';
import BotInteraction from './pages/setting/general/BotInteraction';
import Channel from './pages/setting/general/Channel';
import CompanyModules from './pages/setting/general/company-modules/CompanyModules';
import CreateCompanyModule from './pages/setting/general/company-modules/Create';
import EditCompanyModule from './pages/setting/general/company-modules/Edit';
import Config from './pages/setting/general/config/Config';
import ConfigPbx from './pages/setting/general/config/ConfigPbx';
import ConfigSmtp from './pages/setting/general/config/ConfigSmtp';
import GroupRoute from './pages/setting/general/GroupRoute';
import HsmApprove from './pages/setting/general/hsm/Approve';
import HsmCreate from './pages/setting/general/hsm/Create';
import UserManagement from './pages/setting/general/UserManagement';
import WhatsappBlast from './pages/setting/general/whatsapp/Blast';
import WhatsappImportData from './pages/setting/general/whatsapp/ImportData';
import Setting from './pages/setting/Setting';
import OmnichatWallboard from './pages/wallboard/Omnichat';
import OutboundWallboard from './pages/wallboard/Outbound';
import Comment from './pages/workspace/Comment';
import Inbound from './pages/workspace/Inbound';
import Livechat from './pages/workspace/Livechat';
import Omnichat from './pages/workspace/Omnichat';
import Outbound from './pages/workspace/Outbound';
import OmnichatEmbed from './pages/workspace/OmnichatEmbed';
import OmnichatMobile from './pages/workspace/OmnichatMobile';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/company/setup" element={<CompanySetup />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/agent-performance" element={<AgentPerformance />} />
            <Route path="/agent-productivity" element={<AgentProductivity />} />
            <Route path="/omnichat" element={<Omnichat />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/livechat" element={<Livechat />} />
            <Route path="/inbound" element={<Inbound />} />
            <Route path="/outbound" element={<Outbound />} />
            <Route path="/email" element={<Email />} />
            <Route path="/email/compose" element={<Compose />} />
            <Route path="/email/draft" element={<Draft />} />
            <Route path="/email/sent" element={<Sent />} />
            <Route path="/email/history" element={<EmailHistory />} />
            <Route path="/chat-group" element={<ChatGroup />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/settings/general/company-modules" element={<CompanyModules />} />
            <Route path="/settings/general/company-modules/create" element={<CreateCompanyModule />} />
            <Route path="/settings/general/company-modules/edit/:id" element={<EditCompanyModule />} />
            <Route path="/settings/general/user-management" element={<UserManagement />} />
            <Route path="/settings/general/channel" element={<Channel />} />
            <Route path="/settings/general/group-route" element={<GroupRoute />} />
            <Route path="/settings/general/bot-interaction" element={<BotInteraction />} />
            <Route path="/settings/general/config" element={<Config />} />
            <Route path="/settings/general/config/smtp" element={<ConfigSmtp />} />
            <Route path="/settings/general/config/pbx" element={<ConfigPbx />} />
            <Route path="/settings/general/hsm/approve" element={<HsmApprove />} />
            <Route path="/settings/general/hsm/create" element={<HsmCreate />} />
            <Route path="/settings/general/whatsapp/blast" element={<WhatsappBlast />} />
            <Route path="/settings/general/whatsapp/import-data" element={<WhatsappImportData />} />
            <Route path="/settings/general/blast" element={<Blast />} />
            <Route path="/settings/data-ticket/article" element={<Article />} />
            <Route path="/settings/data-ticket/category" element={<Category />} />
            <Route path="/settings/data-ticket/sub-category" element={<SubCategory />} />
            <Route path="/settings/data-ticket/priority" element={<Priority />} />
            <Route path="/settings/data-ticket/status" element={<Status />} />
            <Route path="/settings/data-outbound/category" element={<OutboundCategory />} />
            <Route path="/settings/data-outbound/sub-category" element={<OutboundSubCategory />} />
            <Route path="/settings/data-outbound/priority" element={<OutboundPriority />} />
            <Route path="/settings/data-outbound/status" element={<OutboundStatus />} />
            <Route path="/settings/data-outbound/script-outbound" element={<OutboundScriptOutbound />} />
            <Route path="/settings/data-outbound/import-data" element={<OutboundImportData />} />
            <Route path="/settings/form-builder-qa/category" element={<QaCategory />} />
            <Route path="/settings/form-builder-qa/component" element={<QaComponent />} />
            <Route path="/settings/form-builder-qa/config-field" element={<QaConfigField />} />
            <Route path="/settings/form-builder-qa/field" element={<QaField />} />
            <Route path="/settings/form-builder-qa/jenis-pengaduan" element={<QaJenisPengaduan />} />
            <Route path="/settings/form-builder-ticket/category" element={<FormBuilderTicketCategory />} />
            <Route path="/settings/form-builder-ticket/component" element={<FormBuilderTicketComponent />} />
            <Route path="/settings/form-builder-ticket/config-field" element={<FormBuilderTicketConfigField />} />
            <Route path="/settings/form-builder-ticket/field" element={<FormBuilderTicketField />} />
            <Route path="/settings/form-builder-ticket/jenis-pengaduan" element={<FormBuilderTicketJenisPengaduan />} />
            <Route path="/report/article" element={<ReportArticle />} />
            <Route path="/report/blast-history" element={<ReportBlastHistory />} />
            <Route path="/report/omnichat" element={<ReportOmnichat />} />
            <Route path="/report/outbound" element={<ReportOutbound />} />
            <Route path="/dashboard/outbound" element={<DashboardOutbound />} />
            <Route path="/dashboard/blast-schedule" element={<BlastSchedule />} />
            <Route path="/dashboard/blast-thread" element={<BlastThread />} />
            <Route path="/dashboard/hsm-template" element={<HsmTemplate />} />
            <Route path="/dashboard/qa-report" element={<QaReport />} />
            <Route path="/dashboard/ticket" element={<Ticket />} />
            <Route path="/monitoring/analytic" element={<Analytic />} />
            <Route path="/monitoring/outbound-interaction" element={<OutboundInteraction />} />
            <Route path="/monitoring/channel-interaction" element={<ChannelInteraction />} />
            <Route path="/monitoring/call-recording" element={<CallRecording />} />
            <Route path="/wallboard/omnichat" element={<OmnichatWallboard />} />
            <Route path="/wallboard/outbound" element={<OutboundWallboard />} />
            <Route path="/omnichat-embed" element={<OmnichatEmbed />} />
            <Route path="/omnichat-mobile" element={<OmnichatMobile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;

