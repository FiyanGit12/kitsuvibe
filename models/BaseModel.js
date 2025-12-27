// models/BaseModel.js
// ABSTRACTION - Base class untuk semua model

class BaseModel {
  // ENCAPSULATION - private properties dengan #
  #id;
  #createdAt;

  constructor(id) {
    // Prevent instantiation of abstract class
    if (this.constructor === BaseModel) {
      throw new Error("Cannot instantiate abstract class BaseModel directly");
    }
    this.#id = id;
    this.#createdAt = new Date();
  }

  // Getter untuk encapsulation
  getId() {
    return this.#id;
  }

  getCreatedAt() {
    return this.#createdAt;
  }

  // Abstract method - harus di-override oleh subclass
  validate() {
    throw new Error("Method 'validate()' must be implemented in subclass");
  }

  // Abstract method
  toJSON() {
    throw new Error("Method 'toJSON()' must be implemented in subclass");
  }
}

module.exports = BaseModel;