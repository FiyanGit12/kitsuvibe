// models/User.js
// INHERITANCE dari BaseModel
// ENCAPSULATION - Password tersembunyi dengan private field

const BaseModel = require('./BaseModel');

class User extends BaseModel {
  // ENCAPSULATION - Private fields
  #username;
  #password;
  #role;

  constructor(id, username, password, role = 'user') {
    super(id); // INHERITANCE
    this.#username = username;
    this.#password = password; // Sudah dalam bentuk HASHED dari bcrypt
    this.#role = role;
  }

  // Getter methods - ENCAPSULATION
  getUsername() {
    return this.#username;
  }

  getRole() {
    return this.#role;
  }

  // Helper methods
  isAdmin() {
    return this.#role === 'admin';
  }

  isUser() {
    return this.#role === 'user';
  }

  verifyPassword(password) {
  return this.#password === password;
  }

  // Setter methods dengan validation
  setUsername(username) {
    if (!username || username.length < 3) {
      throw new Error("Username must be at least 3 characters");
    }
    this.#username = username;
  }

  setPassword(password) {
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    this.#password = password;
  }

  setRole(role) {
    if (!['admin', 'user'].includes(role)) {
      throw new Error("Role must be either 'admin' or 'user'");
    }
    this.#role = role;
  }

  // POLYMORPHISM - OVERRIDE validate from BaseModel
  validate() {
    try {
      if (!this.#username || this.#username.length < 3) {
        throw new Error("Username must be at least 3 characters");
      }
      if (!this.#password || this.#password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      if (!['admin', 'user'].includes(this.#role)) {
        throw new Error("Invalid role. Must be 'admin' or 'user'");
      }
      return true;
    } catch (error) {
      console.error(`[User.validate] Validation failed: ${error.message}`);
      throw error;
    }
  }

  // POLYMORPHISM - OVERRIDE toJSON from BaseModel
  // PENTING: Jangan expose password!
  toJSON() {
    return {
      id: this.getId(),
      username: this.#username,
      role: this.#role,
      createdAt: this.getCreatedAt()
      // #password TIDAK di-include untuk security! (ENCAPSULATION)
    };
  }

  // Static factory method
  static fromDatabase(dbRow) {
    try {
      if (!dbRow) {
        throw new Error("Database row is null or undefined");
      }

      return new User(
        dbRow.id,
        dbRow.username,
        dbRow.password, // Password dari DB sudah dalam bentuk HASHED
        dbRow.role
      );
    } catch (error) {
      console.error(`[User.fromDatabase] Error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = User;
