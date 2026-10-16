import React, { useState } from 'react';
import { 
  Building2, 
  Send, 
  Copy, 
  ExternalLink, 
  AlertCircle, 
  Phone, 
  ShieldAlert, 
  MessageCircle, 
  CheckCircle2, 
  Circle,
  Lightbulb,
  FileCheck
} from 'lucide-react';
import { IncidentData, ChecklistState } from '../types';

interface Step3Props {
  incident: IncidentData;
  checklist: ChecklistState;
  onToggleCheck: (key: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const Step3PoliceAndAlert: React.FC<Step3Props> = ({
  incident,
  checklist,
  onToggleCheck,
  onCopyText
}) => {
  const [activeAlertTab, setActiveAlertTab] = useState<'kakao' | 'sms'>('kakao');

  const bandListStr = incident.bandNames.join(', ');
  const hackerListStr = incident.hackerNames.join(', ');

  const kakaoMessage = `🚨 [긴급 공지] 네이버 밴드 해킹 및 방장 사칭 주의 안내 🚨

안녕하세요, 밴드 회원 여러분.
[${bandListStr}]의 원래 리더(개설자)입니다.

현재 제 네이버 및 밴드 계정이 외부로부터 악의적인 해킹을 당하여, 
방장(리더) 권한을 강제로 탈취당하고 기존 관리자들이 강제 퇴장(강퇴) 조치되었습니다.

⚠️ 현재 밴드에 방장이나 공동리더로 등록된 
[ ${hackerListStr} ] 등은 제가 절대 아니며 범죄 조직(해커)입니다!

📌 당부 말씀 (필독):
1. 밴드에 올라오는 어떠한 [금전 송금 요구, 후원금, 계좌이체, 상품 결제]에도 절대 응하지 마십시오.
2. 해커가 올리는 [단축 URL, 모바일 링크, 첨부파일]을 클릭 시 휴대폰 악성코드가 설치될 수 있으니 절대 누르지 마십시오.
3. 주변 다른 회원분들께도 이 사실을 널리 공유해 주시기 바랍니다.

현재 네이버 밴드 헬프센터 및 경찰청 사이버수사국에 정식 신고 접수하여 리더 권한 복구 및 법적 조치를 진행하고 있습니다. 

심려를 끼쳐드려 대단히 죄송하며, 신속히 정상화하도록 하겠습니다.`;

  const smsMessage = `[긴급/주의] ${incident.bandNames[0] || '밴드'} 원래 리더입니다. 계정 해킹으로 방장 권한이 탈취되었습니다. 현재 방장(${hackerListStr})의 금전 요구/상품결제/링크클릭은 사기이니 절대 응하지 마시고 주변에 공유 바랍니다. 경찰/고객센터 신고 조치 중입니다.`;

  const currentAlertText = activeAlertTab === 'kakao' ? kakaoMessage : smsMessage;

  const handleCopyAlert = () => {
    onCopyText(currentAlertText, activeAlertTab === 'kakao' ? '카카오톡/SNS 긴급 공지문' : '문자메시지(SMS) 요약문');
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      {/* Step Header */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 px-6 py-4.5 flex items-center justify-between text-white">
        <div className="flex items-center gap-3.5">
          <div className="bg-amber-500 text-slate-950 w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-md border border-amber-400">
            3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                수사 의뢰 및 2차 피해 긴급 방지
              </h2>
              <span className="bg-amber-400 text-slate-950 text-[11px] font-bold px-2 py-0.5 rounded-full">
                피해 차단 핵심
              </span>
            </div>
            <p className="text-xs text-amber-200 mt-0.5">
              회원들에게 해킹 사실을 급히 전파하여 금전 피해를 막고, 경찰청 사이버범죄수사시스템에 정식 입건합니다.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleCheck('step3_police_filed')}
          className="flex items-center gap-2 text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg border border-white/20 transition cursor-pointer"
        >
          {checklist['step3_police_filed'] ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span className="font-bold text-emerald-200">신고 완료함</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 text-white/80" />
              <span>미완료 (신고 후 체크)</span>
            </>
          )}
        </button>
      </div>

      <div className="p-6 space-y-7">
        {/* Sub-section 1: Member Broadcast (Critical for fraud prevention) */}
        <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 rounded-xl border border-amber-200/90 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-500 text-white rounded-lg">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-amber-950">
                  1. 회원 대상 긴급 경고 전파문 (카카오톡 / 문자 / SNS)
                </h3>
                <p className="text-xs text-amber-800">
                  해커가 멤버들을 속여 돈을 가로채기 전에 다른 연락 수단으로 즉시 알려야 합니다.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-white rounded-lg p-0.5 border border-amber-200 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveAlertTab('kakao')}
                  className={`px-3 py-1 rounded-md font-semibold transition ${
                    activeAlertTab === 'kakao' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  카카오톡/SNS 상세형
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAlertTab('sms')}
                  className={`px-3 py-1 rounded-md font-semibold transition ${
                    activeAlertTab === 'sms' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  문자(SMS) 축약형
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyAlert}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow transition"
              >
                <Copy className="w-3.5 h-3.5" />
                문구 복사
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              readOnly
              rows={activeAlertTab === 'kakao' ? 9 : 4}
              value={currentAlertText}
              className="w-full p-3.5 rounded-xl border border-amber-300 font-mono text-xs sm:text-sm text-slate-800 bg-white shadow-inner focus:outline-none leading-relaxed"
            />
          </div>
          <div className="mt-2 text-[11px] text-amber-900 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              <strong>전파 팁:</strong> 밴드 회원들의 카카오톡 단체방, 개별 문자메시지, 인스타그램, 블로그 등에 위 문구를 복사하여 공지하세요.
            </span>
          </div>
        </div>

        {/* Sub-section 2: Police Cyber Crime (ECRM) & KISA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ECRM Card */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-base text-slate-900">
                    경찰청 사이버수사국 (ECRM) 접수
                  </h3>
                </div>
                <span className="text-[11px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                  정식 형사 사건화
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                네이버 보안 센터에서 캡처한 <strong>‘침입 IP 기록’</strong>과 <strong>‘강퇴 화면’</strong>을 증거로 첨부하여 온라인 고소/진정을 접수합니다.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 mb-4 bg-white p-3 rounded-lg border border-slate-200">
                <li>• 범죄 유형: 정보통신망 침해범죄 (계정 해킹, 권한 침탈)</li>
                <li>• 사이트 접수 후 접수증을 지참하여 인근 경찰서 사이버팀 방문 진술</li>
                <li>• 네이버 측 압수수색 영장 집행 및 범인 IP 추적 근거 마련</li>
              </ul>
            </div>

            <a
              href="https://ecrm.police.go.kr"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs sm:text-sm font-bold transition shadow-sm"
            >
              경찰청 사이버범죄 신고시스템 (ECRM) 바로가기 <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* KISA & Hotlines Card */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-base text-slate-900">
                    KISA 118 & 긴급 상담 전화
                  </h3>
                </div>
                <span className="text-[11px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  24시간 무료 지원
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                한국인터넷진흥원(KISA) 침해사고대응센터와 경찰청 대표 전화를 통해 실시간 상담을 받을 수 있습니다.
              </p>

              <div className="space-y-2 mb-4 bg-white p-3 rounded-lg border border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">KISA 불법스팸·해킹 대응센터:</span>
                  <a href="tel:118" className="font-bold text-blue-600 hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" /> 국번없이 118
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">경찰청 사이버범죄 민원상담:</span>
                  <a href="tel:182" className="font-bold text-blue-600 hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" /> 국번없이 182
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">네이버 고객센터 (대표):</span>
                  <span className="font-bold text-slate-800">1588-3820</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-amber-100/70 rounded-lg text-[11px] text-amber-900 font-medium flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>피싱 문자가 발송된 경우 118에 즉시 신고하여 악성 링크 차단을 요청하세요.</span>
            </div>
          </div>
        </div>

        {/* Future Prevention Strategy (Step 4 preview/guidance) */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4.5 flex items-start gap-3.5">
          <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            <h4 className="font-bold text-blue-950 mb-1">
              리더 권한 복원 후 반드시 취해야 할 핵심 재발 방지책
            </h4>
            <p className="text-slate-700 mb-2">
              리더 권한을 정상 반환받으신 직후에는 반드시 가족이나 가장 신뢰할 수 있는 부관리자 1~2명을 <strong>'공동 리더'</strong>로 지정해 두십시오.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs">
              <li>공동 리더가 존재하면 한 계정이 불의에 침해당해도 다른 공동 리더가 해커 계정을 즉시 강퇴시키고 방을 지킬 수 있습니다.</li>
              <li>밴드 설정에서 <strong>'멤버 초대 권한'</strong> 및 <strong>'공지글 작성 권한'</strong>을 리더/공동리더로 제한해 두세요.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
