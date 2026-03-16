export const formatBookCount = (count: number) => {
  if (count === 0) return "Nenhum livro";
  if (count === 1) return "1 livro";
  return `${count} livros`;
};
