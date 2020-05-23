export const toUnderscore = string => string.replace(/([A-Z])/g, $1 => `_${$1.toLowerCase()}`);
export const humanize = string => toUnderscore(string).replace(/_/g, ' ');
