import React, { useState, useEffect } from 'react';
import { IncidentData, ChecklistState } from '../types';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Copy, 
  Calendar, 
  ExternalLink,
  Milestone,
  ArrowDown,
  Layers,
  Sparkles,
  Flame,
  Check,
  FileDown,
  Printer
} from 'lucide-react';

interface TimelineCustomEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  status: 'critical' | 'completed' | 'in_progress' | 'info';
}

interface IncidentTimelineProps {
  incident: IncidentData;
  checklist: ChecklistState;
  onSelectTab: (tab: any) => void;
  onCopyText: (text: string, label: string) => void;
  onShowToast: (msg: string) => void;
  onOpenPrint?: () => void;
}

export const IncidentTimeline: React.FC<IncidentTimelineProps> = ({
  incident,
  checklist,
  onSelectTab,
  onCopyText,
  onShowToast,
  onOpenPrint
}) => {
  // Custom user events state
  const [customEvents, setCustomEvents] = useState<TimelineCustomEvent[]>(() => {
    try {
      const saved = localStorage.getItem('band_incident_timeline_events_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'evt_1',
        time: '피해 당일 14:15경',
        title: '회원으로부터 이상철/전시숙 방장 사칭 제보 수신',
        description: '다락방 및 상품 판매 커뮤니케이션방 회원으로부터 "방장님이 바뀌었는데 맞냐"는 카카오톡 연락을 받음',
        status: 'critical'
      },
      {
        id: 'evt_2',
        time: '피해 당일 14:40경',
        title: '네이버 보안센터 비인가 로그인 이력 조회',
        description: '평소 사용하지 않는 타지역/해외 IP로 로그인된 이력을 확인하고 스크린샷 캡처 완료',
        status: 'completed'
      }
    ];
  });

  const [newTime, setNewTime] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // Persist custom events
  useEffect(() => {
    try {
      localStorage.setItem('band_incident_timeline_events_v1', JSON.stringify(customEvents));
    } catch (e) {
      console.error(e);
    }
  }, [customEvents]);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEvt: TimelineCustomEvent = {
      id: 'evt_' + Date.now(),
      time: newTime.trim() || new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      title: newTitle.trim(),
      description: newDesc.trim() || '특이사항 기록',
      status: 'info'
    };

    setCustomEvents([newEvt, ...customEvents]);
    setNewTime('');
    setNewTitle('');
    setNewDesc('');
    setIsAddingEvent(false);
    onShowToast('사건 타임라인에 새 기록이 추가되었습니다.');
  };

  const handleDeleteEvent = (id: string) => {
    setCustomEvents(customEvents.filter(ev => ev.id !== id));
    onShowToast('타임라인 기록이 삭제되었습니다.');
  };

  // Structured Core Milestones
  const milestones = [
    {
      id: 'm_incident',
      stageBadge: '발생 시점',
      badgeColor: 'bg-red-500 text-white',
      title: '🚨 침해 사고 발생 및 리더 권한 무단 탈취',
      timeLabel: incident.incidentDateTime || '사고 발생 일시',
      description: `[${incident.bandNames.join(', ')}]의 리더 권한이 해커(${incident.hackerNames.join(', ')})에게 무단 위임되고 기존 방장이 강제 퇴장(강퇴)당함.`,
      isDone: true,
      actionTab: null,
      actionLabel: null
    },
    {
      id: 'm_step1',
      stageBadge: '골든타임 1시간',
      badgeColor: 'bg-blue-600 text-white',
      title: '🛡️ 1단계 긴급 초동 조치 (계정 통제권 탈환)',
      timeLabel: '사고 인지 직후 즉시',
      description: '전 기기 원격 로그아웃, 비밀번호 변경, 2단계 인증(2FA), 해외/타지역 로그인 차단, 침입 IP 기록 캡처',
      isDone: checklist['step1_logout'] && checklist['step1_password_2fa'] && checklist['step1_geo_block'] && checklist['step1_ip_capture'],
      actionTab: 'step1',
      actionLabel: '1단계 조치 점검'
    },
    {
      id: 'm_step2',
      stageBadge: '사고 후 2~4시간',
      badgeColor: 'bg-emerald-600 text-white',
      title: '📝 2단계 BAND 헬프센터 1:1 복구 접수',
      timeLabel: '초동 조치 완료 후',
      description: '자동 생성된 1:1 문의문과 IP 이력 증거를 첨부하여 밴드 헬프센터에 방장 권한 원상 복구 및 해커 영구 제재 접수',
      isDone: !!checklist['step2_support_submitted'],
      actionTab: 'step2',
      actionLabel: '1:1 문의문 생성기로 이동'
    },
    {
      id: 'm_step3',
      stageBadge: '사고 후 4~6시간',
      badgeColor: 'bg-amber-600 text-white',
      title: '📢 3단계 회원 긴급 전파 & 경찰청(ECRM) 수사 의뢰',
      timeLabel: '고객센터 접수 후 즉시',
      description: '카톡/문자로 회원들에게 사기 입금 및 링크 클릭 금지 공지 발송, 경찰청 사이버범죄시스템 정식 고소 접수',
      isDone: !!checklist['step3_police_filed'],
      actionTab: 'step3',
      actionLabel: '경찰 신고 & 공지문 확인'
    },
    {
      id: 'm_waiting',
      stageBadge: '사고 후 24~48시간',
      badgeColor: 'bg-indigo-600 text-white',
      title: '⏳ 4단계 밴드 보안팀 조사 및 리더 권한 복원 대기',
      timeLabel: '평일 기준 1~2일 소요',
      description: '네이버 밴드 고객센터에서 과거 개설 이력 및 비정상 IP 로그를 대조 심사하여 방장 권한 반환 조치 진행',
      isDone: false,
      actionTab: null,
      actionLabel: null
    },
    {
      id: 'm_post_recovery',
      stageBadge: '권한 복원 후',
      badgeColor: 'bg-purple-600 text-white',
      title: '🔒 5단계 사후 방어 체계 구축 (공동 리더 지정)',
      timeLabel: '복구 완료 직후',
      description: '신뢰할 수 있는 관리자 1~2인을 공동 리더로 임명하여 추후 1개 계정 탈취 시에도 밴드 장악 원천 차단',
      isDone: false,
      actionTab: 'step3',
      actionLabel: '재발 방지 가이드 보기'
    }
  ];

  // Copy structured timeline for police or records
  const handleCopyTimelineText = () => {
    const text = `[네이버 밴드 해킹 사고 대응 경과 타임라인]
사건명: 밴드 방장 권한 탈취 및 해킹 피해
피해 밴드: ${incident.bandNames.join(', ')}
권한 탈취자(해커): ${incident.hackerNames.join(', ')}

1. 침해 사고 발생: ${incident.incidentDateTime}
 - 피해 밴드 강제 탈퇴 및 해커로 리더 변경 확인
2. 1단계 초동 조치:
 - 전 기기 강제 로그아웃: ${checklist['step1_logout'] ? '완료' : '진행 중'}
 - 비번 변경 및 2FA 설정: ${checklist['step1_password_2fa'] ? '완료' : '진행 중'}
 - 해외/타지역 로그인 차단: ${checklist['step1_geo_block'] ? '완료' : '진행 중'}
 - 비인가 침입 IP 캡처: ${checklist['step1_ip_capture'] ? '완료' : '진행 중'}
3. 2단계 고객센터 1:1 접수: ${checklist['step2_support_submitted'] ? '접수 완료' : '진행 중'}
4. 3단계 회원 전파 및 경찰청(ECRM) 신고: ${checklist['step3_police_filed'] ? '완료' : '진행 중'}

[사용자 개별 기록 일지]
${customEvents.map(e => `- [${e.time}] ${e.title}: ${e.description}`).join('\n')}

작성일자: ${new Date().toLocaleDateString('ko-KR')}`;

    onCopyText(text, '사고 대응 타임라인 전문');
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-400/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                사고 대응 타임라인 (Incident Response Timeline)
              </h2>
              <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                순차적 시각화
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              해킹 사고 인지 시점부터 현재까지의 조치 사항을 순서대로 추적하고, 경찰 및 고객센터 소명용 일지를 작성합니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onOpenPrint && (
            <button
              type="button"
              onClick={onOpenPrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow transition cursor-pointer"
              title="사건 타임라인과 조치 현황이 정리된 공식 리포트 PDF 출력"
            >
              <FileDown className="w-4 h-4 text-white" />
              <span>타임라인 리포트 PDF 내보내기</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleCopyTimelineText}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            <Copy className="w-4 h-4 text-blue-400" />
            타임라인 텍스트 복사
          </button>
          <button
            type="button"
            onClick={() => setIsAddingEvent(!isAddingEvent)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            직접 기록 추가
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Custom Event Creator Form */}
        {isAddingEvent && (
          <form onSubmit={handleAddEvent} className="bg-blue-50/70 border border-blue-200 rounded-xl p-4.5 mb-8 animate-fadeIn">
            <h3 className="font-bold text-sm text-blue-950 mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              새로운 사건 경과 기록 추가 (경찰 진술 및 소명용)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
              <div className="md:col-span-3">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">발생 시각</label>
                <input
                  type="text"
                  placeholder="예: 10/16 14:30"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-9">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">사건 요약 제목</label>
                <input
                  type="text"
                  placeholder="예: 회원 김OO님으로부터 해커의 급전 요구 카톡 제보 수신"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-12">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">상세 내용 (선택)</label>
                <textarea
                  rows={2}
                  placeholder="해커의 발언 내용, 캡처 파일 유무 등 상세 내용을 적으세요."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingEvent(false)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                타임라인에 저장
              </button>
            </div>
          </form>
        )}

        {/* Visual Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-8 my-4">
          {milestones.map((m, idx) => (
            <div key={m.id} className="relative group">
              {/* Timeline Node Dot */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-md ${
                m.isDone ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'
              }`}>
                {m.isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
              </div>

              {/* Milestone Card */}
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                m.isDone 
                  ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300' 
                  : 'bg-slate-50 border-slate-200 hover:border-blue-300'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${m.badgeColor}`}>
                      {m.stageBadge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {m.timeLabel}
                    </span>
                  </div>

                  {m.actionTab && (
                    <button
                      type="button"
                      onClick={() => onSelectTab(m.actionTab)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto"
                    >
                      <span>{m.actionLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1">
                  {m.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}

          {/* User Custom Events in Timeline */}
          {customEvents.length > 0 && (
            <div className="pt-4">
              <div className="text-xs font-bold text-slate-500 mb-4 flex items-center gap-2">
                <Milestone className="w-4 h-4 text-blue-600" />
                사용자 개별 타임라인 사건 일지 ({customEvents.length}건)
              </div>

              <div className="space-y-4">
                {customEvents.map((evt) => (
                  <div key={evt.id} className="relative group">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 border-white bg-blue-500 text-white flex items-center justify-center shadow-xs">
                      <Clock className="w-3 h-3" />
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-blue-300 transition">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-blue-800 font-mono bg-blue-50 px-2 py-0.5 rounded">
                          {evt.time}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition"
                          title="기록 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                        {evt.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
