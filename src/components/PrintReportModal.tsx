import React from 'react';
import { IncidentData, ChecklistState } from '../types';
import { Printer, X, ShieldAlert, CheckCircle, AlertCircle, FileDown, Info, Clock, Calendar, CheckSquare } from 'lucide-react';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: IncidentData;
  checklist: ChecklistState;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  incident,
  checklist
}) => {
  if (!isOpen) return null;

  const notes = localStorage.getItem('band_hacking_evidence_notes') || incident.notes;

  // Load custom user timeline events
  const customEvents = (() => {
    try {
      const saved = localStorage.getItem('band_incident_timeline_events_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  })();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar (Non-printed) */}
        <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <FileDown className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-bold text-sm block">경찰청·고객센터 제출용 공식 수사 의뢰 & 타임라인 리포트</span>
              <span className="text-[11px] text-slate-300">피해 현황, 초동 조치, 시간대별 타임라인이 포함된 정식 서식 (PDF/인쇄)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handlePrint}
              type="button"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              지금 인쇄 / PDF 저장
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tip Bar for PDF saving */}
        <div className="bg-blue-50 px-5 py-2.5 border-b border-blue-200 text-xs text-blue-900 flex items-center gap-2 print:hidden">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>PDF 파일로 저장하는 방법:</strong> 상단의 <strong>[지금 인쇄 / PDF 저장]</strong>을 누른 후, 인쇄 창의 대상(프린터)에서 <strong>'PDF로 저장 (Save as PDF)'</strong>을 선택하시면 컴퓨터/스마트폰에 PDF 문서로 바로 다운로드 저장됩니다.
          </span>
        </div>

        {/* Printable Document Body */}
        <div id="printable-sheet" className="p-8 sm:p-10 overflow-y-auto print:p-0 print:m-0 print:overflow-visible text-slate-900 text-sm">
          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-slate-900 mb-6">
            <div className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full mb-2 border border-red-200">
              경찰청 사이버수사국 ECRM 제출 및 밴드 헬프센터 소명용 공식 리포트
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mb-1">
              네이버 밴드 침해사고 대응 타임라인 및 피해 사실 증명서
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              발행일시: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })} | 문서번호: BAND-CRIME-{new Date().getFullYear()}-{Date.now().toString().slice(-6)}
            </p>
          </div>

          {/* Section 1: 피해 기본 사항 */}
          <div className="mb-6">
            <h2 className="text-sm font-bold bg-slate-100 p-2 border-l-4 border-slate-800 mb-3 flex items-center justify-between">
              <span>1. 신고인 및 침해사고 개요</span>
              <span className="text-[11px] text-slate-500 font-normal">신고 일자: {new Date().toLocaleDateString('ko-KR')}</span>
            </h2>
            <table className="w-full text-xs border border-slate-300 border-collapse">
              <tbody>
                <tr>
                  <th className="bg-slate-50 border border-slate-300 p-2 text-left w-40 font-semibold">피해자 (원래 리더/개설자)</th>
                  <td className="border border-slate-300 p-2 font-bold text-slate-900">{incident.reporterName || '본인'}</td>
                </tr>
                <tr>
                  <th className="bg-slate-50 border border-slate-300 p-2 text-left font-semibold">피해 발생 인지 일시</th>
                  <td className="border border-slate-300 p-2">{incident.incidentDateTime}</td>
                </tr>
                <tr>
                  <th className="bg-slate-50 border border-slate-300 p-2 text-left font-semibold">권한 탈취자 (해커 닉네임)</th>
                  <td className="border border-slate-300 p-2 font-bold text-red-700">
                    {incident.hackerNames.join(', ')} (가짜 방장으로 강제 위임 등록됨)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: 피해 밴드 내역 */}
          <div className="mb-6">
            <h2 className="text-sm font-bold bg-slate-100 p-2 border-l-4 border-slate-800 mb-3">
              2. 권한 탈취 피해 밴드 및 확인된 접속 주소 (URL)
            </h2>
            <div className="border border-slate-300 rounded p-3 text-xs space-y-2.5 bg-white">
              <div>
                <strong className="text-slate-900 block mb-1">
                  • 피해 확인 밴드 목록 ({incident.bandNames.length}개):
                </strong>
                <ul className="list-disc list-inside space-y-0.5 ml-2">
                  {incident.bandNames.map((b, i) => (
                    <li key={i} className="font-semibold text-slate-800">
                      {b}
                      {b.includes('상품 판매') && (
                        <span className="ml-1.5 text-[11px] text-red-600 font-bold">[상거래방 - 금전사기 집중 표적]</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <strong className="text-slate-900 block mb-1">
                  • 확인된 밴드 접속 주소 (URL):
                </strong>
                <ul className="list-none space-y-1 ml-2 font-mono text-[11px] text-blue-900">
                  {incident.bandUrls.map((u, i) => (
                    <li key={i} className="bg-slate-50 p-1.5 rounded border border-slate-200">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: 사고 대응 타임라인 (핵심 연동) */}
          <div className="mb-6">
            <h2 className="text-sm font-bold bg-slate-100 p-2 border-l-4 border-slate-800 mb-3 flex items-center justify-between">
              <span>3. 사고 대응 경과 타임라인 (시간순 행적 일지)</span>
              <span className="text-[11px] text-slate-500 font-normal">경찰 및 고객센터 사실 확인용</span>
            </h2>

            <div className="border border-slate-300 rounded p-3 text-xs space-y-2 bg-white">
              {/* Core Milestone Timeline */}
              <div className="space-y-2">
                <div className="flex items-start gap-2 pb-1.5 border-b border-slate-100">
                  <span className="bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded text-[10px] shrink-0">
                    발생
                  </span>
                  <div>
                    <span className="font-bold text-slate-900">침해 발생 및 리더 탈취: </span>
                    <span className="text-slate-700">{incident.incidentDateTime} 경 권한 탈취 및 강퇴 확인.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pb-1.5 border-b border-slate-100">
                  <span className="bg-blue-600 text-white font-extrabold px-1.5 py-0.5 rounded text-[10px] shrink-0">
                    1단계
                  </span>
                  <div>
                    <span className="font-bold text-slate-900">초동 조치 완료 현황: </span>
                    <span className="text-slate-700">
                      원격 로그아웃({checklist['step1_logout'] ? '완료' : '진행중'}), 
                      비밀번호/2FA({checklist['step1_password_2fa'] ? '완료' : '진행중'}), 
                      해외차단({checklist['step1_geo_block'] ? '완료' : '진행중'}), 
                      IP기록캡처({checklist['step1_ip_capture'] ? '완료' : '진행중'})
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pb-1.5 border-b border-slate-100">
                  <span className="bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded text-[10px] shrink-0">
                    2단계
                  </span>
                  <div>
                    <span className="font-bold text-slate-900">BAND 고객센터 1:1 접수: </span>
                    <span className="text-slate-700">
                      {checklist['step2_support_submitted'] ? '복구 신청서 및 IP 증거 파일 접수 완료 (회신 대기)' : '고객센터 접수 진행 중'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pb-1.5 border-b border-slate-100">
                  <span className="bg-amber-600 text-white font-extrabold px-1.5 py-0.5 rounded text-[10px] shrink-0">
                    3단계
                  </span>
                  <div>
                    <span className="font-bold text-slate-900">회원 전파 & 경찰청 신고: </span>
                    <span className="text-slate-700">
                      {checklist['step3_police_filed'] ? '회원 사기주의 공지 전파 및 사이버범죄시스템(ECRM) 신고 접수 완료' : '전파 및 신고 진행 중'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Custom User Events Table */}
              {customEvents && customEvents.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-200">
                  <strong className="text-slate-800 block mb-1.5">
                    • 피해자 직접 기록 사건 상세 일지 ({customEvents.length}건):
                  </strong>
                  <table className="w-full text-[11px] border border-slate-200 border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700">
                        <th className="border border-slate-200 p-1.5 text-left w-24">발생 시각</th>
                        <th className="border border-slate-200 p-1.5 text-left w-44">사건 내용</th>
                        <th className="border border-slate-200 p-1.5 text-left">상세 진술 및 증거</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customEvents.map((evt: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="border border-slate-200 p-1.5 font-mono font-semibold text-slate-800">{evt.time}</td>
                          <td className="border border-slate-200 p-1.5 font-semibold text-slate-900">{evt.title}</td>
                          <td className="border border-slate-200 p-1.5 text-slate-700">{evt.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: 사건 경위 및 상세 메모 */}
          <div className="mb-6">
            <h2 className="text-sm font-bold bg-slate-100 p-2 border-l-4 border-slate-800 mb-2">
              4. 사건 발생 경위 및 진술 상세
            </h2>
            <div className="border border-slate-300 rounded p-3 text-xs leading-relaxed whitespace-pre-wrap font-mono bg-slate-50 min-h-[90px]">
              {notes || '상기 밴드의 리더 권한이 비인가 제3자에 의해 무단으로 탈취되었으며, 본인은 밴드에서 강제 퇴장당하여 회원들에게 2차 금전사기 피해가 우려되는 상황입니다.'}
            </div>
          </div>

          {/* Bottom Confirmation & Signature */}
          <div className="text-center pt-4 border-t border-slate-400 text-xs">
            <p className="mb-5 font-medium">위 진술 및 타임라인 내역은 사실과 다름없음을 확인하며, 리더 권한 원상 복원 및 정식 수사를 요청합니다.</p>
            <div className="flex justify-end gap-16 pr-8">
              <span>신고인 (서명 또는 인): </span>
              <span className="border-b border-slate-400 w-36 inline-block"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
