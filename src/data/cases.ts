import { query } from './db';

export interface FraudCase {
  id: number;
  slug: string;
  title: string;
  status: '사건진행중';
  date: string;
  description: string;
  category: string;
  victims?: number;
  amount?: string;
  platforms: string[];
  tags: string[];
}

// DB에서 활성 케이스를 가져와서 FraudCase 형태로 변환
async function fetchCasesFromDB(): Promise<FraudCase[]> {
  try {
    const rows = await query(
      'SELECT id, keyword, slug, report_count, tags, created_at FROM cases WHERE is_active = true ORDER BY sort_order ASC, created_at DESC'
    );

    return rows.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      title: `${row.keyword} 사칭 사기`,
      status: '사건진행중' as const,
      date: new Date(row.created_at).toISOString().slice(0, 10),
      description: `${row.keyword}을(를) 사칭하여 투자금을 편취한 사기 사건입니다. 피해자들은 높은 수익률을 약속받고 투자금을 입금하였으나 출금이 차단되었습니다.`,
      category: '사칭사기',
      victims: row.report_count,
      amount: '',
      platforms: ['텔레그램', '카카오톡'],
      tags: row.tags || [],
    }));
  } catch (e) {
    console.error('DB 연결 실패, 빈 배열 반환:', e);
    return [];
  }
}

// 빌드 타임에 한 번만 실행
export const cases: FraudCase[] = await fetchCasesFromDB();

export const PER_PAGE = 100;

export function getCasesByPage(page: number, perPage: number = PER_PAGE): FraudCase[] {
  const start = (page - 1) * perPage;
  return cases.slice(start, start + perPage);
}

export function getTotalPages(perPage: number = PER_PAGE): number {
  return Math.ceil(cases.length / perPage);
}

export function getCaseBySlug(slug: string): FraudCase | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return cases.map((c) => c.slug);
}
