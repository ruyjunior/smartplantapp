import { sql } from '@vercel/postgres';
import { Event } from '@/query/events/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchEvents(idmachine : string) {
  try {
    const data = await sql<Event>`
      SELECT * 
      FROM smartplantapp.events
      WHERE events.idmachine = ${idmachine}
      ORDER BY recorded_at DESC
    `;
    const events = data.rows;
    return events;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all events.');
  }
}

export async function fetchFiltered(
  query: string,
  currentPage: number | undefined | null
) {
  const offset = (currentPage && currentPage > 0 ? (currentPage - 1) * ITEMS_PER_PAGE : 0);
  const idmachine = await CurrentCompanyId();

  try {
    const data = await sql<Event>`
      SELECT *
      FROM smartplantapp.events
      WHERE
        events.idmachine = ${idmachine} AND (
        events.id::TEXT ILIKE ${`%${query}%`})
      ORDER BY name ASC

    `;
    const events = data.rows;
    return events;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search events.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchPages(query: string) {
  const idmachine = await CurrentCompanyId();
  try {
    const count = await sql`
      SELECT COUNT(*) FROM smartplantapp.events
      WHERE events.idmachine = ${idmachine}
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
    const data = await sql<Event>`
      SELECT *
        FROM smartplantapp.events
        WHERE events.id = ${id} `;

    const count = data.rows;

    return count[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant.');
  }
}