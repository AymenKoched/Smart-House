export function handle_error(err) {
  const errors = [];
  //console.log(err.message);

  if (err.message.includes('Violation of UNIQUE KEY constraint')) {
    if (err.message.includes('UQ_af84a20403d1e4ea8512c2fbe82')) {
      errors.push('Nom must be unique');
    }
  }
  //console.log(errors);
  return errors;
}
