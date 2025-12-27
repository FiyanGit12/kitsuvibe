// routes/anime.js
// Updated untuk pakai OOP models

const express = require("express");
const router = express.Router();
const db = require("../db");
const Anime = require("../models/Anime");
const Episode = require("../models/Episode");

// ==================== GET ALL ANIME ====================
router.get("/", (req, res) => {
  const sql = "SELECT * FROM anime ORDER BY id DESC";
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error("GET ANIME ERROR:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch anime",
        error: err.message 
      });
    }

    try {
      // Pakai OOP model untuk convert database result
      const animes = result.map(row => {
        const anime = Anime.fromDatabase(row);
        return anime.toJSON();
      });
      
      res.json(animes);
    } catch (error) {
      console.error("Error processing anime data:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error processing anime data",
        error: error.message 
      });
    }
  });
});

// ==================== GET ANIME BY ID ====================
router.get("/:id", (req, res) => {
  const animeId = req.params.id;
  const sql = "SELECT * FROM anime WHERE id = ?";
  
  db.query(sql, [animeId], (err, result) => {
    if (err) {
      console.error("GET ANIME BY ID ERROR:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch anime",
        error: err.message 
      });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Anime not found" 
      });
    }
    
    try {
      // Pakai OOP model
      const anime = Anime.fromDatabase(result[0]);
      res.json(anime.toJSON());
    } catch (error) {
      console.error("Error processing anime:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error processing anime data",
        error: error.message 
      });
    }
  });
});

// ==================== GET EPISODES BY ANIME ID ====================
router.get("/:id/episodes", (req, res) => {
  const animeId = req.params.id;
  const sql = "SELECT * FROM episodes WHERE anime_id = ? ORDER BY episode_number ASC";
  
  db.query(sql, [animeId], (err, result) => {
    if (err) {
      console.error("GET EPISODES ERROR:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch episodes",
        error: err.message 
      });
    }

    try {
      // Pakai OOP model untuk episodes
      const episodes = result.map(row => {
        const episode = Episode.fromDatabase(row);
        return episode.toJSON();
      });
      
      res.json(episodes);
    } catch (error) {
      console.error("Error processing episodes:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error processing episode data",
        error: error.message 
      });
    }
  });
});

// ==================== GET SINGLE EPISODE ====================
router.get("/:animeId/episode/:episodeId", (req, res) => {
  const { animeId, episodeId } = req.params;
  
  const sql = `
    SELECT 
      e.*,
      a.title as anime_title,
      a.thumbnail as anime_thumbnail
    FROM episodes e
    JOIN anime a ON e.anime_id = a.id
    WHERE e.anime_id = ? AND e.id = ?
  `;
  
  db.query(sql, [animeId, episodeId], (err, result) => {
    if (err) {
      console.error("GET EPISODE ERROR:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch episode",
        error: err.message 
      });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Episode not found" 
      });
    }
    
    try {
      // Pakai OOP model
      const episode = Episode.fromDatabase(result[0]);
      const episodeData = episode.toJSON();
      
      // Tambahkan anime info
      episodeData.animeTitle = result[0].anime_title;
      episodeData.animeThumbnail = result[0].anime_thumbnail;
      
      res.json(episodeData);
    } catch (error) {
      console.error("Error processing episode:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error processing episode data",
        error: error.message 
      });
    }
  });
});

module.exports = router;