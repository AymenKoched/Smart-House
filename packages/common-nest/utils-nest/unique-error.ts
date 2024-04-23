export function handleError(err): string[] {
  const errors = [];
  console.log(err.message);

  if (err.message.includes('Cannot insert duplicate key row in object')) {
    // etage
    if (err.message.includes('IDX_d7519e3baab32b1149f41217e9')) {
      errors.push('this etage already exist');
    }

    // carte
    if (err.message.includes('IDX_8355c21fd76a6551c1340b3462')) {
      errors.push('this carte name already exist');
    }
    if (err.message.includes('IDX_840dd59c79b92c1d86ff05c9f7')) {
      errors.push('this adresse IP  already exist');
    }

    // connected elements
    if (err.message.includes('IDX_e3df33e595fa9d874c1a7ddc34')) {
      errors.push('this pin already exist in connected element');
    }

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
