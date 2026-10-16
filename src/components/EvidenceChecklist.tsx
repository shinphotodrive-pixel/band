import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  CheckSquare, 
  Square, 
  Info, 
  Save, 
  FileText, 
  Clock, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { ChecklistState } from '../types';

interface EvidenceChecklistProps {
  checklist: ChecklistState;
  onToggleCheck: (key: string) => void;
  onShowToast: (msg: string) => void;
}

const EVIDENCE_ITEMS = [
  {
    id: 'ev_naver_ip',
    title: '네이버 비인가 로그인 이력 (IP & 타임스탬프) 캡처',
    desc: '네이버 보안설정 > 로그인 관리 > 로그인 이력 화면 전체 (IP, 일시, 기기명)',
    critical: true
  },
  {
    id: 'ev_ejected_screen',
    title: '밴드 강제 퇴장(강퇴) 안내 화면 캡처',
    desc: '밴드 접속 시 표시되는 "리더에 의해 내보내기 되었습니다" 등의 팝업 캡처',
    critical: true
  },
  {
    id: 'ev_hacker_profile',
    title: '현재 가짜 리더(이상철, 전시숙) 프로필 화면 캡처',
    desc: '멤버 목록이나 공지사항에 기재된 해커들의 닉네임, 프로필 사진, 상태메시지',
    critical: true
  },
  {
    id: 'ev_fake_notices',
    title: '해커가 게시한 허위 공지글 / 금전 요구글 / 스팸 링크 캡처',
    desc: '남아있는 다른 회원이나 부관리자에게 부탁하여 캡처 확보',
    critical: false
  },
  {
    id: 'ev_past_ownership',
    title: '본인이 과거 원소유자(리더)였음을 증명하는 자료',
    desc: '밴드 개설 당시 환영글, 과거 본인이 작성한 리더 공지사항, 정산 내역 등',
    critical: false
  },
  {
    id: 'ev_member_reports',
    title: '회원들의 제보 메시지 및 카카오톡 대화 캡처',
    desc: '회원들이 "방장님 해킹당하셨나요?"라고 보낸 문의 및 피해 정황 메시지',
    critical: false
  }
];

export const EvidenceChecklist: React.FC<EvidenceChecklistProps> = ({
  checklist,
  onToggleCheck,
  onShowToast
}) => {
  const [evidenceNotes, setEvidenceNotes] = useState(() => {
    return localStorage.getItem('band_hacking_evidence_notes') || '';
  });

  const handleSaveNotes = () => {
    localStorage.setItem('band_hacking_evidence_notes', evidenceNotes);
    onShowToast('사건 타임라인 메모가 저장되었습니다.');
  };

  const completedCount = EVIDENCE_ITEMS.filter(item => checklist[item.id]).length;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-900 px-6 py-4.5 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-400/30">
            <Camera className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                증거 자료 수집 가이드 및 사건 일지
              </h2>
              <span className="bg-indigo-900 text-indigo-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-indigo-700">
                수사 및 복구 심사용
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              밴드 고객센터 복구 심사와 경찰 사이버수사국 수사 착수에 필수적인 디지털 증거 목록입니다.
            </p>
          </div>
        </div>

        <div className="text-right text-xs">
          <span className="text-slate-400">증거 확보: </span>
          <span className="font-bold text-indigo-400">{completedCount} / {EVIDENCE_ITEMS.length}건</span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Checklist Items */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2">
              <CheckSquare className="w-4 h-4 text-indigo-600" />
              필수 증거 수집 체크리스트
            </h3>

            {EVIDENCE_ITEMS.map((item) => {
              const isChecked = !!checklist[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => onToggleCheck(item.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-slate-50/80'
                  }`}
                >
                  <button type="button" className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  <div className="flex-1 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${isChecked ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'}`}>
                        {item.title}
                      </span>
                      {item.critical && (
                        <span className="text-[10px] font-bold bg-red-100 text-red-700 px-1.5 py-0.2 rounded">
                          필수
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline & Notes memo */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 border border-slate-200 rounded-xl p-4.5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" /> 사건 발생 경위 및 타임라인 메모
                </span>
                <span className="text-[11px] text-slate-400">자동 저장</span>
              </div>
              <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                경찰서 진술이나 고객센터 2차 소명 시 기억이 흐려지지 않도록 사건 발생 순서를 간략히 적어두세요.
              </p>

              <textarea
                value={evidenceNotes}
                onChange={(e) => setEvidenceNotes(e.target.value)}
                rows={8}
                placeholder="예:
- 10/15 14:00 네이버 알림: 타지역 로그인 감지
- 10/15 14:15 밴드 '상품 판매 커뮤니케이션방'에서 강제 퇴장당함
- 10/15 14:30 다른 회원으로부터 이상철이 방장으로 바뀌었다는 카톡 수신
- 10/15 15:00 비밀번호 변경 및 2단계 인증 완료"
                className="w-full p-3 rounded-lg border border-slate-300 text-xs font-mono text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleSaveNotes}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold shadow-xs transition"
              >
                <Save className="w-3.5 h-3.5" />
                메모 저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
