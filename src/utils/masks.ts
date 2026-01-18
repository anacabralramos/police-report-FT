export const maskCPF = (value: string) => {
  // 1. Remove tudo que não é número
  const onlyNums = value.replace(/\D/g, "");

  // 2. Trava em 11 dígitos
  if (onlyNums.length > 11) return value.substring(0, 14);

  // 3. Aplica a formatação
  return onlyNums
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const maskRG = (value: string) => {
  // 1. Remove tudo que não é número ou a letra X (alguns RGs terminam em X)
  let v = value.replace(/[^0-9Xx]/g, "");

  // 2. Limita a 9 caracteres (8 números + 1 dígito verificador)
  if (v.length > 9) v = v.substring(0, 9);

  // 3. Aplica a formatação dinamicamente
  return v
    .replace(/(\d{2})(\d)/, "$1.$2") // 00.
    .replace(/(\d{3})(\d)/, "$1.$2") // 00.000.
    .replace(/(\d{3})([\dXx])$/, "$1-$2"); // 00.000.000-0
};
