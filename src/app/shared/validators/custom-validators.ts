import { AbstractControl, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator = (senhaName: string, confirmName: string): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {

    const senha = control.get(senhaName);
    const confirmacaoSenha = control.get(confirmName);

    if (!senha || !confirmacaoSenha) {
      return null;
    }

    if (!confirmacaoSenha.value || confirmacaoSenha.pristine) {
      return null;
    }

    if (senha.value !== confirmacaoSenha.value) {
      confirmacaoSenha.setErrors({ ...confirmacaoSenha.errors, senhasDiferentes: true });
      return { senhasDiferentes: true };
    }

    if (confirmacaoSenha.hasError('senhasDiferentes')) {
      const errors = { ...confirmacaoSenha.errors };
      delete errors['senhasDiferentes'];
      confirmacaoSenha.setErrors(Object.keys(errors).length > 0 ? errors : null);
    }

    return null;
  };
};
