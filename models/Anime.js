// models/Anime.js
// INHERITANCE - Turunan dari Media
// POLYMORPHISM - Override methods dari parent

const Media = require('./Media');

class Anime extends Media {
  // ENCAPSULATION - Private fields dengan #
  #totalEpisodes;
  #banner;
  #trailerUrl;
  #episodes;

  constructor(id, title, description, thumbnail, genre, totalEpisodes = 0, banner = null, trailerUrl = null) {
    // INHERITANCE - Call parent constructor
    super(id, title, description, thumbnail, genre);
    
    this.#totalEpisodes = totalEpisodes;
    this.#banner = banner;
    this.#trailerUrl = trailerUrl;
    this.#episodes = [];
  }

  // POLYMORPHISM - OVERRIDE parent method
  getMediaType() {
    return "Anime";
  }

  // Getter methods - ENCAPSULATION
  getTotalEpisodes() {
    return this.#totalEpisodes;
  }

  getBanner() {
    return this.#banner;
  }

  getTrailerUrl() {
    return this.#trailerUrl;
  }

  getEpisodes() {
    // Return copy array untuk immutability
    return [...this.#episodes];
  }

  // Setter methods dengan validation
  setTotalEpisodes(total) {
    if (total < 0) {
      throw new Error("Total episodes cannot be negative");
    }
    this.#totalEpisodes = total;
  }

  setBanner(banner) {
    this.#banner = banner;
  }

  setTrailerUrl(url) {
    this.#trailerUrl = url;
  }

  // POLYMORPHISM - METHOD OVERLOADING (simulated)
  // Add single episode
  addEpisode(episode) {
    if (arguments.length === 1 && episode) {
      this.#episodes.push(episode);
      this.#totalEpisodes = this.#episodes.length;
    }
  }

  // Add multiple episodes at once
  addEpisodes(episodesArray) {
    if (Array.isArray(episodesArray)) {
      this.#episodes.push(...episodesArray);
      this.#totalEpisodes = this.#episodes.length;
    }
  }

  // EXCEPTION HANDLING
  findEpisodeById(episodeId) {
    try {
      const episode = this.#episodes.find(ep => ep.getId() === episodeId);
      if (!episode) {
        throw new Error(`Episode with ID ${episodeId} not found in anime "${this._title}"`);
      }
      return episode;
    } catch (error) {
      console.error(`[Anime.findEpisodeById] Error: ${error.message}`);
      throw error;
    }
  }

  findEpisodeByNumber(episodeNumber) {
    try {
      const episode = this.#episodes.find(ep => ep.getEpisodeNumber() === episodeNumber);
      if (!episode) {
        throw new Error(`Episode number ${episodeNumber} not found`);
      }
      return episode;
    } catch (error) {
      console.error(`[Anime.findEpisodeByNumber] Error: ${error.message}`);
      throw error;
    }
  }

  // POLYMORPHISM - OVERRIDE validate method
  validate() {
    try {
      // Call parent validation first (INHERITANCE)
      super.validate();
      
      // Additional validation for Anime
      if (this.#totalEpisodes < 0) {
        throw new Error("Total episodes cannot be negative");
      }
      
      return true;
    } catch (error) {
      console.error(`[Anime.validate] Validation failed: ${error.message}`);
      throw error;
    }
  }

  // POLYMORPHISM - OVERRIDE toJSON method
  toJSON() {
    return {
      ...super.toJSON(), // Call parent toJSON (INHERITANCE)
      totalEpisodes: this.#totalEpisodes,
      banner: this.#banner,
      trailerUrl: this.#trailerUrl,
      episodes: this.#episodes.map(ep => ep.toJSON())
    };
  }

  // Static factory method untuk create dari database result
  static fromDatabase(dbRow) {
    try {
      if (!dbRow) {
        throw new Error("Database row is null or undefined");
      }

      return new Anime(
        dbRow.id,
        dbRow.title,
        dbRow.description,
        dbRow.thumbnail,
        dbRow.genre,
        dbRow.total_episodes || 0,
        dbRow.banner,
        dbRow.trailer_url
      );
    } catch (error) {
      console.error(`[Anime.fromDatabase] Error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = Anime;