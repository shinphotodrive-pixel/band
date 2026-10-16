import React from 'react';
import { ChecklistState } from '../types';
import { 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Zap, 
  ShieldAlert, 
  KeyRound, 
  LogOut, 
  GlobeLock, 
  Camera, 
  MessageSquare, 
  Send,
  PartyPopper
} from 'lucide-react';

interface NextCriticalStepWidgetProps {
  checklist: ChecklistState;
  onToggleCheck: (key: string) => void;
  onSelectTab: (tab: 'all' | 'step1' | 'step2' | 'step3' | 'member-alert' | 'fraud-guide' | 'password-vault' | 'case-studies' | 'timeline' | 'tutorials' | 'evidence') => void;
  onCopyText?: (text: string, label: string) => void;
}

interface StepDefinition {
  id: string;
  order: number;
  stage: string;
  tab: 'step1' | 'step2' | 'step3' | 'member-alert';
  title: string;
  instruction: string;
  badge: string;
  icon: React.ReactNode;
  directUrl?: string;
  directUrlLabel?: string;
}

const CRITICAL_STEPS: StepDefinition[] = [
  {
    id: 'step1_logout',
    order: 1,
    stage: '1단계 · 초동 조치',
    tab: 'step1',
    title: '모든 기기 원격 강제 로그아웃',
    instruction: '해커가 지금 접속해 있는 세션을 즉시 끊어야 추가 탈취 및 회원 강퇴를 멈출 수 있습니다.',
    badge: '최우선 즉시 실행',
    icon: <LogOut className="w-5 h-5 text-red-600" />,
    directUrl: 'https://nid.naver.com/user2/help/loginHistory.nhn',
    directUrlLabel: '네이버 기기 관리 바로가기'
  },
  {
    id: 'step1_password_2fa',
    order: 2,
    stage: '1단계 · 초동 조치',
    tab: 'step1',
    title: '비밀번호 변경 & 2단계 인증(2FA) 설정',
    instruction: '새롭고 안전한 복합 비밀번호로 변경하고 2단계 인증을 켜서 해커의 재침투를 원천 봉쇄하세요.',
    badge: '긴급 보안 강화',
    icon: <KeyRound className="w-5 h-5 text-blue-600" />,
    directUrl: 'https://nid.naver.com/user2/help/myInfo.nhn?m=viewSecurity',
    directUrlLabel: '비번 변경 & 2FA 설정 바로가기'
  },
  {
    id: 'step1_geo_block',
    order: 3,
    stage: '1단계 · 초동 조치',
    tab: 'step1',
    title: '해외 로그인 및 타지역 로그인 차단',
    instruction: '대다수 해킹 공격은 해외 프록시나 가상 IP를 이용합니다. 거주 지역 외 접속을 모두 차단하세요.',
    badge: '침입 경로 차단',
    icon: <GlobeLock className="w-5 h-5 text-indigo-600" />,
    directUrl: 'https://nid.naver.com/user2/help/myInfo.nhn?m=viewSecurity',
    directUrlLabel: '지역 차단 설정 바로가기'
  },
  {
    id: 'step1_ip_capture',
    order: 4,
    stage: '1단계 · 초동 조치',
    tab: 'step1',
    title: '해커 비인가 침입 IP 접속 기록 캡처',
    instruction: '네이버 로그인 관리에서 비정상 로그인 날짜, 시간, IP 기록 화면을 캡처하여 증거로 확보하세요.',
    badge: '증거 자료 확보',
    icon: <Camera className="w-5 h-5 text-amber-600" />,
    directUrl: 'https://nid.naver.com/user2/help/loginHistory.nhn',
    directUrlLabel: '로그인 이력(IP) 조회'
  },
  {
    id: 'step2_support_submitted',
    order: 5,
    stage: '2단계 · 권한 복구',
    tab: 'step2',
    title: 'BAND 헬프센터 1:1 고객센터 문의 접수',
    instruction: '자동 생성된 1:1 문의문을 복사하여 밴드 헬프센터에 리더 권한 복원 및 해커 제재를 접수하세요.',
    badge: '리더 권한 반환',
    icon: <MessageSquare className="w-5 h-5 text-emerald-600" />,
    directUrl: 'https://help.band.us/contact',
    directUrlLabel: 'BAND 1:1 문의 접수창 열기'
  },
  {
    id: 'step3_police_filed',
    order: 6,
    stage: '3단계 · 수사 & 전파',
    tab: 'step3',
    title: '회원 대상 사기주의 공지 전파 & 경찰청(ECRM) 신고',
    instruction: '카톡/문자로 회원들에게 사기 주의 공지를 전파하고 경찰청 사이버범죄시스템에 정식 신고하세요.',
    badge: '2차 피해 방지',
    icon: <Send className="w-5 h-5 text-purple-600" />,
    directUrl: 'https://ecrm.police.go.kr',
    directUrlLabel: '경찰청 사이버수사국 ECRM 접수'
  }
];

