// export const maskCPF = (value: string) => {
//   return value
//     .replace(/\D/g, "") // Remove tudo que não é dígito
//     .replace(/(\d{3})(\d)/, "$1.$2") // Coloca ponto após os 3 primeiros números
//     .replace(/(\d{3})(\d)/, "$1.$2") // Coloca ponto após os 6 primeiros números
//     .replace(/(\d{3})(\d{1,2})$/, "$1-$2") // Coloca hífen antes dos 2 últimos
//     .substring(0, 14); // Limita o tamanho
// };
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

// export const maskRG = (value: string) => {
//   // Máscara básica (pode variar por estado, mas o padrão 00.000.000-0 é comum)
//   return value
//     .replace(/\D/g, "")
//     .replace(/(\d{2})(\d)/, "$1.$2")
//     .replace(/(\d{3})(\d)/, "$1.$3")
//     .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
//     .substring(0, 12);
// };

// export const maskRG = (value: string) => {
//   const onlyNums = value.replace(/\D/g, "");

//   // Trava em 9 dígitos (padrão comum, ajuste se necessário para seu estado)
//   if (onlyNums.length > 9) return value.substring(0, 12);

//   return onlyNums
//     .replace(/(\d{2})(\d)/, "$1.$2")
//     .replace(/(\d{3})(\d)/, "$1.$3")
//     .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
// };

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
