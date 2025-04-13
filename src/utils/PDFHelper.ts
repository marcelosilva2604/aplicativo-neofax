/**
 * Utilitário para gerenciar as páginas do PDF do Neofax
 */

interface AntibioticPage {
  id: string;
  name: string;
  page: number;
}

// Mapeamento correto de antibióticos para páginas no PDF
export const antibioticPages: AntibioticPage[] = [
  { id: "ampicillin", name: "Ampicilina", page: 10 },
  { id: "gentamicin", name: "Gentamicina", page: 20 },
  { id: "amikacin", name: "Amicacina", page: 15 },
  { id: "vancomycin", name: "Vancomicina", page: 30 },
  { id: "cefotaxime", name: "Cefotaxima", page: 18 },
  { id: "meropenem", name: "Meropenem", page: 22 },
  { id: "piperacillin_tazobactam", name: "Piperacilina-Tazobactam", page: 25 },
];

/**
 * Obtém a página correta para um antibiótico específico
 * @param id ID do antibiótico
 * @returns Número da página no PDF
 */
export const getPageForAntibiotic = (id: string): number => {
  const antibiotic = antibioticPages.find(a => a.id === id);
  return antibiotic ? antibiotic.page : 1; // Retorna página 1 se não encontrar
};

/**
 * Obtém a página correta para um antibiótico pelo nome
 * @param name Nome do antibiótico
 * @returns Número da página no PDF
 */
export const getPageForAntibioticByName = (name: string): number => {
  const antibiotic = antibioticPages.find(a => a.name === name);
  return antibiotic ? antibiotic.page : 1; // Retorna página 1 se não encontrar
};

/**
 * Verifica se os dados dos antibióticos estão sincronizados com a tabela de referência
 * @param antibioticData Dados dos antibióticos do arquivo antibiotics.ts
 * @returns Booleano indicando se os dados estão sincronizados
 */
export const validateAntibioticPages = (antibioticData: any[]): boolean => {
  let isValid = true;
  
  antibioticData.forEach(antibiotic => {
    const refPage = getPageForAntibiotic(antibiotic.id);
    if (antibiotic.neofaxPage !== refPage) {
      console.warn(`Página incorreta para ${antibiotic.name}: ${antibiotic.neofaxPage} (deveria ser ${refPage})`);
      isValid = false;
    }
  });
  
  return isValid;
};

export default {
  antibioticPages,
  getPageForAntibiotic,
  getPageForAntibioticByName,
  validateAntibioticPages
}; 