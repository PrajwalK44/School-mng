const express = require("express");
const router = express.Router();
const pool = require("../config/db");

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (deg) => deg * (Math.PI / 180);
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat1)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

router.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO schools (
    name,
    address,
    latitude,
    longitude
    ) VALUES (
    '${name}',
    '${address}',
    '${latitude}',
    '${longitude}' 
    );
    `;

  pool.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  });
});

router.get("/listSchools", (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and Longitude required" });
  }

  const studentLat = parseFloat(latitude);
  const studentLon = parseFloat(longitude);

  const query = `SELECT * FROM schools`;
  pool.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const schoolsWithDistance = results.map((school) => ({
      ...school,
      distance: calculateDistance(
        studentLat,
        studentLon,
        school.latitude,
        school.longitude
      ),
    }));

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  });
});

module.exports = router;
