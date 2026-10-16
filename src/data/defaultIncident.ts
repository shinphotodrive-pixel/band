import { IncidentData } from '../types';

export const defaultIncidentData: IncidentData = {
  bandNames: [
    '상품 판매 커뮤니케이션방',
    '다락방',
    'OCS모임방'
  ],
  hackerNames: [
    '이상철',
    '전시숙'
  ],
  bandUrls: [
    'https://band.us/band/4144479',
    'https://band.us/band/10010412'
  ],
  incidentDateTime: new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) + '경 발생 확인',
  notes: '리더 권한을 강제로 박탈당하고 강제 퇴장(강퇴) 당한 상태입니다. 해커들이 멤버들을 상대로 피싱 사기, 금전 요구, 허위 상품 판매를 시도할 위험이 매우 높습니다.',
  reporterName: '피해 밴드 원소유자(원래 리더)',
  reporterContact: ''
};
