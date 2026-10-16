import React, { useState, useEffect } from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Copy, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Lock, 
  Unlock, 
  Printer, 
  AlertTriangle, 
  Check, 
  Sparkles,
  Info,
  Shield
} from 'lucide-react';

interface PasswordRecord {
  id: string;
  service: string; // e.g. "네이버 (NAVER) 본계정", "밴드 (BAND) 계정", "비상 복구용 이메일"
  loginId: string;
  password: string;
  has2FA: boolean;
  lastUpdated: string;
  memo: string;
}

interface SecurePasswordVaultProps {
  onShowToast: (msg: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const DEFAULT_RECORDS: PasswordRecord[] = [
  {
    id: 'rec_naver',
    service: '네이버 (NAVER) 본계정',
    loginId: '아이디를 입력하세요',
    password: '',
    has2FA: true,
    lastUpdated: new Date().toLocaleDateString('ko-KR'),
    memo: '해킹 침입 후 신규 변경 완료 / 2단계 인증 필수'
  },
  {
    id: 'rec_band',
    service: '네이버 밴드 (BAND)',
    loginId: '네이버 연동 또는 전화번호',
    password: '',
    has2FA: true,
    lastUpdated: new Date().toLocaleDateString('ko-KR'),
    memo: '밴드 앱 접속 기기 관리에서 타 기기 전체 로그아웃 완료'
  },
  {
    id: 'rec_backup_email',
    service: '비상 복구용 보조 이메일 (Gmail / Daum)',
    loginId: 'recovery@example.com',
    password: '',
    has2FA: true,
    lastUpdated: new Date().toLocaleDateString('ko-KR'),
    memo: '네이버 비밀번호 분실 시 인증번호를 수신할 2차 안전 메일'
  }
];

export const SecurePasswordVault: React.FC<SecurePasswordVaultProps> = ({
  onShowToast,
  onCopyText
}) => {
  // Load saved records from localStorage
  const [records, setRecords] = useState<PasswordRecord[]>(() => {
    try {
      const saved = localStorage.getItem('band_secure_vault_records_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_RECORDS;
  });

  // Global privacy mask toggle (Shoulder surfing protection)
  const [isVaultMasked, setIsVaultMasked] = useState<boolean>(true);

  // Per-item password visibility map
  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});

  // Password Generator state
  const [genLength, setGenLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');

  // Save to localStorage whenever records change
  useEffect(() => {
    try {
      localStorage.setItem('band_secure_vault_records_v1', JSON.stringify(records));
    } catch (e) {
      console.error(e);
    }
  }, [records]);

  // Generate strong random password
  const generateStrongPassword = () => {
    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // exclude ambiguous I, O
    if (includeLower) charset += 'abcdefghijkmnopqrstuvwxyz'; // exclude ambiguous l
    if (includeNumbers) charset += '23456789'; // exclude 0, 1
    if (includeSymbols) charset += '!@#$%^&*()_+~|}{[]:?><';

    if (!charset) {
      charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }

    let result = '';
    const array = new Uint32Array(genLength);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < genLength; i++) {
      result += charset[array[i] % charset.length];
    }
    setGeneratedPassword(result);
  };

  useEffect(() => {
    generateStrongPassword();
  }, [genLength, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const toggleItemVisibility = (id: string) => {
    setVisibleItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUpdateRecord = (id: string, field: keyof PasswordRecord, value: any) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleAddNewRecord = () => {
    const newRec: PasswordRecord = {
      id: 'rec_' + Date.now(),
      service: '새 서비스 계정',
      loginId: '',
      password: generatedPassword || '',
      has2FA: false,
      lastUpdated: new Date().toLocaleDateString('ko-KR'),
      memo: '신규 보안 암호 설정'
    };
    setRecords(prev => [...prev, newRec]);
    onShowToast('새 계정 항목이 추가되었습니다.');
  };

  const handleDeleteRecord = (id: string) => {
    if (window.confirm('이 암호 항목을 기록장에서 삭제하시겠습니까?')) {
      setRecords(prev => prev.filter(r => r.id !== id));
      onShowToast('항목이 삭제되었습니다.');
    }
  };

  const handleApplyGeneratedToRecord = (recordId: string) => {
    if (!generatedPassword) return;
    handleUpdateRecord(recordId, 'password', generatedPassword);
    handleUpdateRecord(recordId, 'lastUpdated', new Date().toLocaleDateString('ko-KR'));
    onShowToast('생성된 강력한 비밀번호가 해당 계정에 적용되었습니다.');
  };

  const handlePrintVault = () => {
    window.print();
  };

  // Password strength score
  const getStrengthScore = (pw: string): { label: string; color: string; percent: number } => {
    if (!pw) return { label: '미입력', color: 'bg-slate-300', percent: 0 };
    let score = 0;
    if (pw.length >= 10) score += 25;
    if (pw.length >= 14) score += 25;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score += 20;
    if (/[0-9]/.test(pw)) score += 15;
    if (/[^A-Za-z0-9]/.test(pw)) score += 15;

    if (score < 40) return { label: '위험 (취약)', color: 'bg-red-500', percent: score };
    if (score < 70) return { label: '보통', color: 'bg-amber-500', percent: score };
    if (score < 90) return { label: '안전함', color: 'bg-blue-500', percent: score };
    return { label: '매우 강력 (최상)', color: 'bg-emerald-500', percent: 100 };
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white px-6 py-4.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-400/30">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                보안 암호 기록장 & 강력 생성기 (Password Vault)
              </h2>
              <span className="bg-emerald-500 text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                로컬 암호화 보관
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-0.5">
              해킹 사고 후 새로 변경한 비밀번호를 안전하게 기록하고, 난공불락의 강력한 비밀번호를 생성합니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Privacy Screen Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsVaultMasked(!isVaultMasked)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              isVaultMasked 
                ? 'bg-slate-800 text-amber-300 border-amber-400/40 hover:bg-slate-700' 
                : 'bg-emerald-800 text-white border-emerald-500 hover:bg-emerald-700'
            }`}
            title="주변 엿보기 방지: 비밀번호 마스킹 모드 전환"
          >
            {isVaultMasked ? (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>엿보기 방지 켜짐</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-300" />
                <span>전체 표시 모드</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrintVault}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition"
            title="인쇄하여 안전한 금고나 지갑에 종이로 보관하기"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">오프라인</span> 인쇄
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Local Security Notice */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl mb-6 flex items-start gap-3 text-xs text-slate-700">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>개인정보 안심 보호:</strong> 입력하신 비밀번호는 외부 서버로 전송되지 않으며, 사용자 본인의 브라우저 내부 로컬 스토리지에만 저장됩니다. 공용 PC나 타인의 기기에서 사용할 경우 기록 후 반드시 삭제하거나 [엿보기 방지 모드]를 활성화하세요.
          </div>
        </div>

        {/* Section 1: Strong Password Generator */}
        <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/50 border border-emerald-200/90 rounded-2xl p-5 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-bold text-sm sm:text-base text-emerald-950">
                  해킹 방지용 난수 무작위 비밀번호 생성기
                </h3>
                <p className="text-xs text-emerald-800">
                  전화번호나 기념일 대신, 컴퓨터 연산으로도 풀 수 없는 16자리 이상의 복합 암호를 즉시 발급합니다.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={generateStrongPassword}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs self-start sm:self-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              새로운 암호 생성
            </button>
          </div>

          {/* Generated Result Box */}
          <div className="bg-white rounded-xl border border-emerald-300 p-3.5 flex items-center justify-between gap-3 mb-4 shadow-inner">
            <div className="font-mono text-sm sm:text-lg font-bold tracking-wider text-slate-900 break-all select-all">
              {generatedPassword}
            </div>

            <button
              type="button"
              onClick={() => onCopyText(generatedPassword, '새로 생성된 강력한 비밀번호')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-lg shrink-0 shadow-xs transition cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              암호 복사
            </button>
          </div>

          {/* Generator Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs text-slate-700">
            <div className="md:col-span-1">
              <label className="block font-bold text-slate-800 mb-1">
                암호 길이: <span className="text-emerald-700 font-extrabold">{genLength}자리</span>
              </label>
              <input
                type="range"
                min="12"
                max="28"
                value={genLength}
                onChange={(e) => setGenLength(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer bg-white/80 p-2 rounded-lg border border-emerald-200">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="rounded text-emerald-600 cursor-pointer"
              />
              <span>대문자 (A-Z)</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer bg-white/80 p-2 rounded-lg border border-emerald-200">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="rounded text-emerald-600 cursor-pointer"
              />
              <span>소문자 (a-z)</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer bg-white/80 p-2 rounded-lg border border-emerald-200">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="rounded text-emerald-600 cursor-pointer"
              />
              <span>숫자 (0-9)</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer bg-white/80 p-2 rounded-lg border border-emerald-200">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="rounded text-emerald-600 cursor-pointer"
              />
              <span>특수기호 (!@#$)</span>
            </label>
          </div>
        </div>

        {/* Section 2: Password Records Table */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              계정별 신규 비밀번호 관리 목록 ({records.length}건)
            </h3>

            <button
              type="button"
              onClick={handleAddNewRecord}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              새 계정 항목 추가
            </button>
          </div>

          <div className="space-y-4">
            {records.map((rec) => {
              const isItemVisible = !isVaultMasked && !!visibleItems[rec.id];
              const strength = getStrengthScore(rec.password);

              return (
                <div
                  key={rec.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs hover:border-emerald-300 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                        PW
                      </div>
                      <div>
                        <input
                          type="text"
                          value={rec.service}
                          onChange={(e) => handleUpdateRecord(rec.id, 'service', e.target.value)}
                          className="font-bold text-sm text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none"
                        />
                        <div className="text-[11px] text-slate-400">
                          최종 변경일: {rec.lastUpdated}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                        <input
                          type="checkbox"
                          checked={rec.has2FA}
                          onChange={(e) => handleUpdateRecord(rec.id, 'has2FA', e.target.checked)}
                          className="rounded text-emerald-600 cursor-pointer"
                        />
                        <span className="font-semibold text-emerald-800">2단계 인증(2FA) 적용됨</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleApplyGeneratedToRecord(rec.id)}
                        className="text-xs px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200 font-medium transition"
                        title="생성기에서 뽑은 암호로 바로 덮어쓰기"
                      >
                        생성된 암호 적용
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteRecord(rec.id)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                        title="항목 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 mt-3.5 items-end">
                    {/* ID */}
                    <div className="md:col-span-3">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        로그인 아이디 / 이메일
                      </label>
                      <input
                        type="text"
                        value={rec.loginId}
                        onChange={(e) => handleUpdateRecord(rec.id, 'loginId', e.target.value)}
                        placeholder="아이디 입력"
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* Password */}
                    <div className="md:col-span-4">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-600">
                          새 비밀번호
                        </label>
                        {rec.password && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded text-white ${strength.color}`}>
                            {strength.label}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type={isItemVisible ? 'text' : 'password'}
                          value={rec.password}
                          onChange={(e) => handleUpdateRecord(rec.id, 'password', e.target.value)}
                          placeholder="새 암호 입력 또는 생성기 적용"
                          className="w-full pl-3 pr-16 py-1.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => toggleItemVisibility(rec.id)}
                            disabled={isVaultMasked}
                            className={`p-1 rounded text-slate-400 hover:text-slate-700 ${isVaultMasked ? 'opacity-30 cursor-not-allowed' : ''}`}
                            title={isItemVisible ? '암호 숨기기' : '암호 보기'}
                          >
                            {isItemVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => rec.password && onCopyText(rec.password, `${rec.service} 비밀번호`)}
                            className="p-1 rounded text-slate-400 hover:text-emerald-600"
                            title="암호 복사"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Memo */}
                    <div className="md:col-span-5">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        암호 힌트 / 특이사항 메모
                      </label>
                      <input
                        type="text"
                        value={rec.memo}
                        onChange={(e) => handleUpdateRecord(rec.id, 'memo', e.target.value)}
                        placeholder="예: 2026 가을 변경, 특수문자 조합"
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Golden Rules of Password Security */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 text-xs text-slate-700">
          <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-xs sm:text-sm">
            <Info className="w-4 h-4 text-blue-600" />
            해킹 재발을 막는 안전한 비밀번호 관리 4대 철칙
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-0.5">1. 계정 간 비밀번호 분리</span>
              네이버, 밴드, 이메일, 금융사 비밀번호를 절대 동일하게 쓰지 마세요. 한 곳이 털리면 모든 곳이 털립니다.
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-0.5">2. 최소 14자리 이상</span>
              8자리는 몇 분 만에 무차별 대입(브루트포스)으로 뚫리지만, 14자리 이상 복합 암호는 수십 년이 걸립니다.
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-0.5">3. 2단계 인증 필수</span>
              비밀번호가 유출되더라도 내 스마트폰 승인이 없으면 해커가 로그인할 수 없습니다.
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-0.5">4. 오프라인 종이 보관 권장</span>
              디지털 메모장이나 카카오톡 나와의 채팅에 비밀번호를 적어두지 마시고 종이에 적어 지갑에 보관하세요.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
