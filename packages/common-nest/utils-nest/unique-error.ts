export function handleError(err): string[] {
  const errors = [];
  console.log(err.message);

  if (err.message.includes('Violation of UNIQUE KEY constraint')) {
    // etage
    if (err.message.includes('UQ_af84a20403d1e4ea8512c2fbe82')) {
      errors.push('Nom must be unique');
    }

    // carte
    if (err.message.includes('UQ_56499b87ce1a64a4f0c7ef51f6c')) {
      errors.push('Adresse Ip must be unique');
    }
    if (err.message.includes('UQ_bde2621918444acfe2dda7054a0')) {
      errors.push('Nom must be unique');
    }
  }

  if (err.message.includes('Cannot insert duplicate key row in object')) {
    // lampe
    if (err.message.includes('IDX_5b1ce748cfe6a159661abc8925')) {
      errors.push('this lampe exist in this carte');
    }
    if (err.message.includes('IDX_4c989136240fa7a5c43ba3e965')) {
      errors.push('this lampe exist in this etage');
    }
  }

  if (
    err.message.includes(
      'The INSERT statement conflicted with the FOREIGN KEY constraint',
    )
  ) {
    if (err.message.includes('FK_fe5f5937ef510b64f7e0030dc0b')) {
      errors.push('this carte does not exist');
    }
    if (err.message.includes('FK_f370825e85bdcd944ad2c0fbe3a')) {
      errors.push('this etage does not exist');
    }
  }

  return errors;
}
