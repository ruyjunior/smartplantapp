'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  idplant: z.string()
});

const CreateData = FormSchema.omit({ id: true });
const UpdateData = FormSchema.omit({ id: true, idplant: true });

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createData(prevState: State, formData: FormData) {
  const validatedFields = CreateData.safeParse({
    name: formData.get('name'),
    idplant: formData.get('idplant'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { name, idplant } = validatedFields.data;

  try {
    await sql`
        INSERT INTO smartplantapp.areas ( name, email, password, role, idplant, avatarurl )
        VALUES (${name}, ${idplant})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create.',
    };
  }

  revalidatePath('/areas');
  redirect('/areas?success=A criação foi um sucesso!');
}

export async function updateData(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateData.safeParse({
    name: formData.get('name'),
  });


  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }


  const { name } = validatedFields.data;

  try {

    await sql`
        UPDATE smartplantapp.areas
        SET name = ${name}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Area.' };
  }
  revalidatePath('/areas');
  redirect('/areas?success=A atualização foi um sucesso!');
}

export async function deleteData(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM smartplantapp.areas WHERE id = ${id}`;
  revalidatePath('/areas');
  redirect('/areas?success=A exclusão foi realizada!');

}