import React from 'react';
import { IncidentData, ChecklistState } from '../types';
import { Printer, X, ShieldAlert, CheckCircle, AlertCircle } from 'lucide-react';

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar (Non-printed) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-sm">경찰서 제출 및 보관용 피해 사실 확인서 미리보기</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              지금 인쇄 / PDF 저장
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div id="printable-sheet" className="p-8 sm:p-10 overflow-y-auto print:p-0 print:m-0 print:overflow-visible text-slate-900 text-sm">
          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-slate-900 mb-6">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 mb-1">
              네이버 밴드 해킹 및 방장(리더) 권한 탈취 피해 진술서
            </h1>
            <p className="text-xs text-slate-500">
              작성일자: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })} | 목적: 경찰서 사이버수사팀 제출 및 밴드 고객센터 소명용
            </p>
          </div>

          {/* Section 1: 신고인 및 사건 개요 */}
          <div className="mb-6">
            <h2 className="text-sm font-bold bg-slate-100 p-2 border-l-4 border-slate-800 mb-3">
              1. 피해 기본 사항
            </h2>
            <table className="w-full text-xs border border-slate-300 border-collapse">
              <tbody>
                <tr>
                  <th className="bg-slate-50 border border-slate-300 p-2 text-left w-36 font-semibold">피해자(원래 리더)</th>
                  <td className="border border-slate-300 p-2">{incident.reporterName || '본인'}</td>
                </tr>
                <tr>
                  <th className="bg-slate-50 border border-slate-300 p-2 text-left font-semibold">피해 발생 인지 일시</th>
                  <td className="border border-slate-300 p-2">{incident.incidentDateTime}</td>
                </tr>
                <tr>
                  <th className="bg-slate-50 border border-slate-300 p-2 text-left font-semibold">권한 탈취자(해커 닉네임)</th>
                  <td className="border border-slate-300 p-2 font-bold text-red-700">
                    {incident.hackerNames.join(', ')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: 피해 밴드 내역 */}
          <div className="mb-6">
            <h2 className="text-sm font-bold bg-slate-100 p-2 border-l-4 border-slate-800 mb-3">
              2. 권한 탈취 피해 밴드 내역
            </h2>
            <div className="border border-slate-300 rounded p-3 text-xs space-y-2">
              <div>
                <strong>• 대상 밴드명 ({incident.bandNames.length}개):</strong>
                <ul className="list-disc list-inside mt-1 ml-2 space-y-0.5">
                  {incident.bandNames.map((b, i) => (
                    <li key={i} className="font-semibold text-slate-800">{b}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <strong>• 확인된 밴드 URL:</strong>
                <ul className="list-none mt-1 ml-2 space-y-0.5 text-blue-800 font-mono text-[11px]">
                  {incident.bandUrls.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: 초동 조치 및 보안 조치 이행 여부 */}
          <div className="mb-6">
            <h2 className="text-sm font-bold bg-slate-100 p-2 border-l-4 border-slate-800 mb-3">
              3. 피해자의 초동 대응 조치 현황
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 border border-slate-300 rounded flex items-center justify-between">
                <span>네이버/밴드 전 기기 원격 로그아웃:</span>
                <span className="font-bold">{checklist['step1_logout'] ? '✓ 완료' : '미완료'}</span>
              </div>
              <div className="p-2 border border-slate-300 rounded flex items-center justify-between">
                <span>비밀번호 변경 및 2단계 인증(2FA):</span>
                <span className="font-bold">{checklist['step1_password_2fa'] ? '✓ 완료' : '미완료'}</span>
              </div>
              <div className="p-2 border border-slate-300 rounded flex items-center justify-between">
                <span>해외/타지역 로그인 차단 설정:</span>
                <span className="font-bold">{checklist['step1_geo_block'] ? '✓ 완료' : '미완료'}</span>
              </div>
              <div className="p-2 border border-slate-300 rounded flex items-center justify-between">
                <span>비인가 침입 IP 내역 증거 캡처:</span>
                <span className="font-bold">{checklist['step1_ip_capture'] ? '✓ 완료' : '미완료'}</span>
              </div>
            </div>
          </div>

          {/* Section 4: 사건 경위 및 메모 */}
          <div className="mb-8">
            <h2 className="text-sm font-bold bg-slate-100 p-2 border-l-4 border-slate-800 mb-3">
              4. 사건 발생 경위 및 진술 상세
            </h2>
            <div className="border border-slate-300 rounded p-3 text-xs leading-relaxed whitespace-pre-wrap font-mono bg-slate-50 min-h-[100px]">
              {notes || '상기 밴드의 리더 권한이 비인가 제3자에 의해 무단으로 탈취되었으며, 본인은 밴드에서 강제 퇴장당하여 회원들에게 2차 금전사기 피해가 우려되는 상황입니다.'}
            </div>
          </div>

          {/* Bottom Confirmation & Signature */}
          <div className="text-center pt-4 border-t border-slate-400 text-xs">
            <p className="mb-6">위 진술 내용은 사실과 다름없음을 확인합니다.</p>
            <div className="flex justify-end gap-16 pr-8">
              <span>신고인(서명 또는 인): </span>
              <span className="border-b border-slate-400 w-32 inline-block"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
