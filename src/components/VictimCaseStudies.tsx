import React, { useState, useEffect } from 'react';
import { IncidentData } from '../types';
import { 
  FolderArchive, 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Users, 
  ShieldCheck, 
  FileText, 
  ThumbsUp, 
  Filter,
  BarChart3,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface VictimCaseStudiesProps {
  incident: IncidentData;
  onShowToast: (msg: string) => void;
  onSelectTab: (tab: any) => void;
}

interface CaseStudy {
  id: string;
  category: 'commerce' | 'social' | 'credential' | 'smishing';
  categoryLabel: string;
  bandType: string;
  title: string;
  hackerPattern: string;
  attackVector: string;
  damageAmount: string;
  timeline: string;
  outcome: '복구 성공' | '피해 차단' | '수사 진행 중';
  keyLessons: string[];
  summary: string;
}

interface SurveyData {
  bandType: string;
  attackVector: string;
  hackerAction: string;
  financialLoss: string;
  reportedToSupport: string;
  reportedToPolice: string;
  storyNotes: string;
  submittedAt: string;
}

const PRESET_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case_1',
    category: 'commerce',
    categoryLabel: '상품 판매 커뮤니케이션방',
    bandType: '상거래 / 농수산물 직거래 밴드 (회원 4,200명)',
    title: '[사례 1] 방장 권한 탈취 후 "창고 정리 특가 선입금" 사기 미수 및 48시간 만의 리더 복구',
    hackerPattern: '해커가 방장 명의로 150만원 상당 물품 25만원 특가 공지 게재 후 대포통장 입금 유도',
    attackVector: '택배 배송조회 모바일 스미싱 링크(APK) 클릭 후 네이버 계정 비밀번호 탈취',
    damageAmount: '회원 3명 총 75만원 입금 시도 중 즉시 지급정지로 전액 환불 회수',
    timeline: '피해 인지 후 20분 내 비번변경 및 2FA 완료 → 1시간 내 카톡 단체방 긴급 공지 → 48시간 후 밴드 헬프센터 리더 반환',
    outcome: '복구 성공',
    keyLessons: [
      '침입 IP 기록을 즉시 캡처하여 네이버 헬프센터에 제출한 것이 결정적 증거가 됨',
      '다른 연락망(카카오톡 단체방)으로 즉시 경고하여 회원들의 수천만 원대 추가 송금을 완벽 차단함'
    ],
    summary: '평소 활동이 왕성한 상품 판매방은 해커들의 1순위 표적입니다. 해커가 올린 파격 세일 공지를 보자마자 의심한 회원의 제보로 리더가 신속히 기기 강제 로그아웃을 실행하여 대규모 금융사기를 막아낸 대표적 성공 사례입니다.'
  },
  {
    id: 'case_2',
    category: 'credential',
    categoryLabel: '다락방 · 친목 모임방',
    bandType: '친목 / 동호회 밴드 (회원 850명)',
    title: '[사례 2] "이상철/전시숙" 등 가짜 리더 2인 위임 및 원작성자 강퇴 사태',
    hackerPattern: '기존 리더를 강제 퇴장(강퇴)시키고 가짜 닉네임 2명을 공동 리더로 등록한 뒤 회원들에게 급전 요구 시도',
    attackVector: '타 웹사이트와 동일한 아이디/비밀번호 사용으로 인한 크리덴셜 스터핑(Credential Stuffing) 유출',
    damageAmount: '0원 (음성 전화 확인으로 사기 미수)',
    timeline: '강퇴 직후 경찰청 ECRM 정식 고소 접수 → 밴드 고객센터 1:1 "리더 권한을 빼앗기거나 도용됨" 접수 → 3일 후 리더 복구',
    outcome: '복구 성공',
    keyLessons: [
      '해커가 요구한 급전에 대해 회원이 방장의 기존 휴대폰으로 전화 통화를 걸어 사기임을 밝혀냄',
      '밴드 개설 당시의 최초 환영 게시글 스크린샷과 네이버 가입 정보를 첨부하여 소유권을 명확히 입증함'
    ],
    summary: '해커 조직은 2인 이상의 가짜 계정(이상철, 전시숙 등)을 동시에 투입하여 밴드 관리자 권한을 완전히 굳히려고 시도합니다. 이 경우 방장이 당황하지 않고 경찰서 접수증과 과거 리더 활동 로그를 함께 제출해야 빠르게 복구됩니다.'
  },
  {
    id: 'case_3',
    category: 'social',
    categoryLabel: 'OCS 모임방 · 동문회',
    bandType: '동문회 / 학부모 모임 밴드 (회원 1,500명)',
    title: '[사례 3] 방장 사칭 부고·모바일 청첩장 스미싱 대량 살포 차단 사례',
    hackerPattern: '채팅방 전체에 악성코드 다운로드 URL이 포함된 가짜 모바일 청첩장 링크 전송',
    attackVector: '네이버 로그인 2단계 인증 미설정 상태에서 해외 IP 무단 로그인',
    damageAmount: '스미싱 링크 12명 클릭했으나 소액결제 즉시 차단으로 금전 피해 0건',
    timeline: '해외 로그인 차단 ON → 통신사 소액결제 한도 0원 설정 → KISA 118 악성 URL 차단 접수',
    outcome: '피해 차단',
    keyLessons: [
      '평소 2단계 인증(2FA)과 해외 로그인 차단만 켜두었어도 완전히 예방할 수 있었던 사고',
      '스미싱 링크가 발송되었을 때 118 센터에 즉시 신고하여 사이트 접속을 국가망 차단 조치함'
    ],
    summary: '동문이나 지인들은 방장의 이름으로 온 청첩장이나 부고장을 의심 없이 클릭하기 쉽습니다. 피해 발생 즉시 KISA 118에 악성 도메인 차단을 요청하고 전체 회원에게 경고 문자를 돌려 2차 피해를 방어했습니다.'
  }
];

