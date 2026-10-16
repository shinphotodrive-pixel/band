import React, { useState } from 'react';
import { IncidentData } from '../types';
import { 
  ShieldAlert, 
  AlertTriangle, 
  ShoppingBag, 
  Coins, 
  Smartphone, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  PhoneCall, 
  Copy, 
  ArrowRight,
  Info,
  Banknote,
  UsersRound,
  FileWarning
} from 'lucide-react';

interface FraudPatternGuideProps {
  incident: IncidentData;
  onCopyText: (text: string, label: string) => void;
}

interface FraudPattern {
  id: string;
  badge: string;
  title: string;
  targetDescription: string;
  scenarioTitle: string;
  scenarioDialog: string;
  fakePoster: string;
  redFlags: string[];
  actionRules: string[];
  callout: string;
}

export const FraudPatternGuide: React.FC<FraudPatternGuideProps> = ({
  incident,
  onCopyText
}) => {
  const [selectedPattern, setSelectedPattern] = useState<string>('ecommerce');

  const hackerNames = incident.hackerNames.join(' 또는 ');
  const bandNames = incident.bandNames.join(', ');

  const FRAUD_PATTERNS: FraudPattern[] = [
    {
      id: 'ecommerce',
      badge: '상품 판매방 집중 표적',
      title: '유형 1: 파격 할인 · 땡처리 · 한정수량 공동구매 선입금 사기',
      targetDescription: '특히 [상품 판매 커뮤니케이션방] 등 상거래가 활발한 밴드를 장악한 뒤 가장 많이 저지르는 대표적 수법입니다.',
      scenarioTitle: '실제 해커의 게시글 시나리오',
      scenarioDialog: `"[긴급 공지] 창고 정리로 150만원 상당 고급 안마의자/골프채/가전제품을 단 5분께만 25만원에 한정 처분합니다! 
방장인 제가 보증하며, 선착순 마감되니 구매 원하시는 분은 댓글 달지 마시고 아래 계좌로 즉시 입금 후 주소 남겨주세요!
▶ 입금 계좌: [카카오뱅크 3333-XX-XXXXXX 예금주: ${incident.hackerNames[0] || '이상철'}]"`,
      fakePoster: incident.hackerNames[0] || '이상철',
      redFlags: [
        '시중 가격 대비 비정상적으로 저렴한 파격 특가 (80~90% 할인)',
        '기존 리더의 평소 결제 방식(네이버페이, 카드결제, 안전결제)이 아닌 ‘개인 계좌 무통장 선입금’만 고집',
        '댓글을 막아두거나 "선착순 마감 임박"이라며 이성적 판단을 흐리게 재촉',
        '예금주 이름이 밴드 개설자 본인이 아닌 타인(해커 명의: ' + hackerNames + ')임'
      ],
      actionRules: [
        '절대로 1원도 입금하지 마십시오. 물건은 발송되지 않고 잠적합니다.',
        '해당 계좌번호를 메모하여 112 경찰 신고 시 대포통장 번호로 즉시 제보하세요.',
        '다른 회원들이 속아 입금하지 못하도록 카톡 단체방이나 전화로 즉각 알리십시오.'
      ],
      callout: '사기범은 리더의 평소 신뢰도를 악용하여 순식간에 수백~수천만 원의 피해금을 편취합니다.'
    },
    {
      id: 'urgent_money',
      badge: '방장 사칭 친분 악용',
      title: '유형 2: 긴급 수술비 · 가족 사고 · 급전 대여 빙자 송금 사기',
      targetDescription: '동호회나 친목 모임방(다락방, OCS모임방 등)에서 오랜 시간 쌓아온 리더와의 유대감을 악용합니다.',
      scenarioTitle: '실제 해커의 1:1 채팅 시나리오',
      scenarioDialog: `"OO님 안녕하세요, 방장입니다. 이런 말씀 드리기 정말 면목 없지만 지금 가족이 갑작스럽게 응급실에 입원해 수술비가 급하게 필요합니다.
내일 오전 10시에 보험금 나오는 즉시 100% 갚아드릴 테니 150만원만 융통해 주실 수 있으실까요? 제 통장이 압류되어 지인 계좌로 부탁드립니다..."`,
      fakePoster: incident.hackerNames[1] || '전시숙',
      redFlags: [
        '방장이 평소 하지 않던 개인적인 금전 대여나 급전 송금을 1:1 채팅으로 은밀히 요청',
        '전화 통화를 시도하면 "지금 병실이라 통화가 불가능하다"며 메신저로만 대답',
        '본인 명의가 아닌 제3자 명의 계좌번호 제시'
      ],
      actionRules: [
        '돈을 보내기 전, 반드시 기존에 알고 있던 방장의 실제 휴대폰 번호로 직접 통화하세요.',
        '해커는 음성 통화를 받을 수 없으므로 전화 연결 즉시 해킹임이 확인됩니다.',
        '금전 요구 채팅 화면을 캡처하여 증거로 확보하세요.'
      ],
      callout: '지인이나 친한 회원일수록 방장을 돕겠다는 선의를 악용당하기 쉬우므로 각별히 경계해야 합니다.'
    },
    {
      id: 'smishing_link',
      badge: '스마트폰 해킹 악성코드',
      title: '유형 3: 모바일 청첩장 · 택배 배송조회 · 밴드 보안패치 악성 링크(스미싱)',
      targetDescription: '회원들의 스마트폰까지 추가로 감염시켜 연락처를 탈취하고 2차 스미싱을 연쇄적으로 전파합니다.',
      scenarioTitle: '실제 해커의 스미싱 공지 시나리오',
      scenarioDialog: `"[필독 공지] 네이버 밴드 시스템 최신 보안 강화 패치 안내
최근 밴드 해킹 사고가 급증하여 본 밴드 회원 전용 보안 앱 설치가 의무화되었습니다.
오늘 자정까지 아래 링크를 통해 앱을 업데이트하지 않으시면 밴드에서 자동 강퇴 처리됩니다.
👉 http://me2.do/band-update-v2 (보안 앱 설치 바로가기)"`,
      fakePoster: incident.hackerNames[0] || '이상철',
      redFlags: [
        '알 수 없는 단축 URL(bit.ly, me2.do, vo.la)이나 이상한 영문 주소',
        '네이버 공식 도메인(naver.com, band.us)이 아닌 외부 비인가 웹사이트 유도',
        '링크 클릭 시 .apk 설치 파일이 다운로드되거나 스마트폰 알림 권한 허용을 요구'
      ],
      actionRules: [
        '절대로 해당 링크를 터치하거나 클릭하지 마십시오.',
        '네이버 밴드는 외부 링크를 통해 별도의 보안 앱 설치를 요구하지 않습니다.',
        '실수로 클릭하여 파일을 설치한 경우, 즉시 휴대폰 [비행기 탑승 모드]를 켜고 서비스센터 방문 또는 KISA(118)에 연락하여 악성앱을 삭제하세요.'
      ],
      callout: '링크를 누르는 순간 스마트폰에 저장된 모든 연락처와 공인인증서, 금융 정보가 유출될 수 있습니다.'
    },
    {
      id: 'band_hijack',
      badge: '불법 도박·코인방 유인',
      title: '유형 4: 밴드 강제 이전 및 유료 불법 리딩방 유인 사기',
      targetDescription: '회원들을 해커가 미리 개설해 둔 텔레그램이나 불법 투자 리딩방으로 끌고 가 거액을 뜯어냅니다.',
      scenarioTitle: '실제 해커의 이전 안내 시나리오',
      scenarioDialog: `"[공지] 본 밴드가 네이버 검열로 인해 24시간 내에 폐쇄됩니다.
모든 회원 혜택과 정보는 새로 개설된 VIP 프리미엄 밴드로 이전되오니 지금 즉시 이동해 가입해 주십시오. 
미이동 시 기존 회원 혜택이 영구 박탈됩니다.
👉 https://band.us/n/fake-room-invite"`,
      fakePoster: incident.hackerNames[1] || '전시숙',
      redFlags: [
        '기존 밴드가 강제 폐쇄된다는 거짓 공포심 조장',
        '새로운 방으로 가입하자마자 주식 종목 추천, 코인 투자, 해외 선물 대리 투자를 권유',
        '원래 리더를 밴드에서 일방적으로 강퇴시키고 공지'
      ],
      actionRules: [
        '해커가 유도하는 신규 밴드나 외부 텔레그램 방에 가입하지 마십시오.',
        '해당 밴드는 네이버 고객센터 조사를 통해 원래 리더에게 원상 반환될 예정이므로 자리를 지키세요.'
      ],
      callout: '회원 수가 많은 정상 커뮤니티는 암거래 시장에서 고가에 팔려 불법 투자방으로 변질될 위험이 큽니다.'
    }
  ];

  const currentPattern = FRAUD_PATTERNS.find(p => p.id === selectedPattern) || FRAUD_PATTERNS[0];

  const handleCopyPatternWarning = () => {
    const text = `⚠️ [긴급 경고: 밴드 내 사기 수법 안내] ⚠️

현재 [${bandNames}] 밴드가 해킹되어 가짜 방장(${hackerNames})이 활동 중입니다.

🚫 해커의 주요 사기 수법:
1. 파격 특가/공동구매를 빙자한 '개인 계좌 선입금' 요구
2. 방장 개인 사정(수술비/급전)을 핑계로 한 송금 요청
3. 밴드 보안 패치/청첩장 명목의 '의심스러운 단축링크(URL)' 클릭 유도
4. 새로운 VIP 밴드로 이전하라는 허위 안내

절대로 돈을 입금하거나 링크를 누르지 마십시오! 의심 시 방장의 기존 개인 번호로 직접 통화 확인 바랍니다.`;
    onCopyText(text, '사기 수법 주의 안내문');
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-slate-900 text-white px-6 py-4.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-800/80 rounded-xl shadow-inner border border-red-500/30 text-rose-300">
            <FileWarning className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                해킹범 주요 금전 사기 유형 식별 가이드
              </h2>
              <span className="bg-red-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                실제 피해 예방 필독
              </span>
            </div>
            <p className="text-xs text-rose-200 mt-0.5">
              해커들이 방장 권한을 빼앗은 후 회원들의 돈을 가로채는 4가지 핵심 사기 수법과 구체적 대처법입니다.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyPatternWarning}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-700 hover:bg-rose-600 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition cursor-pointer"
        >
          <Copy className="w-4 h-4" />
          사기 주의 요약문 복사
        </button>
      </div>

      <div className="p-6">
        {/* Navigation Tabs for the 4 patterns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-6">
          {FRAUD_PATTERNS.map((p) => {
            const isSelected = p.id === selectedPattern;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPattern(p.id)}
                className={`p-3.5 rounded-xl border text-left transition relative cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50/90 border-rose-500 ring-2 ring-rose-500/30 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {p.badge}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                  )}
                </div>
                <h3 className={`text-xs sm:text-sm font-bold mt-1 line-clamp-1 ${
                  isSelected ? 'text-rose-950 font-black' : 'text-slate-800'
                }`}>
                  {p.title.split(':')[1] || p.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Pattern Detailed Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 mb-5">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                {currentPattern.badge}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {currentPattern.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {currentPattern.targetDescription}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Scenario Mock Box (Left 5 cols) */}
            <div className="lg:col-span-5 bg-white border border-rose-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  {currentPattern.scenarioTitle}
                </span>
                <span className="text-[11px] bg-red-100 text-red-700 font-extrabold px-2 py-0.5 rounded">
                  가짜 방장 사칭
                </span>
              </div>

              <div className="bg-rose-50/60 p-3.5 rounded-lg border border-rose-100/80 mb-3 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                {currentPattern.scenarioDialog}
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>해커 닉네임({currentPattern.fakePoster})으로 등록되어 게시됩니다.</span>
              </div>
            </div>

            {/* Red Flags & Action Rules (Right 7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Red Flags Checklist */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2.5 text-rose-700">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  이것을 보면 100% 해킹 사기입니다 (식별 특징)
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {currentPattern.redFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exact Action Rules */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 shadow-sm">
                <h4 className="text-xs sm:text-sm font-bold text-emerald-900 flex items-center gap-1.5 mb-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  회원 및 피해자의 정확한 대처 수칙
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
                  {currentPattern.actionRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-emerald-700 shrink-0">{idx + 1}.</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span><strong>주의 핵심: </strong> {currentPattern.callout}</span>
          </div>
        </div>

        {/* Emergency Financial Fraud Counteraction Hotline Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base text-white">
                  혹시 회원이 이미 해커 계좌로 돈을 입금했다면? (긴급 지급정지 절차)
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                사기 피해 발생 후 <strong>골든타임 10분 이내</strong>에 지급정지 요청을 신청해야 피해금을 보전받을 수 있습니다.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <a
                href="tel:112"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition shadow"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                경찰청 112 (계좌 지급정지)
              </a>
              <a
                href="tel:1332"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition border border-slate-600"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                금융감독원 1332
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
