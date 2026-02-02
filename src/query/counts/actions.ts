'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  tag: z.string(),
  value: z.string(),
  idmachine: z.string()
});

const CreateData = FormSchema.omit({ id: true });
const UpdateData = FormSchema.omit({ id: true, idmachine: true });

export type State = {
  errors?: {
    tag?: string[];
  };
  message?: string | null;
};

export async function createData(prevState: State, formData: FormData) {
  const validatedFields = CreateData.safeParse({
    tag: formData.get('name'),
    value: formData.get('value'),
    idmachine: formData.get('idmachine'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { tag, value, idmachine } = validatedFields.data;

  try {
    await sql`
        INSERT INTO smartplantapp.counts ( tag, value, idmachine )
        VALUES (${tag}, ${value} , ${idmachine})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create.',
    };
  }

  revalidatePath('/counts');
  redirect('/dashboard?success=A criação foi um sucesso!');
}


export async function deleteData(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM smartplantapp.counts WHERE id = ${id}`;
  revalidatePath('/counts');
  redirect('/counts?success=A exclusão foi realizada!');

}