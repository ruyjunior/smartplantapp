import { fetchCompanyById } from '../query/companies/data';
import { fetchByEmail, fetchById } from '../query/users/data';
import crypto from "crypto";
import { getServerSession } from "next-auth";

export async function CurrentCompanyId() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email ) {
    throw new Error('User session is not available.');
  }
  const user = await fetchByEmail(session.user.email);
  const idcompany = user.idcompany;
  if (!idcompany) {
    throw new Error('User company ID is not available.');
  }
  return idcompany;
}

export async function CurrentCompany() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    throw new Error('User session is not available.');
  }
  const user = await fetchByEmail(session.user.email);
  if (!user.idcompany) {
    throw new Error('User company ID is not available.');
  }
  const company = await fetchCompanyById(user.idcompany);
  return company;
}

export async function CurrentUser() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    throw new Error('User session is not available.');
  }
  const user = await fetchByEmail(session.user.email);
  //console.log('CurrentUser:', user);
  return user;
}

export const formatCurrency = (amount: number) => {
  const newamount = amount.toLocaleString(
    'pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  );
  return newamount;
};

export function timeToDecimal(time: string | null | undefined) {
  if (!time) {
    return 0; // Retorna 0 se o valor for null ou undefined
  }
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours + minutes / 60 + (seconds || 0) / 3600;
}

export const formatDateToLocal = (
  dateStr: string | null | undefined,
  locale: string = 'pt-BR',
) => {
  if (!dateStr) {
    return '';
  }

  const date = new Date(dateStr);

  // Ajuste para garantir que a data esteja correta
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};


export const formatTime = (time: string | null | undefined) => {
  if (!time) {
    return '';
  }
  // Remove the seconds part
  return time.slice(0, -3);
};

export const formatCPF = (cpf: string | null | undefined) => {
  if (!cpf) {
    return '';
  }
  // Remove any non-digit characters
  cpf = cpf.replace(/\D/g, '');

  // Apply the CPF mask
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return cpf;
};

export const formatCNPJ = (cnpj: string | null | undefined) => {
  if (!cnpj) {
    return '';
  }
  // Remove any non-digit characters
  cnpj = cnpj.replace(/\D/g, '');

  // Apply the CNPJ mask
  cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
  cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');

  return cnpj;
};

export const formatCEP = (cep: string | null | undefined) => {
  if (!cep) {
    return '';
  }
  // Remove any non-digit characters
  cep = cep.replace(/\D/g, '');

  // Apply the CEP mask
  cep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');

  return cep;
};

export const formatPhone = (phone: string | null | undefined) => {
  if (!phone) {
    return '';
  }
  // Remove any non-digit characters
  phone = phone.replace(/\D/g, '');

  // Apply the phone mask
  if (phone.length <= 10) {
    // Format as (XX) XXXX-XXXX
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2');
    phone = phone.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    // Format as (XX) XXXXX-XXXX
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2');
    phone = phone.replace(/(\d{5})(\d)/, '$1-$2');
  }

  return phone;
};

export const formatDateBr = (date: string | null | undefined) => {
  if (!date) {
    return '';
  }
  // Remove any non-digit characters
  date = date.replace(/\D/g, '');

  // Apply the date mask
  if (date.length <= 2) {
    date = date.replace(/(\d{2})/, '$1');
  } else if (date.length <= 4) {
    date = date.replace(/(\d{2})(\d{2})/, '$1/$2');
  } else {
    date = date.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  }

  return date;
};

export const formatDateTimeDb = (dateStr: string | null | undefined) => {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatDateToTimeDb = (dateStr: string | null | undefined) => {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};


export const formatDateDb = (dateStr: string | null | undefined) => {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatCurrencyInput = (value: string) => {
  // Remove any non-digit characters
  value = value.replace(/\D/g, '');

  // Format the value as currency
  const formattedValue = (parseInt(value) / 100).toFixed(2).replace('.', ',');

  return formattedValue;
};


export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const generateToken = () => crypto.randomBytes(32).toString("hex");