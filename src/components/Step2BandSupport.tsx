import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  MessageSquare, 
  ShieldAlert, 
  CheckCircle2, 
  Circle,
  HelpCircle,
  Paperclip
} from 'lucide-react';
import { IncidentData, ChecklistState } from '../types';

interface Step2Props {
  incident: IncidentData;
  checklist: ChecklistState;
  onToggleCheck: (key: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const Step2BandSupport: React.FC<Step2Props> = ({
  incident,
  checklist,
  onToggleCheck,
  onCopyText
}) => {
  const [templateType, setTemplateType] = useState<'standard' | 'emergency'>('standard');
  const [customText, setCustomText] = useState<string | null>(null);

  const bandListFormatted = incident.bandNames.join(', ');
  const hackerListFormatted = incident.hackerNames.join(', ');
  const urlListFormatted = incident.bandUrls.map(u => ` - ${u}`).join('\n');

  // Generate template text based on type
  const generatedStandard = `안녕하세요. 네이버 밴드 해킹 및 방장(리더) 권한 탈취 피해 신고합니다.

제가 운영 중이던 여러 밴드의 계정이 해킹당하여 강제로 리더 권한을 빼앗기고 강제 퇴장(강퇴) 당했습니다. 해커들이 제 밴드를 악용하여 회원들을 상대로 피싱이나 금전 요구 등 2차 피해를 유발할 위험이 매우 커 긴급 조치를 요청드립니다.

[피해 내역 상세]
1. 피해 밴드명 : ${bandListFormatted}
2. 현재 해커(가짜 리더)로 등록된 닉네임 : ${hackerListFormatted}
3. 확인된 밴드 URL : 
${urlListFormatted || ' - 강제 퇴장으로 URL 확인이 불가능한 상태입니다'}
 (나머지 방은 강제 퇴장으로 URL 확인이 어렵습니다)
4. 피해 인지 일시 : ${incident.incidentDateTime}
5. 신고자(원래 리더) 계정 정보 : ${incident.reporterName}

[초동 조치 완료 사항]
현재 제 네이버/밴드 계정의 비밀번호를 즉시 변경하고 2단계 인증(2FA) 및 타 기기 강제 로그아웃을 완료하여 추가 침입은 차단해 둔 상태입니다.

[고객센터 요청 사항]
1. 비정상적인 IP 접속 기록과 최근 발생한 '리더 위임 및 기존 리더 강퇴' 로그를 정밀 확인해 주십시오.
2. 해커 계정(${hackerListFormatted})의 리더 권한을 즉시 박탈하고, 해당 계정에 대한 영구 이용정지 등 제재를 취해 주십시오.
3. 원래 합법적 개설자이자 리더인 본인 계정으로 해당 밴드들의 리더(방장) 권한을 신속히 원상 복구 및 반환해 주시기를 간곡히 부탁드립니다.

감사합니다.`;

  const generatedEmergency = `[긴급] 해킹으로 인한 밴드 리더 탈취 및 회원 대상 2차 사기 피해 방지 요청

네이버 밴드 헬프센터 담당자님께 긴급 지원 요청드립니다.

제가 관리자로 운영해온 밴드가 제3자에 의해 무단 침탈(해킹)되어 리더 권한이 강제 양도되고 저는 강퇴당했습니다.

현재 해커가 리더 권한을 쥐고 멤버들을 대상으로 허위 판매, 금전 송금 요구, 악성 피싱 링크 배포를 시도할 수 있어 매우 위급한 상황입니다.

■ 대상 밴드 : ${bandListFormatted}
■ 권한 탈취자(해커 추정 닉네임) : ${hackerListFormatted}
■ 확인된 주소 :
${urlListFormatted || ' - 확인 중'}
■ 피해 발생 : ${incident.incidentDateTime}

■ 긴급 요청:
- 조사 진행 기간 동안 해당 밴드 내 해커(${hackerListFormatted})의 글쓰기 및 회원 관리 권한을 즉시 일시 동결해 주십시오.
- 원 계정자 본인 확인 후 원래 리더 권한을 신속히 복원해 주십시오.

본인 계정은 이미 비번 변경 및 2단계 인증을 마쳤습니다. 빠른 확인 부탁드립니다.`;

  const currentContent = customText !== null ? customText : (templateType === 'standard' ? generatedStandard : generatedEmergency);

  const handleCopy = () => {
    onCopyText(currentContent, '1:1 문의 내용');
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border-2 border-blue-300 overflow-hidden mb-8 transition-all hover:shadow-md">
      {/* Step Header */}
      <div className="border-b border-blue-200 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 px-6 py-4.5 flex items-center justify-between text-white">
        <div className="flex items-center gap-3.5">
          <div className="bg-white text-blue-700 w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-md">
            2
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                고객센터 신고 및 리더 권한 복구 신청
              </h2>
              <span className="bg-emerald-400 text-blue-950 text-[11px] font-bold px-2 py-0.5 rounded-full">
                원클릭 생성
              </span>
            </div>
            <p className="text-xs text-blue-100 mt-0.5">
              밴드 헬프센터에 공식 1:1 피해 구제 신청을 접수하여 탈취된 리더 자격을 반환받습니다.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleCheck('step2_support_submitted')}
          className="flex items-center gap-2 text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg border border-white/20 transition cursor-pointer"
        >
          {checklist['step2_support_submitted'] ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span className="font-bold text-emerald-200">접수 완료함</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 text-white/80" />
              <span>미완료 (접수 후 체크)</span>
            </>
          )}
        </button>
      </div>

      <div className="p-6">
        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
          네이버 밴드 고객센터는 해킹 의심 정황(IP 비정상 변경, 갑작스러운 위임 및 원리더 강퇴)이 확인되면 내부 조사 후 <strong>원래 리더 권한을 원상 복원</strong>해 줍니다. 아래 자동 생성된 전문을 복사하여 접수하세요.
        </p>

        {/* Template Selectors */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">신고문 템플릿:</span>
            <button
              type="button"
              onClick={() => { setTemplateType('standard'); setCustomText(null); }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                templateType === 'standard' && customText === null
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              기본 복구 요청형 (권장)
            </button>
            <button
              type="button"
              onClick={() => { setTemplateType('emergency'); setCustomText(null); }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                templateType === 'emergency' && customText === null
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              긴급 계정 동결형 (사기 방지)
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
          >
            <Copy className="w-4 h-4" />
            전체 복사하기
          </button>
        </div>

        {/* Textarea Area */}
        <div className="relative mb-5">
          <textarea
            value={currentContent}
            onChange={(e) => setCustomText(e.target.value)}
            rows={11}
            className="w-full p-4 rounded-xl border border-slate-300 font-mono text-xs sm:text-sm text-slate-800 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition leading-relaxed shadow-inner"
            placeholder="문의 내용을 확인하고 필요 시 직접 수정할 수도 있습니다."
          />
          <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
            <span>* 직접 수정 시 수정한 내용이 유지됩니다.</span>
            <span>글자 수: {currentContent.length}자</span>
          </div>
        </div>

        {/* Help & Direct Button Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" /> 접수 카테고리 선택 요령
            </div>
            헬프센터 문의 유형에서 <strong>'리더 권한 문제'</strong> 또는 <strong>'리더 권한을 빼앗기거나 도용됨'</strong> 항목을 선택해야 긴급 복구팀에 최우선 배정됩니다.
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-emerald-600" /> 필수 첨부 파일
            </div>
            1) 강제 탈퇴(퇴장) 알림 화면 캡처<br />
            2) 해커 프로필 화면 (이상철, 전시숙)<br />
            3) 네이버 비인가 로그인 IP 내역 캡처
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> 복구 소요 기간
            </div>
            통상 평일 기준 24~48시간 이내에 담당자가 과거 이력을 대조하여 회신을 줍니다. 회신이 올 때까지 회원 공지를 최우선으로 진행하세요.
          </div>
        </div>

        {/* Direct Action Link */}
        <div className="text-center pt-2">
          <a
            href="https://help.band.us/contact"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold rounded-xl shadow-lg hover:shadow-xl transition text-base sm:text-lg group"
          >
            <MessageSquare className="w-5 h-5 group-hover:rotate-6 transition" />
            <span>BAND 헬프센터 1:1 문의 접수하러 가기</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
          <p className="text-xs text-slate-500 mt-2.5">
            위 버튼을 누르면 BAND 공식 1:1 온라인 접수 창이 열립니다. 위에서 복사한 내용을 붙여넣으세요.
          </p>
        </div>
      </div>
    </section>
  );
};
