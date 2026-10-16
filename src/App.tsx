import React, { useState, useEffect } from 'react';
import { defaultIncidentData } from './data/defaultIncident';
import { IncidentData, ChecklistState } from './types';
import { Header } from './components/Header';
import { IncidentSummary } from './components/IncidentSummary';
import { Step1InitialResponse } from './components/Step1InitialResponse';
import { Step2BandSupport } from './components/Step2BandSupport';
import { Step3PoliceAndAlert } from './components/Step3PoliceAndAlert';
import { EvidenceChecklist } from './components/EvidenceChecklist';
import { PrintReportModal } from './components/PrintReportModal';
import { Toast } from './components/Toast';
import { 
  ShieldCheck, 
  MessageSquare, 
  Send, 
  Camera, 
  Layers, 
  FileText, 
  PhoneCall,
  ExternalLink,
  LifeBuoy
} from 'lucide-react';

export default function App() {
  // Load incident data from localStorage or fallback to defaults
  const [incident, setIncident] = useState<IncidentData>(() => {
    try {
      const saved = localStorage.getItem('band_incident_data_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultIncidentData;
  });

  // Load checklist state
  const [checklist, setChecklist] = useState<ChecklistState>(() => {
    try {
      const saved = localStorage.getItem('band_incident_checklist_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      step1_logout: false,
      step1_password_2fa: false,
      step1_geo_block: false,
      step1_ip_capture: false,
      step2_support_submitted: false,
      step3_police_filed: false,
      ev_naver_ip: false,
      ev_ejected_screen: false,
      ev_hacker_profile: false,
      ev_fake_notices: false,
      ev_past_ownership: false,
      ev_member_reports: false
    };
  });

  // Active view tab filter
  const [activeTab, setActiveTab] = useState<'all' | 'step1' | 'step2' | 'step3' | 'evidence'>('all');

  // Print modal state
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Persist incident data
  useEffect(() => {
    try {
      localStorage.setItem('band_incident_data_v1', JSON.stringify(incident));
    } catch (e) {
      console.error(e);
    }
  }, [incident]);

  // Persist checklist
  useEffect(() => {
    try {
      localStorage.setItem('band_incident_checklist_v1', JSON.stringify(checklist));
    } catch (e) {
      console.error(e);
    }
  }, [checklist]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2800);
  };

  const handleCopyText = (text: string, label: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label}이(가) 클립보드에 복사되었습니다!`);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  const fallbackCopy = (text: string, label: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(`${label}이(가) 클립보드에 복사되었습니다!`);
    } catch (err) {
      console.error('Copy error', err);
      showToast('복사에 실패했습니다. 수동으로 텍스트를 복사해 주세요.');
    }
    document.body.removeChild(textarea);
  };

  const handleToggleCheck = (key: string) => {
    setChecklist(prev => {
      const nextVal = !prev[key];
      const updated = { ...prev, [key]: nextVal };
      if (nextVal) {
        showToast('항목 조치가 완료 체크되었습니다.');
      }
      return updated;
    });
  };

  const handleResetIncident = () => {
    if (window.confirm('기본 피해 데이터(상품 판매방, 다락방, OCS모임방, 이상철, 전시숙)로 되돌리시겠습니까?')) {
      setIncident(defaultIncidentData);
      showToast('초기 데이터로 재설정되었습니다.');
    }
  };

  // Calculate progress percent based on primary 6 action items
  const primaryKeys = ['step1_logout', 'step1_password_2fa', 'step1_geo_block', 'step1_ip_capture', 'step2_support_submitted', 'step3_police_filed'];
  const completedCount = primaryKeys.filter(k => checklist[k]).length;
  const progressPercent = Math.round((completedCount / primaryKeys.length) * 100);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Emergency Header */}
      <Header 
        onOpenPrint={() => setIsPrintModalOpen(true)}
        progressPercent={progressPercent}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
        {/* Incident Summary Card */}
        <IncidentSummary
          incident={incident}
          onUpdateIncident={setIncident}
          onResetIncident={handleResetIncident}
        />

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-200/80 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl text-xs sm:text-sm font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-blue-600" />
              전체 대응 단계
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('step1')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'step1'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-red-600" />
              1단계: 초동 조치
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('step2')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'step2'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              2단계: 1:1 고객센터 신고
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('step3')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'step3'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Send className="w-4 h-4 text-amber-600" />
              3단계: 회원 전파 & 경찰 신고
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('evidence')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'evidence'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              <Camera className="w-4 h-4 text-indigo-600" />
              증거 수집 체크리스트
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium hidden md:block">
            * 모든 체크 진행률과 메모는 브라우저에 안전하게 보관됩니다.
          </div>
        </div>

        {/* Tab Sections */}
        {(activeTab === 'all' || activeTab === 'step1') && (
          <Step1InitialResponse
            checklist={checklist}
            onToggleCheck={handleToggleCheck}
          />
        )}

        {(activeTab === 'all' || activeTab === 'step2') && (
          <Step2BandSupport
            incident={incident}
            checklist={checklist}
            onToggleCheck={handleToggleCheck}
            onCopyText={handleCopyText}
          />
        )}

        {(activeTab === 'all' || activeTab === 'step3') && (
          <Step3PoliceAndAlert
            incident={incident}
            checklist={checklist}
            onToggleCheck={handleToggleCheck}
            onCopyText={handleCopyText}
          />
        )}

        {(activeTab === 'all' || activeTab === 'evidence') && (
          <EvidenceChecklist
            checklist={checklist}
            onToggleCheck={handleToggleCheck}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Printable Sheet Modal */}
      <PrintReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        incident={incident}
        checklist={checklist}
      />

      {/* Floating Quick Action Footer Bar */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LifeBuoy className="w-4 h-4 text-slate-400" />
            <span>네이버 밴드 해킹 긴급 대처 센터 | 피해자 신속 구제 지원 안내</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap text-slate-600 font-medium">
            <a
              href="https://help.band.us"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 flex items-center gap-1"
            >
              밴드 헬프센터 <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://ecrm.police.go.kr"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 flex items-center gap-1"
            >
              경찰청 사이버수사국 ECRM <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://spam.kisa.or.kr"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 flex items-center gap-1"
            >
              KISA 불법스팸대응센터 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Global Toast */}
      <Toast message={toastMessage} isVisible={isToastVisible} />
    </div>
  );
}
