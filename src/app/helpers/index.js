export const successResponse = (req, res, data) => res.status(200).json(data);

export const errorResponse = (req, res, errorMessage, code) =>
  res.status(500).json({ code, errorMessage });

export const isValidCPF = cpf => {
  if (typeof cpf !== 'string') return false;
  cpf = cpf.replace(/[\s.-]*/gim, '');

  if (cpf.length !== 11 || !Array.from(cpf).filter(e => e !== cpf[0]).length) {
    return false;
  }

  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i += 1) {
    sum += parseInt(cpf.substring(i - 1, i), 11) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10), 11)) return false;
  sum = 0;
  for (let i = 1; i <= 10; i += 1) {
    sum += parseInt(cpf.substring(i - 1, i), 11) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11), 11)) return false;
  return true;
};
