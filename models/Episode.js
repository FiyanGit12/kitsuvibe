// models/Episode.js
// INHERITANCE dari BaseModel
// ENCAPSULATION dengan private fields

const BaseModel = require('./BaseModel');

class Episode extends BaseModel {
  // ENCAPSULATION - Private fields
  #animeId;
  #episodeNumber;
  #title;
  #videoUrl;
  #thumbnail;

  constructor(id, animeId, episodeNumber, title, videoUrl, thumbnail = null) {
    super(id); // INHERITANCE - call parent constructor
    this.#animeId = animeId;
    this.#episodeNumber = episodeNumber;
    this.#title = title;
    this.#videoUrl = videoUrl;
    this.#thumbnail = thumbnail;
  }

  // Getter methods - ENCAPSULATION
  getAnimeId() {
    return this.#animeId;
  }

  getEpisodeNumber() {
    return this.#episodeNumber;
  }

  getTitle() {
    return this.#title;
  }

  getVideoUrl() {
    return this.#videoUrl;
  }

  getThumbnail() {
    return this.#thumbnail;
  }

  // Setter methods dengan validation
  setTitle(title) {
    if (!title || title.trim() === '') {
      throw new Error("Episode title cannot be empty");
    }
    this.#title = title;
  }

  setVideoUrl(url) {
    if (!url || url.trim() === '') {
      throw new Error("Video URL cannot be empty");
    }
    this.#videoUrl = url;
  }

  setThumbnail(thumbnail) {
    this.#thumbnail = thumbnail;
  }

  // POLYMORPHISM - OVERRIDE validate from BaseModel
  validate() {
    try {
      if (!this.#animeId || this.#animeId <= 0) {
        throw new Error("Valid Anime ID is required");
      }
      if (!this.#episodeNumber || this.#episodeNumber <= 0) {
        throw new Error("Valid episode number is required");
      }
      if (!this.#title || this.#title.trim() === '') {
        throw new Error("Episode title is required");
      }
      if (!this.#videoUrl || this.#videoUrl.trim() === '') {
        throw new Error("Video URL is required");
      }
      return true;
    } catch (error) {
      console.error(`[Episode.validate] Validation failed: ${error.message}`);
      throw error;
    }
  }

  // POLYMORPHISM - OVERRIDE toJSON from BaseModel
  toJSON() {
    return {
      id: this.getId(),
      animeId: this.#animeId,
      episodeNumber: this.#episodeNumber,
      title: this.#title,
      videoUrl: this.#videoUrl,
      thumbnail: this.#thumbnail,
      createdAt: this.getCreatedAt()
    };
  }

  // Static factory method
  static fromDatabase(dbRow) {
    try {
      if (!dbRow) {
        throw new Error("Database row is null or undefined");
      }

      return new Episode(
        dbRow.id,
        dbRow.anime_id,
        dbRow.episode_number,
        dbRow.title,
        dbRow.video_url,
        dbRow.thumbnail
      );
    } catch (error) {
      console.error(`[Episode.fromDatabase] Error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = Episode;