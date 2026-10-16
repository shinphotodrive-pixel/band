import React, { useState } from 'react';
import { IncidentData } from '../types';
import { 
  Users, 
  UserX, 
  Link as LinkIcon, 
  Edit3, 
  Plus, 
  Trash2, 
  Check, 
  ExternalLink, 
  AlertCircle,
  Clock,
  RotateCcw,
  FileDown
} from 'lucide-react';

interface IncidentSummaryProps {
  incident: IncidentData;
  onUpdateIncident: (data: IncidentData) => void;
  onResetIncident: () => void;
  onOpenPrint?: () => void;
}

export const IncidentSummary: React.FC<IncidentSummaryProps> = ({
  incident,
  onUpdateIncident,
  onResetIncident,
  onOpenPrint
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<IncidentData>(incident);
  const [newBand, setNewBand] = useState('');
  const [newHacker, setNewHacker] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleOpenEdit = () => {
    setFormData(incident);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateIncident(formData);
    setIsEditing(false);
  };

  const handleAddBand = () => {
    if (newBand.trim() && !formData.bandNames.includes(newBand.trim())) {
      setFormData({
        ...formData,
        bandNames: [...formData.bandNames, newBand.trim()]
      });
      setNewBand('');
    }
  };

  const handleRemoveBand = (index: number) => {
    setFormData({
      ...formData,
      bandNames: formData.bandNames.filter((_, i) => i !== index)
    });
  };

  const handleAddHacker = () => {
    if (newHacker.trim() && !formData.hackerNames.includes(newHacker.trim())) {
      setFormData({
        ...formData,
        hackerNames: [...formData.hackerNames, newHacker.trim()]
      });
      setNewHacker('');
    }
  };

  const handleRemoveHacker = (index: number) => {
    setFormData({
      ...formData,
      hackerNames: formData.hackerNames.filter((_, i) => i !== index)
    });
  };

  const handleAddUrl = () => {
    if (newUrl.trim() && !formData.bandUrls.includes(newUrl.trim())) {
      let formattedUrl = newUrl.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      setFormData({
        ...formData,
        bandUrls: [...formData.bandUrls, formattedUrl]
      });
      setNewUrl('');
    }
  };

  const handleRemoveUrl = (index: number) => {
    setFormData({
      ...formData,
      bandUrls: formData.bandUrls.filter((_, i) => i !== index)
    });
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden mb-8 transition-all hover:shadow-md">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="p-1.5 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">피해 사건 요약 정보</h2>
            <p className="text-xs text-slate-300">
              입력된 정보는 1:1 고객센터 복구 신청문 및 회원 경고문에 실시간 자동 연동됩니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <div className="flex items-center gap-2 flex-wrap">
              {onOpenPrint && (
                <button
                  onClick={onOpenPrint}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md transition active:scale-95 cursor-pointer"
                  title="현재 피해 밴드와 해커 정보가 포함된 리포트 다운로드 및 인쇄"
                >
                  <FileDown className="w-3.5 h-3.5 text-white" />
                  <span>피해 요약 리포트 다운로드 / 인쇄 (PDF)</span>
                </button>
              )}
              <button
                onClick={handleOpenEdit}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-600 text-slate-100 text-xs font-semibold border border-slate-600 transition"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                피해 정보 편집 / 밴드 추가
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                type="button"
                className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold transition"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition"
              >
                <Check className="w-3.5 h-3.5" />
                저장 완료
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Editing Mode */}
      {isEditing ? (
        <div className="p-6 bg-slate-50 border-b border-slate-200 space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Damaged Bands List Edit */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-red-600">
                  <Users className="w-4 h-4" /> 피해 밴드 목록 ({formData.bandNames.length})
                </span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="밴드 이름 입력"
                  value={newBand}
                  onChange={(e) => setNewBand(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBand())}
                  className="flex-1 px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddBand}
                  className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <ul className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {formData.bandNames.map((band, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between px-2.5 py-1.5 bg-red-50 text-red-900 rounded-md text-xs border border-red-100"
                  >
                    <span className="font-medium truncate mr-2">{band}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBand(idx)}
                      className="text-red-400 hover:text-red-700 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hackers List Edit */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-red-600">
                  <UserX className="w-4 h-4" /> 권한 탈취자(해커 닉네임)
                </span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="해커 닉네임 입력"
                  value={newHacker}
                  onChange={(e) => setNewHacker(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHacker())}
                  className="flex-1 px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddHacker}
                  className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <ul className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {formData.hackerNames.map((hacker, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between px-2.5 py-1.5 bg-red-50 text-red-900 rounded-md text-xs border border-red-100"
                  >
                    <span className="font-medium truncate mr-2">{hacker}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHacker(idx)}
                      className="text-red-400 hover:text-red-700 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Band URLs Edit */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-red-600">
                  <LinkIcon className="w-4 h-4" /> 확인된 밴드 URL
                </span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="band.us/band/... 입력"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
                  className="flex-1 px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddUrl}
                  className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <ul className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {formData.bandUrls.map((url, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between px-2.5 py-1.5 bg-red-50 text-red-900 rounded-md text-xs border border-red-100"
                  >
                    <span className="font-mono text-[11px] truncate mr-2">{url}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveUrl(idx)}
                      className="text-red-400 hover:text-red-700 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Details / Notes Edit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">발생 일시 및 현황 메모</label>
              <input
                type="text"
                value={formData.incidentDateTime}
                onChange={(e) => setFormData({ ...formData, incidentDateTime: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">신고자 명의 / 닉네임</label>
              <input
                type="text"
                value={formData.reporterName}
                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                placeholder="예: 홍길동 (네이버ID: user123)"
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={onResetIncident}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> 기본 데이터로 초기화
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                닫기
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow"
              >
                수정 완료 적용
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Overview Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Damaged Bands */}
        <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-4.5 relative group hover:border-red-300 transition">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
              <Users className="w-4 h-4 text-red-600" />
              <span>피해 확인 밴드</span>
            </div>
            <span className="text-xs bg-red-200/70 text-red-800 font-extrabold px-2 py-0.5 rounded-full">
              {incident.bandNames.length}개 밴드
            </span>
          </div>
          <ul className="space-y-1.5">
            {incident.bandNames.map((name, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-slate-800 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                <span className="truncate">{name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hackers */}
        <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-4.5 relative group hover:border-red-300 transition">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
              <UserX className="w-4 h-4 text-red-600" />
              <span>권한 탈취자 (가짜 방장/해커)</span>
            </div>
            <span className="text-xs bg-red-200/70 text-red-800 font-extrabold px-2 py-0.5 rounded-full">
              {incident.hackerNames.length}명 식별
            </span>
          </div>
          <ul className="space-y-1.5">
            {incident.hackerNames.map((name, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-slate-800 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                <span className="font-semibold text-red-950">{name}</span>
                <span className="text-xs text-red-600/80">(가짜 리더로 위임됨)</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Verified URLs */}
        <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-4.5 relative group hover:border-red-300 transition">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
              <LinkIcon className="w-4 h-4 text-red-600" />
              <span>확보된 밴드 URL</span>
            </div>
            <span className="text-xs bg-red-200/70 text-red-800 font-extrabold px-2 py-0.5 rounded-full">
              {incident.bandUrls.length}개 링크
            </span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-800">
            {incident.bandUrls.map((url, idx) => {
              const cleanUrl = url.split(' ')[0];
              const label = url.includes('(') ? url.substring(url.indexOf('(')) : '';
              return (
                <li key={idx} className="truncate">
                  <a
                    href={cleanUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline font-mono truncate max-w-full"
                  >
                    <span className="truncate">{cleanUrl.replace('https://', '')}</span>
                    {label && (
                      <span className="font-sans text-[11px] bg-red-100 text-red-800 font-semibold px-1.5 py-0.2 rounded shrink-0">
                        {label}
                      </span>
                    )}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="text-[11px] text-slate-500 mt-2 italic">
            * 강제퇴장 당해 URL을 모르는 밴드는 고객센터 문의 시 가입 당시 명의로 추적 요청합니다.
          </p>
        </div>
      </div>
    </section>
  );
};
