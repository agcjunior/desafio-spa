import { describe, it, expect } from 'vitest';
import { formatBookCount } from './utils';

describe('formatBookCount', () => {
  it('deve retornar "Nenhum livro" quando o contador for 0', () => {
    expect(formatBookCount(0)).toBe('Nenhum livro');
  });

  it('deve retornar "1 livro" quando o contador for 1', () => {
    expect(formatBookCount(1)).toBe('1 livro');
  });

  it('deve retornar "N livros" para valores maiores que 1', () => {
    expect(formatBookCount(5)).toBe('5 livros');
  });
});