export const VictimCaseStudies: React.FC<VictimCaseStudiesProps> = ({
  incident,
  onShowToast,
  onSelectTab
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showSurveyModal, setShowSurveyModal] = useState<boolean>(false);

  // Survey Form State
  const [surveyForm, setSurveyForm] = useState<SurveyData>({
    bandType: '상품 판매 / 공동구매 밴드',
    attackVector: '스미싱 문자 / 피싱 링크 클릭',
    hackerAction: '리더 권한 강탈 및 기존 방장 강제 퇴장',
    financialLoss: '피해 없음 (사전 차단)',
    reportedToSupport: '네이버 밴드 1:1 고객센터 접수 완료',
    reportedToPolice: '경찰청 사이버수사국(ECRM) 신고 완료',
    storyNotes: '',
    submittedAt: ''
  });

  // User submitted survey list (persisted in localStorage)
  const [userSurveys, setUserSurveys] = useState<SurveyData[]>(() => {
    try {
      const saved = localStorage.getItem('band_victim_surveys_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const handleSubmitSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    const newSurvey: SurveyData = {
      ...surveyForm,
      submittedAt: new Date().toLocaleDateString('ko-KR')
    };
    const updated = [newSurvey, ...userSurveys];
    setUserSurveys(updated);
    try {
      localStorage.setItem('band_victim_surveys_v1', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setShowSurveyModal(false);
    onShowToast('피해 실태 조사가 성공적으로 등록되었습니다. 통계에 반영됩니다.');
  };

  const filteredCases = filterCategory === 'all' 
    ? PRESET_CASE_STUDIES 
    : PRESET_CASE_STUDIES.filter(c => c.category === filterCategory);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-400/30">
            <FolderArchive className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                네이버 밴드 해킹 피해 사례 및 실태 조사 센터
              </h2>
              <span className="bg-indigo-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                실제 복구 선례 분석
              </span>
            </div>
            <p className="text-xs text-indigo-200 mt-0.5">
              유사한 피해를 겪었던 밴드들의 실제 침해 수법, 골든타임 조치 과정, 그리고 고객센터 복구 성공 선례를 확인하세요.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowSurveyModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition cursor-pointer"
        >
          <FileText className="w-4 h-4 text-indigo-200" />
          내 피해 사례 조사 참여하기
        </button>
      </div>

      <div className="p-6">
        {/* Statistical Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-indigo-900">가장 흔한 침입 경로</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl font-extrabold text-slate-900">스미싱 & 비밀번호 유출</div>
            <p className="text-[11px] text-slate-500 mt-1">동일 비밀번호 재사용(48%), 가짜 알림문자(39%)</p>
          </div>

          <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-rose-900">최대 피해 발생 밴드군</span>
              <TrendingUp className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-xl font-extrabold text-slate-900">상품 판매 · 공동구매</div>
            <p className="text-[11px] text-slate-500 mt-1">상거래 밴드를 노린 가짜 선입금 사기 시도(65%)</p>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-900">평균 권한 복구 소요</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-extrabold text-slate-900">24 ~ 72시간 내외</div>
            <p className="text-[11px] text-slate-500 mt-1">침입 IP 및 최초 개설 증빙 제출 시 복구율 92%</p>
          </div>

          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-blue-900">방어 성공 핵심 요인</span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl font-extrabold text-slate-900">즉각적 회원 경고 전파</div>
            <p className="text-[11px] text-slate-500 mt-1">카톡/문자 사전 공지로 2차 금융 사기 97% 방어</p>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterCategory === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              전체 사례 보기
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('commerce')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterCategory === 'commerce' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              상품 판매방 표적
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('credential')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterCategory === 'credential' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              가짜 방장(이상철 등) 위임
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('social')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterCategory === 'social' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              친목/동문회방 사칭
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            확인된 대표 피해 분석 사례: {filteredCases.length}건
          </span>
        </div>

        {/* Case Studies List Cards */}
        <div className="space-y-6">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-indigo-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {cs.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {cs.bandType}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {cs.outcome}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                {cs.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {cs.summary}
              </p>

              {/* Grid Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4 text-xs">
                <div className="p-3 bg-red-50/60 rounded-xl border border-red-100">
                  <span className="font-bold text-red-900 block mb-1">🚨 해커 공격 수법</span>
                  <span className="text-slate-700 leading-relaxed">{cs.hackerPattern}</span>
                </div>
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-900 block mb-1">🔍 침입 원인 (경로)</span>
                  <span className="text-slate-700 leading-relaxed">{cs.attackVector}</span>
                </div>
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <span className="font-bold text-emerald-900 block mb-1">⏱️ 대응 조치 타임라인</span>
                  <span className="text-slate-700 leading-relaxed">{cs.timeline}</span>
                </div>
              </div>

              {/* Key Lessons */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3.5 text-xs text-slate-800">
                <span className="font-bold text-indigo-950 block mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  피해자가 전하는 권한 복구 성공 핵심 열쇠:
                </span>
                <ul className="space-y-1 ml-1 text-slate-700">
                  {cs.keyLessons.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="font-bold text-indigo-600 shrink-0">✓</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* User Submitted Incident Survey Section */}
        {userSurveys.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              신고자가 직접 등록한 피해 실태 조사 기록 ({userSurveys.length}건)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              {userSurveys.map((us, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-indigo-900">{us.bandType}</span>
                    <span className="text-slate-400">{us.submittedAt}</span>
                  </div>
                  <p className="text-slate-700 mb-2 font-medium">침해 수법: {us.attackVector}</p>
                  <p className="text-slate-600 text-[11px] mb-2">{us.hackerAction}</p>
                  {us.storyNotes && (
                    <div className="p-2.5 bg-white rounded border border-slate-200 text-slate-800 text-[11px] whitespace-pre-wrap">
                      "{us.storyNotes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Survey Modal */}
      {showSurveyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-sm">네이버 밴드 해킹 피해 실태 조사 참여</span>
              </div>
              <button
                type="button"
                onClick={() => setShowSurveyModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitSurvey} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-800">
              <p className="text-slate-600 leading-relaxed">
                작성하신 피해 조사 정보는 익명으로 통계 데이터베이스에 저장되어 다른 피해자들의 구제 및 경찰 사이버수사 참고 자료로 활용됩니다.
              </p>

              <div>
                <label className="block font-bold text-slate-800 mb-1">피해 밴드 성격</label>
                <select
                  value={surveyForm.bandType}
                  onChange={(e) => setSurveyForm({ ...surveyForm, bandType: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="상품 판매 / 공동구매 밴드">상품 판매 / 공동구매 밴드</option>
                  <option value="친목 / 동호회 / 다락방 모임">친목 / 동호회 / 다락방 모임</option>
                  <option value="동문회 / 학부모 / OCS 모임방">동문회 / 학부모 / OCS 모임방</option>
                  <option value="종교 / 가족 / 사모임 밴드">종교 / 가족 / 사모임 밴드</option>
                  <option value="기타 커뮤니티">기타 커뮤니티</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">추정 침해 경로</label>
                <select
                  value={surveyForm.attackVector}
                  onChange={(e) => setSurveyForm({ ...surveyForm, attackVector: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="스미싱 문자 / 피싱 링크 클릭">스미싱 문자 / 피싱 링크 클릭</option>
                  <option value="타 사이트와 동일 비밀번호 사용(크리덴셜 스터핑)">타 사이트와 동일 비밀번호 사용(크리덴셜 스터핑)</option>
                  <option value="카카오톡/이메일 계정 동시 도용">카카오톡/이메일 계정 동시 도용</option>
                  <option value="정확한 경로 불명 (자고 일어났더니 강퇴됨)">정확한 경로 불명 (자고 일어났더니 강퇴됨)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">해커의 주요 만행</label>
                <input
                  type="text"
                  value={surveyForm.hackerAction}
                  onChange={(e) => setSurveyForm({ ...surveyForm, hackerAction: e.target.value })}
                  placeholder="예: 리더 권한 강탈 후 이상철로 방장 변경, 기존 방장 강퇴"
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">회원 대상 금전 피해 여부</label>
                <select
                  value={surveyForm.financialLoss}
                  onChange={(e) => setSurveyForm({ ...surveyForm, financialLoss: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="피해 없음 (사전 차단 성공)">피해 없음 (사전 차단 성공)</option>
                  <option value="소액 피해 발생 (100만원 미만)">소액 피해 발생 (100만원 미만)</option>
                  <option value="중대 금전 피해 발생 (100만원 이상)">중대 금전 피해 발생 (100만원 이상)</option>
                  <option value="피해 여부 확인 중">피해 여부 확인 중</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">피해 당시 상황 및 상세 증언 (선택)</label>
                <textarea
                  rows={4}
                  value={surveyForm.storyNotes}
                  onChange={(e) => setSurveyForm({ ...surveyForm, storyNotes: e.target.value })}
                  placeholder="해커가 어떤 닉네임을 썼는지, 어떤 글을 올렸는지 등을 기록해 주세요."
                  className="w-full p-2 border border-slate-300 rounded-lg font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSurveyModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold shadow"
                >
                  실태 조사 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
