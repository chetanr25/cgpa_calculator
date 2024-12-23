const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// VTU Grade Point calculation function
const calculateGradePoints = (marks) => {
  if (marks >= 90) return 10;
  if (marks >= 80) return 9;
  if (marks >= 70) return 8;
  if (marks >= 60) return 7;
  if (marks >= 50) return 6;
  if (marks >= 45) return 5;
  if (marks >= 40) return 0;
  return 0;
};

// CGPA calculation endpoint
app.post("/calculate-cgpa", (req, res) => {
  const { subjects } = req.body;

  let totalWeightedPoints = 0;
  let totalCredits = 0;

  subjects.forEach((subject) => {
    if (subject.marks !== "") {
      const gradePoint = calculateGradePoints(Number(subject.marks));
      totalWeightedPoints += gradePoint * subject.credits;
      totalCredits += subject.credits;
    }
  });

  const cgpa = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;

  res.json({ cgpa });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
