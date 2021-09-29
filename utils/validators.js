module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword,
  nama,
  jabatan,
  notlp,
  noktp,
  alamat
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username cant be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email cant be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "password cant be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "password must match";
  }
  if (nama.trim() === "") {
    errors.nama = "nama cant be empty";
  }
  if (jabatan.trim() === "") {
    errors.jabatan = "jabatan cant be empty";
  }
  if (notlp.trim() === "") {
    errors.notlp = "Nomor telepon cant be empty";
  }
  if (noktp.trim() === "") {
    errors.noktp = "Nomor KTP cant be empty";
  }
  if (alamat.trim() === "") {
    errors.alamat = "alamat cant be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username cant be empty";
  }
  if (password.trim() === "") {
    errors.password = "password cant be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCostumerInput = (nama, alamat, noktp, notlp, email) => {
  const errors = {};
  if (nama.trim() === "") {
    errors.nama = "nama tidak boleh kosong";
  }
  if (alamat.trim() === "") {
    errors.alamat = "alamat tidak boleh kosong";
  }
  if (noktp.trim() === "") {
    errors.noktp = "nomor KTP tidak boleh kosong";
  }
  if (notlp.trim() === "") {
    errors.notlp = "nomor telepon tidak boleh kosong";
  }
  if (email.trim() === "") {
    errors.email = "Email tidak boleh kosong";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "harus berupa email yang valid";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateWorkerInput = (
  nama,
  alamat,
  noktp,
  notlp,
  email,
  jabatan,
  gaji
) => {
  const errors = {};
  if (nama.trim() === "") {
    errors.nama = "nama tidak boleh kosong";
  }
  if (alamat.trim() === "") {
    errors.alamat = "alamat tidak boleh kosong";
  }
  if (noktp.trim() === "") {
    errors.noktp = "nomor KTP tidak boleh kosong";
  }
  if (notlp.trim() === "") {
    errors.notlp = "nomor telepon tidak boleh kosong";
  }
  if (email.trim() === "") {
    errors.email = "Email tidak boleh kosong";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "harus berupa email yang valid";
    }
  }
  if (jabatan.trim() === "") {
    errors.notlp = "jabatan tidak boleh kosong";
  }
  if (gaji.trim() === "") {
    errors.gaji = "gaji tidak boleh kosong";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateProjectInput = (nama, alamat, namaCostumer) => {
  const errors = {};
  if (nama.trim() === "") {
    errors.nama = "nama tidak boleh kosong";
  }
  if (alamat.trim() === "") {
    errors.alamat = "alamat tidak boleh kosong";
  }
  if (namaCostumer.trim() === "") {
    errors.namaCostumer = "alamat tidak boleh kosong";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
