const express = require("express");
const router = express.Router();

/**
 * GET /split?title=...
 * Used by frontend when calling: GET /api/ai/split?title=...
 */
router.get("/split", (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const text = title.toLowerCase();
  let subtasks = [];

  if (text.includes("blog")) {
    subtasks = [
      "Choose topic",
      "Research about topic",
      "Write outline",
      "Write draft",
      "Add images",
      "Proofread",
      "Publish",
    ];
  } else if (text.includes("portfolio")) {
    subtasks = [
      "Choose color theme",
      "Design layout",
      "Create homepage",
      "Add projects section",
      "Add contact form",
      "Test responsiveness",
      "Deploy website",
    ];
  } else {
    subtasks = [
      "Break the task into 3–5 small steps",
      "Write steps clearly",
      "Start with the simplest step",
      "Review progress",
    ];
  }

  return res.json({ subtasks });
});

/**
 * POST /suggest
 * Backwards-compatible: if something posts to /api/ai/suggest with JSON body { title }
 * this will also respond with the same subtasks format.
 */
router.post("/suggest", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  // Reuse same logic as above
  const text = title.toLowerCase();
  let subtasks = [];

  if (text.includes("blog")) {
    subtasks = [
      "Choose topic",
      "Research about topic",
      "Write outline",
      "Write draft",
      "Add images",
      "Proofread",
      "Publish",
    ];
  } else if (text.includes("portfolio")) {
    subtasks = [
      "Choose color theme",
      "Design layout",
      "Create homepage",
      "Add projects section",
      "Add contact form",
      "Test responsiveness",
      "Deploy website",
    ];
  } else {
    subtasks = [
      "Break the task into 3–5 small steps",
      "Write steps clearly",
      "Start with the simplest step",
      "Review progress",
    ];
  }

  return res.json({ subtasks });
});

module.exports = router;
