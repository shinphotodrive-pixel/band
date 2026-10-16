import React from 'react';
import { 
  LogOut, 
  KeyRound, 
  GlobeLock, 
  Smartphone, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { ChecklistState } from '../types';

interface Step1Props {
  checklist: ChecklistState;
  onToggleCheck: (key: string) => void;
}

export const Step1InitialResponse: React.FC<Step1Props> = ({
  checklist,
  onToggleCheck
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all">
      {/* Header */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 px-6 py-4.5 flex items-center justify-between text-white">
        <div className="flex items-center gap-3.5">
          <div className="bg-blue-500 text-white w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-md border border-blue-400">
            1
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">긴급 초동 조치 (지금 즉시 실행)</h2>
              <span className="bg-red-500/80 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                최우선 필수
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              해커의 세션을 강제 종료시키고, 비밀번호와 2단계 인증으로 계정 통제권을 탈환합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong>경고:</strong> 지금 즉시 세션을 종료하지 않으면 해커가 귀하의 명의로 밴드 멤버들에게 <strong>“계좌로 급히 송금해달라”</strong>거나 <strong>“스미싱/피싱 링크를 클릭하라”</strong>는 악성 글을 대량 발송하여 수백~수천만 원 상당의 2차 금융 사기가 발생할 수 있습니다.
          </div>
        </div>

        {/* 4 Critical Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Action 1: 전 기기 강제 로그아웃 */}
          <div className={`rounded-xl border p-5 relative transition-all ${
            checklist['step1_logout'] ? 'bg-emerald-50/50 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-blue-300'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <LogOut className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">1. 모든 기기 강제 원격 로그아웃</h3>
                  <span className="text-xs text-slate-500 font-medium">해커가 현재 물고 있는 세션을 강제 종료</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleCheck('step1_logout')}
                className="text-slate-400 hover:text-emerald-600 transition"
              >
                {checklist['step1_logout'] ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
              </button>
            </div>

            <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-700 space-y-2 mb-4 bg-white p-3.5 rounded-lg border border-slate-200/80">
              <li>
                <strong>네이버 로그인 기기 관리</strong> 페이지 접속
              </li>
              <li>
                '현재 로그인된 기기' 목록에서 본인 기기를 제외하고 <strong className="text-red-600">전체 로그아웃</strong> 클릭
              </li>
              <li>
                <strong>밴드(BAND) 앱:</strong> [더보기 ≡] → [설정 ⚙️] → [계정 관리] → [다른 기기 접속 해제] 클릭
              </li>
            </ol>

            <a
              href="https://nid.naver.com/user2/help/loginHistory.nhn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
            >
              네이버 로그인 기기 관리 바로가기 <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Action 2: 비밀번호 변경 & 2FA */}
          <div className={`rounded-xl border p-5 relative transition-all ${
            checklist['step1_password_2fa'] ? 'bg-emerald-50/50 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-blue-300'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">2. 비밀번호 변경 & 2단계 인증(2FA)</h3>
                  <span className="text-xs text-slate-500 font-medium">재침투를 차단하는 최고 수준 방어막</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleCheck('step1_password_2fa')}
                className="text-slate-400 hover:text-emerald-600 transition"
              >
                {checklist['step1_password_2fa'] ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
              </button>
            </div>

            <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-700 space-y-2 mb-4 bg-white p-3.5 rounded-lg border border-slate-200/80">
              <li>
                다른 사이트나 과거에 <strong>단 한 번도 쓴 적 없는 복합 암호</strong>로 변경
              </li>
              <li>
                <strong>2단계 인증 (2FA) 즉시 필수 켜기:</strong> 스마트폰 알림 승인이 없으면 로그인 불가
              </li>
              <li>
                비상 연락용 이메일/전화번호가 해커 번호로 변경되지 않았는지 확인
              </li>
            </ol>

            <a
              href="https://nid.naver.com/user2/help/myInfo.nhn?m=viewSecurity"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
            >
              네이버 보안설정 (비번 변경 & 2FA) 바로가기 <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Action 3: 타지역 및 해외 로그인 차단 */}
          <div className={`rounded-xl border p-5 relative transition-all ${
            checklist['step1_geo_block'] ? 'bg-emerald-50/50 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-blue-300'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <GlobeLock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">3. 해외 & 타지역 로그인 차단</h3>
                  <span className="text-xs text-slate-500 font-medium">대다수 해킹 범죄는 해외 VPN 또는 중국·동남아 IP 활용</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleCheck('step1_geo_block')}
                className="text-slate-400 hover:text-emerald-600 transition"
              >
                {checklist['step1_geo_block'] ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 mb-3 bg-white p-3.5 rounded-lg border border-slate-200/80">
              네이버 보안설정 페이지 하단에서 <strong>[해외 로그인 차단: ON]</strong> 및 <strong>[타지역 로그인 차단: 거주 지역만 허용]</strong>으로 설정하세요. 해커가 중국, 홍콩, 러시아, 미국 등의 프록시로 재접속하는 것을 물리적으로 원천 봉쇄합니다.
            </p>

            <a
              href="https://nid.naver.com/user2/help/myInfo.nhn?m=viewSecurity"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition shadow-sm"
            >
              지역 차단 설정 바로가기 <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Action 4: 침입 IP 기록 캡처 */}
          <div className={`rounded-xl border p-5 relative transition-all ${
            checklist['step1_ip_capture'] ? 'bg-emerald-50/50 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-blue-300'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">4. 해커 침입 IP 및 접속 기록 캡처</h3>
                  <span className="text-xs text-slate-500 font-medium">경찰 수사(ECRM) 및 네이버 복구 심사에 필수 증거</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleCheck('step1_ip_capture')}
                className="text-slate-400 hover:text-emerald-600 transition"
              >
                {checklist['step1_ip_capture'] ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 mb-3 bg-white p-3.5 rounded-lg border border-slate-200/80">
              네이버 [내 정보] → [보안설정] → <strong>[로그인 관리 (로그인 이력)]</strong>에 들어가서 본인이 접속하지 않은 날짜/시간대의 비정상 접속 IP 기록 목록 전체를 <strong>화면 캡처(스크린샷)</strong>하여 안전하게 보관하세요.
            </p>

            <a
              href="https://nid.naver.com/user2/help/loginHistory.nhn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition shadow-sm"
            >
              로그인 이력(IP 내역) 조회 바로가기 <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
