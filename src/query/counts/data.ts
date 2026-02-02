import { sql } from '@vercel/postgres';
import { Count } from '@/query/counts/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchData(idmachine : string) {
  try {
    const data = await sql<Count>`
      SELECT * 
      FROM smartplantapp.counts
      WHERE counts.idmachine = ${idmachine}
      ORDER BY recorded_at DESC
    `;
    const counts = data.rows;
    return counts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all counts.');
  }
}

export async function fetchFiltered(
  query: string,
  currentPage: number | undefined | null
) {
  const offset = (currentPage && currentPage > 0 ? (currentPage - 1) * ITEMS_PER_PAGE : 0);
  const idmachine = await CurrentCompanyId();

  try {
    const data = await sql<Count>`
      SELECT *
      FROM smartplantapp.counts
      WHERE
        counts.idmachine = ${idmachine} AND (
        counts.id::TEXT ILIKE ${`%${query}%`})
      ORDER BY name ASC

    `;
    const counts = data.rows;
    return counts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search counts.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchPages(query: string) {
  const idmachine = await CurrentCompanyId();
  try {
    const count = await sql`
      SELECT COUNT(*) FROM smartplantapp.counts
      WHERE counts.idmachine = ${idmachine}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchById(id: string) {
  try {
    const data = await sql<Count>`
      SELECT *
        FROM smartplantapp.counts
        WHERE counts.id = ${id} `;

    const count = data.rows;

    return count[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant.');
  }
}