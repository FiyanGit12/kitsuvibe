const express = require("express");
const router = express.Router();
const db = require("../db");

// ==================== ADD ANIME ====================
router.post("/anime", (req, res) => {
  const { title, description, thumbnail } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const sql = "INSERT INTO anime (title, description, thumbnail) VALUES (?, ?, ?)";

  db.query(sql, [title, description || "", thumbnail || ""], (err, result) => {
    if (err) {
      console.error("ADD ANIME ERROR:", err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Anime added successfully",
      anime_id: result.insertId,
    });
  });
});

// ==================== ADD EPISODE ====================
router.post("/episode", (req, res) => {
  const { anime_id, title, video_url } = req.body;

  if (!anime_id || !title || !video_url) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO episodes (anime_id, title, video_url) VALUES (?, ?, ?)";

  db.query(sql, [anime_id, title, video_url], (err, result) => {
    if (err) {
      console.error("ADD EPISODE ERROR:", err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Episode added successfully",
      episode_id: result.insertId,
    });
  });
});

// ==================== GET ALL ANIME ====================
router.get("/anime", (req, res) => {
  db.query("SELECT * FROM anime ORDER BY id DESC", (err, result) => {
    if (err) {
      console.error("GET ANIME ERROR:", err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

// ==================== GET EPISODES BY ANIME ID ====================
router.get("/anime/:id/episodes", (req, res) => {
  const animeId = req.params.id;

  db.query(
    "SELECT * FROM episodes WHERE anime_id = ? ORDER BY id ASC",
    [animeId],
    (err, result) => {
      if (err) {
        console.error("GET EPISODES ERROR:", err);
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
});

// ==================== UPDATE ANIME ====================
router.put("/anime/:id", (req, res) => {
  const animeId = req.params.id;
  const { title, description, thumbnail } = req.body;

  const sql = "UPDATE anime SET title = ?, description = ?, thumbnail = ? WHERE id = ?";

  db.query(sql, [title, description, thumbnail, animeId], (err, result) => {
    if (err) {
      console.error("UPDATE ANIME ERROR:", err);
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Anime not found" });
    }

    res.json({ message: "Anime updated successfully" });
  });
});

// ==================== DELETE ANIME ====================
router.delete("/anime/:id", (req, res) => {
  const animeId = req.params.id;

  // Delete episodes first
  db.query("DELETE FROM episodes WHERE anime_id = ?", [animeId], (err) => {
    if (err) {
      console.error("DELETE EPISODES ERROR:", err);
      return res.status(500).json(err);
    }

    // Then delete anime
    db.query("DELETE FROM anime WHERE id = ?", [animeId], (err, result) => {
      if (err) {
        console.error("DELETE ANIME ERROR:", err);
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Anime not found" });
      }

      res.json({ message: "Anime deleted successfully" });
    });
  });
});

// ==================== DELETE EPISODE ====================
router.delete("/episode/:id", (req, res) => {
  const episodeId = req.params.id;

  db.query("DELETE FROM episodes WHERE id = ?", [episodeId], (err, result) => {
    if (err) {
      console.error("DELETE EPISODE ERROR:", err);
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Episode not found" });
    }

    res.json({ message: "Episode deleted successfully" });
  });
});

module.exports = router;