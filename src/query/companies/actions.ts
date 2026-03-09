'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { deleteUnusedFiles } from '@/lib/deleteUnusedFiles';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  cnpj: z.string().optional(),
  cep: z.string().optional().nullable(),
  siteurl: z.string().optional().nullable(),
  logourl: z.string().optional().nullable(),
  phone: z.string().optional(),
  email: z.string().optional(),
  localaddress: z.string().optional(),
  slogan: z.string().optional(),
});

const CreateCompany = FormSchema.omit({ id: true });
const UpdateCompany = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    cnpj?: string[];
    cep?: string[];
    siteurl?: string[];
    logourl?: string[] | undefined;
    phone?: string[];
    email?: string[];
    localaddress?: string[];
    slogan?: string[];
  };
  message?: string | null;
};

export async function createCompany(prevState: State, formData: FormData) {
  const validatedFields = CreateCompany.safeParse({
    name: formData.get('name'),
    logourl: formData.get('logourl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { name, cnpj, cep, siteurl, logourl, phone, email, localaddress, slogan } = validatedFields.data;

  try {
    await sql`
        INSERT INTO smartplantapp.companies ( name, cnpj, cep, siteurl, logourl, phone, email, localaddress)
        VALUES (${name}, ${cnpj}, ${cep}, ${siteurl}, ${logourl}, ${phone}, ${email}, ${localaddress}, ${slogan})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create.',
    };
  }
  revalidatePath('/company');
  redirect(
    '/company?title=Sucesso&message=A criação foi um sucesso!&type=success'
  );
}

export async function updateCompany(
  id: string,
  prevState: State,
  formData: FormData
) {
  //console.log('Form Data: ' + FormData.arguments );
  const validatedFields = UpdateCompany.safeParse({
    name: formData.get('name'),
  });
  //console.log('Validates: ' + validatedFields.data?.logourl );

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Company.',
    };
  }

  const { name } = validatedFields.data;
  try {
    await sql`
    UPDATE smartplantapp.companies
    SET name = ${name} 
    WHERE id = ${id}
  `;
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Company.' };
  }
  //deleteUnusedFiles();
  revalidatePath('/company');
  redirect(
    '/company?title=Sucesso&message=A atualização foi um sucesso!&type=success'
  );
}

export async function deleteCompany(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM smartplantapp.companies WHERE id = ${id}`;
  revalidatePath('/company');
  redirect(
    '/company?title=Sucesso&message=A exclusão foi um sucesso!&type=success'
  );
}