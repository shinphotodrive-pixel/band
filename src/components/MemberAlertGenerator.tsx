import React, { useState } from 'react';
import { IncidentData } from '../types';
import { 
  MessageCircle, 
  Copy, 
  Check, 
  Send, 
  Smartphone, 
  Share2, 
  AlertTriangle, 
  CheckSquare, 
  Square, 
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Flame,
  MessageSquareText
} from 'lucide-react';

interface MemberAlertGeneratorProps {
  incident: IncidentData;
  onCopyText: (text: string, label: string) => void;
}

type PlatformType = 'kakaotalk' | 'sms_lms' | 'sns_feed' | 'telegram_line';

export const MemberAlertGenerator: React.FC<MemberAlertGeneratorProps> = ({
  incident,
  onCopyText
}) => {
  const [platform, setPlatform] = useState<PlatformType>('kakaotalk');
  const [includeProductWarning, setIncludeProductWarning] = useState<boolean>(true);
  const [includeBankWarning, setIncludeBankWarning] = useState<boolean>(true);
  const [includePhishingWarning, setIncludePhishingWarning] = useState<boolean>(true);
  const [includePoliceStatus, setIncludePoliceStatus] = useState<boolean>(true);
  const [emergencyContact, setEmergencyContact] = useState<string>('');

  const bandNamesFormatted = incident.bandNames.join(', ');
  const hackerNamesFormatted = incident.hackerNames.join(', ');
  const primaryBand = incident.bandNames[0] || '네이버 밴드';
  const targetCommUrl = incident.bandUrls.find(u => u.includes('a1acb2q8NaX2u')) || incident.bandUrls[0] || '';
  const cleanUrl = targetCommUrl ? targetCommUrl.split(' ')[0] : '';

  // Generate platform-specific message
  const generateMessage = (): string => {
    if (platform === 'kakaotalk') {
      return `🚨 [긴급 비상 공지] 네이버 밴드 해킹 및 방장 사칭 금융사기 주의 🚨

안녕하세요, 밴드 회원 여러분.
[ ${bandNamesFormatted} ]의 원래 개설자이자 리더(방장)인 ${incident.reporterName || '본인'}입니다.

현재 제 네이버/밴드 계정이 외부로부터 악의적인 해킹을 당하여, 
밴드 방장(리더) 권한을 강제로 탈취당하고 원래 관리자 계정들이 강제 퇴장(강퇴) 조치되었습니다.

⚠️ [핵심 경고: 가짜 방장 사칭]
현재 밴드 방장 및 공동리더로 등록된 
▶ 가짜 닉네임: [ ${hackerNamesFormatted} ]
은 제가 절대 아니며, 계정을 불법 탈취한 해커 범죄자입니다!

${includeBankWarning ? `⛔ 1. 금전 요구·계좌 입금 절대 금지
- 방장이 바뀌어 올리는 어떤 입금 요청, 급전 대여, 후원금, 회비 요구에도 절대 송금하지 마십시오.` : ''}

${includeProductWarning ? `⛔ 2. 상품 판매 결제 사기 절대 주의
- [상품 판매 커뮤니케이션방] 등에서 특별할인, 공동구매, 물품 대금 선입금을 유도하는 게시글은 100% 사기입니다.` : ''}

${includePhishingWarning ? `⛔ 3. 단축 링크 / 첨부파일 클릭 금지
- 해커가 채팅이나 공지로 보내는 인터넷 주소(URL)를 클릭하면 스마트폰 해킹 및 악성앱이 설치될 수 있습니다.` : ''}

${includePoliceStatus ? `🛡️ 현재 조치 상황:
- 네이버 밴드 헬프센터에 비정상 리더 위임 취소 및 권한 원상 복구를 긴급 접수하였습니다.
- 경찰청 사이버수사국(ECRM)에 정보통신망법 위반으로 정식 수사 의뢰를 진행하고 있습니다.` : ''}

${emergencyContact.trim() ? `📞 리더 비상 확인 연락처: ${emergencyContact.trim()}` : ''}

회원 여러분의 소중한 금전적 피해를 막기 위해 이 공지를 주변 다른 밴드 회원분들께도 카카오톡으로 신속히 전달해 주시기를 간곡히 부탁드립니다.

혼란과 심려를 끼쳐드려 진심으로 죄송합니다.`;
    }

    if (platform === 'sms_lms') {
      return `[긴급/사기주의] ${primaryBand} 원래 방장입니다.
계정 해킹으로 방장 권한이 탈취되었습니다. 현재 방장(해커: ${hackerNamesFormatted})의 송금/상품결제/링크클릭 요구는 100% 사기입니다! 절대 응하지 마시고 주변 회원들께 공유 바랍니다. 경찰청 및 밴드 고객센터 신고 조치 중입니다. ${emergencyContact ? `(문의: ${emergencyContact})` : ''}`;
    }

    if (platform === 'sns_feed') {
      return `📢 [긴급 공지] 네이버 밴드 사칭 사기 주의 당부드립니다.

제가 운영 중인 네이버 밴드 [${bandNamesFormatted}]가 해킹당하여 방장 권한을 강제로 빼앗겼습니다.

현재 방장으로 등록된 [${hackerNamesFormatted}]는 제가 아닌 해커입니다!
밴드에 올라오는 상품 구매, 계좌이체, 금전 요구, 링크 클릭에 절대 응하지 마십시오.

현재 고객센터 권한 복구 요청 및 경찰청 사이버수사국에 정식 신고 접수되었습니다.
피해 방지를 위해 주변에 널리 공유 부탁드립니다. 🙏`;
    }

    // telegram_line
    return `🚨 [긴급 알림] 밴드 해킹 피해 안내
- 대상 밴드: ${bandNamesFormatted}
- 가짜 방장(해커): ${hackerNamesFormatted}
- 상황: 원작성자 권한 탈취 및 강퇴됨
- 경고: 밴드 내 모든 금전 요구/상품구매/URL 클릭은 사기이므로 절대 응하지 마십시오.
경찰 및 고객센터 조치 진행 중입니다.`;
  };

  const currentMessage = generateMessage();

  const handleCopy = () => {
    const labelMap: Record<PlatformType, string> = {
      kakaotalk: '카카오톡 긴급 공지문',
      sms_lms: '문자메시지(SMS/LMS) 경고문',
      sns_feed: 'SNS 피드/스토리 공지문',
      telegram_line: '메신저 요약 공지문'
    };
    onCopyText(currentMessage, labelMap[platform]);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white px-6 py-4.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-700/80 rounded-xl shadow-inner border border-amber-400/40">
            <MessageSquareText className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                회원 대상 긴급 경고문 생성기 (카카오톡 / 문자 / SNS)
              </h2>
              <span className="bg-amber-900 text-amber-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                2차 사기 방지 핵심
              </span>
            </div>
            <p className="text-xs text-amber-100 mt-0.5">
              해커가 멤버들을 상대로 가짜 상품 판매나 금전을 요구하기 전, 카카오톡 등으로 경고문을 즉시 전파하세요.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition active:scale-95 cursor-pointer"
        >
          <Copy className="w-4 h-4 text-amber-400" />
          경고문 전체 복사하기
        </button>
      </div>

      <div className="p-6">
        {/* Platform Selector Tabs */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setPlatform('kakaotalk')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              platform === 'kakaotalk'
                ? 'bg-amber-400 text-slate-950 shadow-sm ring-2 ring-amber-500/50'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <MessageCircle className="w-4 h-4 fill-amber-950 text-amber-950" />
            카카오톡 상세형 (가장 권장)
          </button>

          <button
            type="button"
            onClick={() => setPlatform('sms_lms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              platform === 'sms_lms'
                ? 'bg-amber-400 text-slate-950 shadow-sm ring-2 ring-amber-500/50'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            문자메시지 (SMS / LMS)
          </button>

          <button
            type="button"
            onClick={() => setPlatform('sns_feed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              platform === 'sns_feed'
                ? 'bg-amber-400 text-slate-950 shadow-sm ring-2 ring-amber-500/50'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Share2 className="w-4 h-4" />
            인스타 / 페북 / 블로그 공지
          </button>

          <button
            type="button"
            onClick={() => setPlatform('telegram_line')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              platform === 'telegram_line'
                ? 'bg-amber-400 text-slate-950 shadow-sm ring-2 ring-amber-500/50'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Send className="w-4 h-4" />
            라인 / 텔레그램 축약형
          </button>
        </div>

        {/* Customization Options Bar */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-950">
            <Sparkles className="w-4 h-4 text-amber-600" />
            경고문 세부 옵션 맞춤 설정 (클릭 시 자동 반영)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-800">
            <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-lg border border-amber-200 hover:border-amber-400 transition">
              <input
                type="checkbox"
                checked={includeProductWarning}
                onChange={(e) => setIncludeProductWarning(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
              />
              <span className="font-semibold">상품 판매·선입금 사기 경고</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-lg border border-amber-200 hover:border-amber-400 transition">
              <input
                type="checkbox"
                checked={includeBankWarning}
                onChange={(e) => setIncludeBankWarning(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
              />
              <span className="font-semibold">계좌이체·송금 요구 금지 경고</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-lg border border-amber-200 hover:border-amber-400 transition">
              <input
                type="checkbox"
                checked={includePhishingWarning}
                onChange={(e) => setIncludePhishingWarning(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
              />
              <span className="font-semibold">악성 단축링크 클릭 금지 경고</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-lg border border-amber-200 hover:border-amber-400 transition">
              <input
                type="checkbox"
                checked={includePoliceStatus}
                onChange={(e) => setIncludePoliceStatus(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
              />
              <span className="font-semibold">경찰 및 고객센터 접수 진행 명시</span>
            </label>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs font-semibold text-amber-900 shrink-0">
              신고자 비상 연락처 (선택):
            </span>
            <input
              type="text"
              placeholder="예: 010-XXXX-XXXX 또는 카카오톡ID: abc1234"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="flex-1 max-w-sm px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Message Preview and Kakao Mock Bubble */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Editable Text Area (8 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MessageSquareText className="w-4 h-4 text-amber-600" />
                복사 전송용 텍스트 (직접 수정 가능)
              </span>
              <span className="text-[11px] text-slate-400">
                글자 수: {currentMessage.length}자
              </span>
            </div>

            <textarea
              readOnly
              rows={14}
              value={currentMessage}
              className="w-full p-4 rounded-xl border border-slate-300 font-mono text-xs sm:text-sm text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition leading-relaxed shadow-inner"
            />

            <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>회원 단체방이나 핵심 회원들에게 먼저 전달해 공지를 요청하세요.</span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 text-xs sm:text-sm font-extrabold rounded-xl shadow-md transition"
              >
                <Copy className="w-4 h-4" />
                이 문구 복사하기
              </button>
            </div>
          </div>

          {/* Realistic KakaoTalk / Message Preview (5 cols) */}
          <div className="lg:col-span-5 bg-[#b2c7d9] p-4 sm:p-5 rounded-2xl shadow-inner border border-slate-300">
            <div className="text-[11px] font-bold text-slate-600 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" />
                {platform === 'kakaotalk' ? '카카오톡 수신 화면 미리보기' : '스마트폰 메시지 수신 화면'}
              </span>
              <span className="text-[10px] bg-slate-700/20 text-slate-800 px-2 py-0.5 rounded-full font-medium">
                회원 시점
              </span>
            </div>

            <div className="flex items-start gap-2 max-w-sm">
              <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                리더
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-800 mb-1">
                  {incident.reporterName || '밴드 원래 리더'}
                </div>
                <div className="bg-[#fee500] text-slate-900 text-xs p-3.5 rounded-2xl rounded-tl-none shadow-md font-sans leading-relaxed whitespace-pre-wrap max-h-[380px] overflow-y-auto">
                  {currentMessage}
                </div>
                <div className="text-[10px] text-slate-600 mt-1 pl-1">
                  방금 전 · 카카오톡 전파 권장
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-400/40 text-center">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                클립보드에 복사 후 카카오톡에 붙여넣기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
