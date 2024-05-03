import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

// ----------------------------------------------------------------------

export function changeTimeFormat12(time) {
  // Check whether AM or PM
  const splitTime = time.split(':');
  let newformat = 'AM';
  if (splitTime[0] >= 12) {
    newformat = 'PM';
  }

  // Find current hour in AM-PM Format
  let hours = splitTime[0] % 12;

  // To display "0" as "12"
  if (!hours) {
    hours = 12;
  }
  const minutes = splitTime[1] < 10 ? splitTime[1] : splitTime[1];

  return `${hours}:${minutes} ${newformat}`;
}

export function convertTime24(timeStr) {
  if (!timeStr) {
    return '';
  }
  const [time, modifier] = timeStr.split(' ');
  const splitHour = time.split(':');
  let hours = splitHour[0];

  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${splitHour[1]}`;
}
