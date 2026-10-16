import React from 'react';
import { ShieldAlert, AlertTriangle, PhoneCall, ExternalLink, Printer, FileDown } from 'lucide-react';

interface HeaderProps {
  onOpenPrint: () => void;
  progressPercent: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPrint, progressPercent }) => {
  return (
    <header className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white shadow-lg sticky top-0 z-40 border-b border-red-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-800/80 rounded-xl shadow-inner border border-red-500/30 flex items-center justify-center">
              <ShieldAlert className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  네이버 밴드 해킹 긴급 대처 센터
                </h1>
                <span className="inline-flex items-center gap-1 bg-red-950/70 text-red-200 border border-red-400/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                  긴급 대응 모드
                </span>
              </div>
              <p className="text-xs text-red-100 hidden sm:block mt-0.5 font-medium">
                방장(리더) 권한 강제 탈취 피해 복구 및 2차 금융·피싱 사기 방지 원스톱 솔루션
              </p>
            </div>
          </div>

          {/* Action buttons & Quick hotlines */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="hidden md:flex items-center gap-2 text-xs bg-red-900/60 px-3 py-1.5 rounded-lg border border-red-500/30 font-semibold">
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>신고핫라인: 경찰청 182 · KISA 118</span>
            </div>

            <button
              onClick={onOpenPrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-red-700 hover:bg-red-50 active:scale-95 text-xs sm:text-sm font-extrabold rounded-lg border border-white/80 transition-all shadow-md cursor-pointer"
              title="현재 피해 밴드와 해커 정보가 포함된 리포트 다운로드 및 인쇄 (PDF)"
            >
              <FileDown className="w-4 h-4 text-red-600" />
              <span>피해 요약 리포트 다운로드 / 인쇄 (PDF)</span>
            </button>
          </div>
        </div>

        {/* Progress Bar Header */}
        <div className="mt-3 pt-2.5 border-t border-red-500/30 flex items-center justify-between text-xs text-red-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">대응 조치 진행률:</span>
            <div className="w-28 sm:w-44 h-2 bg-red-950/60 rounded-full overflow-hidden border border-red-400/30">
              <div
                className="h-full bg-emerald-400 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-bold text-white text-[12px]">{progressPercent}% 완료</span>
          </div>

          <div className="text-[11px] text-red-200">
            {progressPercent === 100 ? (
              <span className="text-emerald-300 font-bold">모든 대응 조치가 완료되었습니다!</span>
            ) : (
              <span>단계별 조치를 하나씩 완료해 체크하세요</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
