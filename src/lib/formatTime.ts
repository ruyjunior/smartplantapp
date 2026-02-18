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
