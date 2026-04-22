import pg from 'pg';

// Railway public URL을 사용하세요 (로컬에서 internal URL은 접근 불가)
const DATABASE_URL = process.env.DATABASE_URL || process.argv[2];

if (!DATABASE_URL) {
  console.error('DATABASE_URL이 필요합니다.');
  console.error('사용법: node scripts/setup-db.mjs <DATABASE_URL>');
  process.exit(1);
}

const client = new pg.Client({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function setup() {
  await client.connect();
  console.log('DB 연결 성공!');

  // 1. cases 테이블 생성
  await client.query(`
    CREATE TABLE IF NOT EXISTS cases (
      id SERIAL PRIMARY KEY,
      keyword VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      report_count INTEGER DEFAULT 0,
      tags TEXT[] DEFAULT '{}',
      created_at TIMESTAMP DEFAULT NOW(),
      is_active BOOLEAN DEFAULT true,
      sort_order INTEGER DEFAULT 0
    );
  `);
  console.log('cases 테이블 생성 완료');

  // 2. 테스트 키워드 삽입
  const existing = await client.query("SELECT id FROM cases WHERE slug = 'fxstar'");
  if (existing.rows.length === 0) {
    await client.query(`
      INSERT INTO cases (keyword, slug, report_count, tags, is_active, sort_order)
      VALUES ('FX스타', 'fxstar', 47, ARRAY['투자사기', '외환거래', 'FX마진', '출금지연'], true, 1);
    `);
    console.log('테스트 키워드 "FX스타" 삽입 완료');
  } else {
    console.log('테스트 키워드 "FX스타" 이미 존재');
  }

  // 3. 확인
  const rows = await client.query('SELECT * FROM cases');
  console.log('\n현재 cases 테이블:');
  console.table(rows.rows);

  await client.end();
  console.log('\n셋업 완료! astro dev로 확인하세요.');
}

setup().catch((e) => {
  console.error('에러:', e.message);
  process.exit(1);
});
