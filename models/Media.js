// models/Media.js
// INHERITANCE - Parent class untuk Anime dan Media content lainnya

const BaseModel = require('./BaseModel');

class Media extends BaseModel {
  // ENCAPSULATION - protected properties dengan _
  _title;
  _description;
  _thumbnail;
  _genre;

  constructor(id, title, description, thumbnail, genre) {
    super(id); // Call parent constructor (INHERITANCE)
    this._title = title;
    this._description = description;
    this._thumbnail = thumbnail;
    this._genre = genre;
  }

  // Getters - ENCAPSULATION (controlled access)
  getTitle() {
    return this._title;
  }

  getDescription() {
    return this._description;
  }

  getThumbnail() {
    return this._thumbnail;
  }

  getGenre() {
    return this._genre;
  }

  // Setters dengan validation - ENCAPSULATION
  setTitle(title) {
    if (!title || title.trim() === '') {
      throw new Error("Title cannot be empty");
    }
    this._title = title;
  }

  setDescription(description) {
    this._description = description;
  }

  setThumbnail(thumbnail) {
    this._thumbnail = thumbnail;
  }

  setGenre(genre) {
    this._genre = genre;
  }

  // POLYMORPHISM - Method ini akan di-override di subclass
  getMediaType() {
    return "Media";
  }

  // OVERRIDE from BaseModel
  validate() {
    if (!this._title || this._title.trim() === '') {
      throw new Error("Title is required");
    }
    if (!this._genre || this._genre.trim() === '') {
      throw new Error("Genre is required");
    }
    return true;
  }

  // OVERRIDE from BaseModel
  toJSON() {
    return {
      id: this.getId(),
      title: this._title,
      description: this._description,
      thumbnail: this._thumbnail,
      genre: this._genre,
      mediaType: this.getMediaType(),
      createdAt: this.getCreatedAt()
    };
  }
}

module.exports = Media;