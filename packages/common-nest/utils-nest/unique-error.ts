export function handleError(err): string[] {
  const errors = [];
  console.log(err.message);

  if (err.message.includes('Violation of UNIQUE KEY constraint')) {
    if (err.message.includes('UQ_af84a20403d1e4ea8512c2fbe82')) {
      errors.push('Nom must be unique');
    }
    if (err.message.includes('UQ_56499b87ce1a64a4f0c7ef51f6c')) {
      errors.push('Adresse Ip must be unique');
    }
    if (err.message.includes('UQ_bde2621918444acfe2dda7054a0')) {
      errors.push('Nom must be unique');
    }
  }
  //console.log(errors);
  return errors;
}
