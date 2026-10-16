import React from 'react';
import { ChecklistState } from '../types';
import { 
  Flame, 
  Timer, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface UrgencyMeterProps {
  checklist: ChecklistState;
  onToggleCheck: (key: string) => void;
  onSelectTab: (tab: any) => void;
}

interface TimeSensitiveTask {
  id: string;
  name: string;
  timeframe: string; // e.g. '1시간 이내 (골든타임)', '4시간 이내', '24시간 이내'
  periodCategory: 'golden' | 'urgent' | 'followup';
  urgencyLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  weight: number;
  tabTarget: string;
}

const TIME_SENSITIVE_TASKS: TimeSensitiveTask[] = [
  {
    id: 'step1_logout',
    name: '전 기기 원격 강제 로그아웃',
    timeframe: '골든타임 1시간 이내',
    periodCategory: 'golden',
    urgencyLevel: 'CRITICAL',
    weight: 20,
    tabTarget: 'step1'
  },
  {
    id: 'step1_password_2fa',
    name: '비밀번호 변경 & 2단계 인증(2FA) 활성화',
    timeframe: '골든타임 1시간 이내',
    periodCategory: 'golden',
    urgencyLevel: 'CRITICAL',
    weight: 25,
    tabTarget: 'step1'
  },
  {
    id: 'step1_geo_block',
    name: '해외 및 타지역 로그인 차단',
    timeframe: '골든타임 1시간 이내',
    periodCategory: 'golden',
    urgencyLevel: 'CRITICAL',
    weight: 15,
    tabTarget: 'step1'
  },
  {
    id: 'step1_ip_capture',
    name: '해커 침입 IP 접속 기록 캡처',
    timeframe: '골든타임 1시간 이내',
    periodCategory: 'golden',
    urgencyLevel: 'HIGH',
    weight: 15,
    tabTarget: 'step1'
  },
  {
    id: 'step2_support_submitted',
    name: 'BAND 헬프센터 1:1 리더 권한 복구 접수',
    timeframe: '사고 후 2~4시간 이내',
    periodCategory: 'urgent',
    urgencyLevel: 'HIGH',
    weight: 15,
    tabTarget: 'step2'
  },
  {
    id: 'step3_police_filed',
    name: '회원 대상 사기 주의 공지 & 경찰청(ECRM) 신고',
    timeframe: '사고 후 6시간 이내',
    periodCategory: 'followup',
    urgencyLevel: 'HIGH',
    weight: 10,
    tabTarget: 'step3'
  }
];

export const UrgencyMeter: React.FC<UrgencyMeterProps> = ({
  checklist,
  onToggleCheck,
  onSelectTab
}) => {
  // Calculate completed weight and tasks
  const completedTasks = TIME_SENSITIVE_TASKS.filter(t => checklist[t.id]);
  const remainingTasks = TIME_SENSITIVE_TASKS.filter(t => !checklist[t.id]);

  const totalScore = TIME_SENSITIVE_TASKS.reduce((acc, t) => acc + (checklist[t.id] ? t.weight : 0), 0);
  const goldenTasks = TIME_SENSITIVE_TASKS.filter(t => t.periodCategory === 'golden');
  const goldenCompletedCount = goldenTasks.filter(t => checklist[t.id]).length;

  // Determine Urgency Status Level
  let statusText = '🚨 위험 (골든타임 초동 조치 시급)';
  let statusBadgeColor = 'bg-red-600 text-white animate-pulse';
  let meterGradient = 'from-red-600 via-rose-500 to-amber-500';
  let motivationalMessage = '해커가 밴드 회원들에게 사기 메시지를 보내기 전, 골든타임 1시간 이내 조치 4건을 서둘러 완료하세요!';

  if (totalScore >= 100) {
    statusText = '🛡️ 최고 안전 (모든 긴급 조치 완료)';
    statusBadgeColor = 'bg-emerald-600 text-white';
    meterGradient = 'from-emerald-500 to-teal-500';
    motivationalMessage = '모든 시간 민감 필수 조치를 완벽하게 완수하셨습니다! 이제 고객센터 회신(24~48시간)을 대기하며 안심하세요.';
  } else if (totalScore >= 75) {
    statusText = '⚡ 양호 (2차 피해 차단 완료, 대기 단계)';
    statusBadgeColor = 'bg-blue-600 text-white';
    meterGradient = 'from-blue-600 to-emerald-500';
    motivationalMessage = '핵심 침입 차단 및 신고가 성공적으로 완료되었습니다! 마지막 남은 과제들을 마무리하여 안전을 확고히 하세요.';
  } else if (totalScore >= 45) {
    statusText = '⚠️ 주의 (초동 방어 진행 중)';
    statusBadgeColor = 'bg-amber-500 text-slate-950 font-black';
    meterGradient = 'from-amber-500 via-orange-500 to-yellow-400';
    motivationalMessage = '골든타임 방어벽이 형성되고 있습니다! 2단계 인증과 고객센터 신고를 마무리하여 리더 권한을 완전히 탈환하세요!';
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 transition-all hover:shadow-md">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                긴급도 지수 & 골든타임 대응 현황 (Urgency Meter)
              </h2>
              <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${statusBadgeColor}`}>
                {statusText}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              사고 발생 골든타임(1시간) 및 단계별 표준 복구 소요 시간에 맞춘 시간 민감 과제 달성률
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">골든타임 조치 달성</span>
            <span className="text-xs sm:text-sm font-extrabold text-amber-400">
              {goldenCompletedCount} / {goldenTasks.length}건 완료
            </span>
          </div>
          <div className="text-right pl-3 border-l border-slate-700">
            <span className="text-[11px] text-slate-400 block">종합 안전 지수</span>
            <span className="text-base sm:text-lg font-black text-emerald-400">
              {totalScore}점 <span className="text-xs font-normal text-slate-300">/ 100점</span>
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Dynamic Urgency Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-slate-700 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-rose-600" />
              대응 진척도: <span className="text-slate-900 font-extrabold">{totalScore}%</span>
            </span>
            <span className="text-slate-500 font-normal">
              완료 {completedTasks.length}개 / 잔여 {remainingTasks.length}개
            </span>
          </div>

          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${meterGradient}`}
              style={{ width: `${Math.max(totalScore, 6)}%` }}
            />
          </div>
        </div>

        {/* Motivational Banner */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 mb-5 flex items-start gap-2.5 text-xs text-slate-700">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-slate-900">대응 동기부여 코치: </span>
            {motivationalMessage}
          </div>
        </div>

        {/* Time-Sensitive Remaining Tasks Grid */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              시간 민감(Time-Sensitive) 필수 조치 체크리스트
            </h3>
            <span className="text-[11px] text-slate-400">
              * 조치 완료 시 즉시 체크하세요
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TIME_SENSITIVE_TASKS.map((task) => {
              const isChecked = !!checklist[task.id];
              return (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    isChecked
                      ? 'bg-emerald-50/50 border-emerald-300'
                      : 'bg-white border-slate-200 hover:border-blue-400 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isChecked 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : task.periodCategory === 'golden'
                            ? 'bg-red-100 text-red-800 font-extrabold'
                            : 'bg-amber-100 text-amber-800'
                      }`}>
                        {task.timeframe}
                      </span>

                      <button
                        type="button"
                        onClick={() => onToggleCheck(task.id)}
                        className="cursor-pointer"
                        title={isChecked ? '완료 취소' : '완료 체크'}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-emerald-500 transition" />
                        )}
                      </button>
                    </div>

                    <h4 className={`text-xs font-bold leading-snug mb-1 ${
                      isChecked ? 'text-emerald-950 line-through opacity-75' : 'text-slate-900'
                    }`}>
                      {task.name}
                    </h4>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">
                      보안 기여도 +{task.weight}점
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectTab(task.tabTarget)}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                    >
                      <span>가이드 보기</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
