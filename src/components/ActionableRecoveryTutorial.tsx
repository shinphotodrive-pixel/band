import React, { useState } from 'react';
import { IncidentData } from '../types';
import { 
  Play, 
  Video, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  KeyRound, 
  MessageSquare, 
  Globe, 
  Layers, 
  Smartphone,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface ActionableRecoveryTutorialProps {
  incident: IncidentData;
  onSelectTab: (tab: any) => void;
  onShowToast: (msg: string) => void;
}

interface VideoTutorial {
  id: string;
  category: 'naver_security' | 'band_support' | 'police_ecrm' | 'password_2fa';
  title: string;
  duration: string;
  badge: string;
  badgeColor: string;
  thumbnailBg: string;
  officialDocUrl: string;
  officialDocLabel: string;
  walkthroughSteps: {
    time: string;
    action: string;
    description: string;
  }[];
  quickTips: string[];
}

const TUTORIALS: VideoTutorial[] = [
  {
    id: 'tut_naver_logout',
    category: 'naver_security',
    title: '네이버 로그인 관리: 전 기기 원격 로그아웃 & 침입 IP 캡처법',
    duration: '02:45',
    badge: '1단계 필수',
    badgeColor: 'bg-red-600 text-white',
    thumbnailBg: 'from-slate-900 to-red-950',
    officialDocUrl: 'https://nid.naver.com/user2/help/loginHistory.nhn',
    officialDocLabel: '네이버 로그인 관리 바로가기',
    walkthroughSteps: [
      {
        time: '00:15',
        action: '네이버 내정보 > 보안설정 이동',
        description: '네이버 메인에서 프로필 아이콘 클릭 후 [내정보 > 보안설정] 탭으로 이동합니다.'
      },
      {
        time: '00:45',
        action: '로그인 관리에서 [전체 기기 로그아웃] 클릭',
        description: '현재 연결된 스마트폰, PC, 태블릿 목록 우측의 [전체 로그아웃] 버튼을 눌러 해커의 세션을 강제 종료합니다.'
      },
      {
        time: '01:20',
        action: '로그인 이력(IP/타임스탬프) 전체 화면 캡처',
        description: '비정상 접속 시간과 IP 주소가 표시된 화면을 스마트폰 스크린샷이나 캡처 도구로 저장합니다.'
      }
    ],
    quickTips: [
      '모바일 네이버 앱에서도 [설정 > 내 계정 관리 > 로그인 관리]에서 동일하게 진행 가능합니다.',
      'IP 주소의 마지막 자리까지 모두 보이도록 전체 화면을 캡처해야 수사 자료로 채택됩니다.'
    ]
  },
  {
    id: 'tut_2fa_setup',
    category: 'password_2fa',
    title: '네이버 2단계 인증(2FA) 설정 및 해외/타지역 로그인 차단',
    duration: '03:10',
    badge: '재침투 방어',
    badgeColor: 'bg-blue-600 text-white',
    thumbnailBg: 'from-slate-900 to-blue-950',
    officialDocUrl: 'https://nid.naver.com/user2/help/myInfo.nhn?m=viewSecurity',
    officialDocLabel: '2단계 인증 설정 바로가기',
    walkthroughSteps: [
      {
        time: '00:20',
        action: '보안설정 > 2단계 인증 [설정하기] 클릭',
        description: '비밀번호를 입력하여 본인 확인을 거친 후 2단계 인증 마법사를 시작합니다.'
      },
      {
        time: '01:10',
        action: '본인 명의 스마트폰 네이버 앱 기기 등록',
        description: '로그인 시도 시 알림 푸시를 수신할 주 스마트폰 기기를 지정합니다.'
      },
      {
        time: '02:05',
        action: '해외 로그인 차단 및 타지역 로그인 차단 [ON]',
        description: '해외 IP 접속 차단과 본인이 거주하는 시/도 외 지역 로그인 차단을 활성화합니다.'
      }
    ],
    quickTips: [
      '2단계 인증을 켜면 해커가 아이디와 비밀번호를 알고 있어도 휴대폰 승인이 없어 침입하지 못합니다.',
      '기기 변경을 대비하여 [OTP 인증번호] 또는 비상 복구 번호도 함께 확인해 두세요.'
    ]
  },
  {
    id: 'tut_band_contact',
    category: 'band_support',
    title: 'BAND 헬프센터 1:1 고객센터 접수 & 증거 파일 업로드 가이드',
    duration: '03:50',
    badge: '권한 복구 핵심',
    badgeColor: 'bg-emerald-600 text-white',
    thumbnailBg: 'from-slate-900 to-emerald-950',
    officialDocUrl: 'https://help.band.us/contact',
    officialDocLabel: 'BAND 1:1 문의창 열기',
    walkthroughSteps: [
      {
        time: '00:30',
        action: 'BAND 헬프센터 > 1:1 문의하기 접속',
        description: '카테고리 선택에서 [밴드 탈퇴/삭제/리더권한 > 리더 권한을 빼앗기거나 도용됨]을 선택합니다.'
      },
      {
        time: '01:30',
        action: '본 센터에서 자동 생성한 문의문 붙여넣기',
        description: '2단계 [1:1 문의문 생성기]에서 복사한 전문(피해 밴드명, 확인된 URL, 해커 닉네임)을 본문에 붙여넣습니다.'
      },
      {
        time: '02:40',
        action: '캡처 증거 파일 첨부 (IP 로그, 강퇴 화면)',
        description: '비인가 침입 IP 화면과 본인이 과거 리더였음을 증명하는 스크린샷을 첨부 후 제출합니다.'
      }
    ],
    quickTips: [
      '제목에 "[긴급/도용] 리더 권한 강제 탈취 피해 복구 요청"을 기재하면 우선 분류됩니다.',
      '회신은 보통 24~48시간 이내에 네이버 가입 이메일로 발송됩니다.'
    ]
  },
  {
    id: 'tut_police_ecrm',
    category: 'police_ecrm',
    title: '경찰청 사이버수사국(ECRM) 온라인 고소/진정서 작성법',
    duration: '04:15',
    badge: '형사 수사 착수',
    badgeColor: 'bg-purple-600 text-white',
    thumbnailBg: 'from-slate-900 to-purple-950',
    officialDocUrl: 'https://ecrm.police.go.kr',
    officialDocLabel: '경찰청 ECRM 온라인 접수',
    walkthroughSteps: [
      {
        time: '00:25',
        action: 'ECRM 접속 및 본인 인증 (공동인증서/간편인증)',
        description: '경찰청 사이버범죄 신고시스템에 접속하여 실명 인증을 완료합니다.'
      },
      {
        time: '01:15',
        action: '범죄 유형 선택: [정보통신망법 위반(계정 도용/침해)]',
        description: '타인의 계정 권한 침해 및 업무방해 항목으로 신고서를 작성합니다.'
      },
      {
        time: '02:50',
        action: '피해 사실 진술서 및 증거 파일 첨부',
        description: '본 센터 상단에서 다운로드한 [피해 요약 리포트(PDF)]를 증빙 자료로 업로드합니다.'
      }
    ],
    quickTips: [
      '온라인 접수 후 관할 경찰서 사이버수사팀으로부터 유선 확인 연락이 오며, 접수증이 발급됩니다.',
      '접수증 번호를 밴드 고객센터에 추가 소명 자료로 제출하면 복구 처리 속도가 매우 빨라집니다.'
    ]
  }
];

export const ActionableRecoveryTutorial: React.FC<ActionableRecoveryTutorialProps> = ({
  incident,
  onSelectTab,
  onShowToast
}) => {
  const [selectedTutId, setSelectedTutId] = useState<string>(TUTORIALS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentTut = TUTORIALS.find(t => t.id === selectedTutId) || TUTORIALS[0];

  const handleSimulatePlay = () => {
    setIsPlaying(true);
    onShowToast('가이드 튜토리얼 워크스루가 재생 중입니다.');
    setTimeout(() => {
      setIsPlaying(false);
    }, 4000);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/20 text-sky-300 rounded-xl border border-sky-400/30">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                실전 복구 튜토리얼 & 동영상 가이드 (Recovery Walkthroughs)
              </h2>
              <span className="bg-sky-500 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                화면 따라하기
              </span>
            </div>
            <p className="text-xs text-sky-200 mt-0.5">
              네이버 보안센터 조작법부터 BAND 1:1 고객센터 접수, 경찰청 ECRM 고소장 작성까지 화면 순서대로 안내합니다.
            </p>
          </div>
        </div>

        <a
          href={currentTut.officialDocUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs sm:text-sm font-black rounded-xl shadow-md transition active:scale-95 cursor-pointer"
        >
          <span>{currentTut.officialDocLabel}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="p-6">
        {/* Tutorial Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {TUTORIALS.map((tut) => {
            const isSelected = tut.id === selectedTutId;
            return (
              <button
                key={tut.id}
                type="button"
                onClick={() => setSelectedTutId(tut.id)}
                className={`p-3.5 rounded-xl border text-left transition relative cursor-pointer ${
                  isSelected
                    ? 'bg-sky-50/90 border-sky-500 ring-2 ring-sky-500/30 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tut.badgeColor}`}>
                    {tut.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {tut.duration}
                  </span>
                </div>
                <h3 className={`text-xs sm:text-sm font-bold line-clamp-2 ${
                  isSelected ? 'text-sky-950 font-black' : 'text-slate-800'
                }`}>
                  {tut.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Tutorial Video Walkthrough Container */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Interactive Video Player Mockup (Left 6 cols) */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 shadow-xl flex items-center justify-center group cursor-pointer"
                onClick={handleSimulatePlay}
              >
                {/* Visual UI Grid Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Video Info Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${currentTut.badgeColor}`}>
                    {currentTut.badge}
                  </span>
                  <span className="text-xs text-white/80 font-mono bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    {currentTut.duration}
                  </span>
                </div>

                {/* Big Center Play Button */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-500 group-hover:bg-sky-400 text-slate-950 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 active:scale-95 ${
                    isPlaying ? 'animate-pulse' : ''
                  }`}>
                    <Play className="w-7 h-7 fill-slate-950 translate-x-0.5" />
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide drop-shadow-md">
                    {isPlaying ? '가이드 영상 재생 중...' : '클릭하여 실전 화면 가이드 보기'}
                  </span>
                </div>

                {/* Bottom Video Progress Bar Mock */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-[11px] text-white/80 font-mono">
                  <span>00:00 / {currentTut.duration}</span>
                  <span className="text-sky-300 font-sans font-bold">네이버 & BAND 공식 절차 기준</span>
                </div>
              </div>

              {/* Action Buttons Below Video */}
              <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs text-slate-500">
                  * 팝업 차단이 해제되어 있으면 공식 설정창이 열립니다.
                </span>
                <a
                  href={currentTut.officialDocUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <span>공식 화면 직접 열어 실습하기</span>
                  <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                </a>
              </div>
            </div>

            {/* Step-by-Step Chapter Walkthrough (Right 6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                  {currentTut.title}
                </h3>
                <p className="text-xs text-slate-500">
                  영상을 보면서 아래 단계별 체크포인트를 순서대로 진행해 주세요.
                </p>
              </div>

              {/* Steps List */}
              <div className="space-y-2.5">
                {currentTut.walkthroughSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-sky-300 transition"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        {step.action}
                      </span>
                      <span className="text-[11px] font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded font-bold">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 pl-6.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Tips Box */}
              <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-3.5 text-xs text-slate-800">
                <span className="font-bold text-sky-950 flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  실전 진행 꿀팁 및 주의사항:
                </span>
                <ul className="space-y-1 ml-1 text-slate-700 text-xs">
                  {currentTut.quickTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="font-bold text-sky-600 shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