export const NextCriticalStepWidget: React.FC<NextCriticalStepWidgetProps> = ({
  checklist,
  onToggleCheck,
  onSelectTab
}) => {
  // Find first incomplete critical step
  const nextStep = CRITICAL_STEPS.find(s => !checklist[s.id]);
  const completedCount = CRITICAL_STEPS.filter(s => checklist[s.id]).length;
  const totalCount = CRITICAL_STEPS.length;
  const remainingCount = totalCount - completedCount;

  // All completed state
  if (!nextStep) {
    return (
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border border-emerald-500/40 p-5 sm:p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-400/40 text-emerald-300">
              <PartyPopper className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  모든 초동 대응 완료
                </span>
                <span className="text-xs text-emerald-300 font-semibold">6 / 6 단계 완료</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mt-1 text-white">
                긴급 핵심 대응 조치를 모두 완료하셨습니다!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
                계정 접근 차단, 밴드 헬프센터 복구 접수, 회원 경고 전파가 모두 끝났습니다. 이제 밴드 고객센터의 회신(통상 24~48시간)을 대기하시고, 증거 캡처본을 안전하게 보관하십시오.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectTab('evidence')}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-lg transition"
          >
            증거 일지 점검하기 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <aside 
      aria-label="지금 당장 실행해야 할 핵심 조치" 
      className="mb-6 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 border-2 border-red-500/60 p-5 sm:p-6 text-white shadow-xl relative overflow-hidden ring-4 ring-red-500/10"
    >
      {/* Background Accent Pulse */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        {/* Left Side: Step Focus Info */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-500/20 rounded-2xl border border-red-500/40 text-red-400 shrink-0 mt-0.5 animate-pulse">
            <Zap className="w-6 h-6 text-amber-400" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-red-600 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                지금 실행할 핵심 조치
              </span>
              <span className="text-xs text-slate-300 font-semibold bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                {nextStep.stage} (단계 {nextStep.order}/{totalCount})
              </span>
              <span className="text-xs text-amber-300 font-medium hidden sm:inline">
                남은 긴급 조치: {remainingCount}개
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{nextStep.order}. {nextStep.title}</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 mt-1.5 max-w-2xl leading-relaxed">
              {nextStep.instruction}
            </p>
          </div>
        </div>

        {/* Right Side: Fast Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
          {/* Direct official external link if available */}
          {nextStep.directUrl && (
            <a
              href={nextStep.directUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 text-xs sm:text-sm font-semibold rounded-xl transition shadow-xs"
            >
              <span>{nextStep.directUrlLabel || '해당 페이지로 이동'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            </a>
          )}

          {/* Jump to specific tab in this guide */}
          <button
            type="button"
            onClick={() => onSelectTab(nextStep.tab)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-blue-600/90 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-xs"
          >
            <span>상세 가이드 보기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mark Complete button right in widget */}
          <button
            type="button"
            onClick={() => onToggleCheck(nextStep.id)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 text-xs sm:text-sm font-black rounded-xl shadow-lg transition cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>이 조치 완료함</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
