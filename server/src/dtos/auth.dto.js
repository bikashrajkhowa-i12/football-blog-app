class UserBase {
  constructor(email) {
    this.email = email;
    this.username = this.generateUsername(email);
  }

  generateUsername(email) {
    const prefix = email.split("@")[0];
    const uniqueSuffix = Math.random().toString(36).substring(2, 8);
    return `${prefix.toLowerCase()}_${uniqueSuffix}`;
  }
}

class Signup extends UserBase {
  constructor({ email, password }) {
    super(email.trim().toLowerCase());
    this.password = password;
    this.role = "user";
    this.status = "active";
  }
}

class GoogleAuth extends UserBase {
  constructor({ name, email, picture, sub }) {
    super(email);
    this.avatar_url = picture;
    this.name = name;
    this.provider = "google";
    this.provider_id = sub;
    this.role = "user";
  }
}

module.exports = { Signup, GoogleAuth };
