import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Validador customizado para garantir que os campos de senha e confirmação coincidam.
 * Ele deve ser aplicado no nível do FormGroup (no objeto de validação de FormBuilder.group).
 * @param senhaName O nome do campo principal da senha (ex: 'senha' ou 'novaSenha').
 * @param confirmName O nome do campo de confirmação da senha (ex: 'confirmacaoSenha').
 */
export const passwordMatchValidator = (senhaName: string, confirmName: string): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    
    // 🚨 CORREÇÃO: Usa os nomes dos campos passados como parâmetros
    const senha = control.get(senhaName);
    const confirmacaoSenha = control.get(confirmName);

    // Retorna nulo se os campos não existirem (erro de digitação) ou se o formulário for nulo.
    if (!senha || !confirmacaoSenha) {
      return null;
    }

    // Se o valor do campo de confirmação for nulo (vazio) ou intocado, não valida
    // A validação de required já é feita no FormControl
    if (!confirmacaoSenha.value || confirmacaoSenha.pristine) {
      return null;
    }
    
    // Verifica se a senhas são diferentes
    if (senha.value !== confirmacaoSenha.value) {
      // Define o erro 'senhasDiferentes' no FormControl para o feedback visual
      confirmacaoSenha.setErrors({ ...confirmacaoSenha.errors, senhasDiferentes: true });
      
      // Retorna o erro no nível do FormGroup (opcional, mas recomendado)
      return { 'senhasDiferentes': true };
    } 
    
    // Se forem iguais, garante que o erro customizado seja removido
    if (confirmacaoSenha.hasError('senhasDiferentes')) {
      const errors = { ...confirmacaoSenha.errors };
      delete errors['senhasDiferentes'];
      // Define os erros restantes ou null
      confirmacaoSenha.setErrors(Object.keys(errors).length > 0 ? errors : null);
    }
    
    return null; // A validação é bem-sucedida
  };
};
