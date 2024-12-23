import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CGPACalculator.css";

function CGPACalculator() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Subject 1", credits: 4, marks: "" },
    { id: 2, name: "Subject 2", credits: 4, marks: "" },
    { id: 3, name: "Subject 3", credits: 3, marks: "" },
    { id: 4, name: "Subject 4", credits: 3, marks: "" },
    { id: 5, name: "Subject 5", credits: 3, marks: "" },
    { id: 6, name: "Subject 6", credits: 2, marks: "" },
    { id: 7, name: "Subject 7", credits: 1, marks: "" },
    { id: 8, name: "Subject 8", credits: 1, marks: "" },
  ]);
  const [cgpa, setCgpa] = useState(0);

  useEffect(() => {
    calculateCGPA();
  }, [subjects]);

  const handleMarksChange = (id, value) => {
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setSubjects(
        subjects.map((subject) =>
          subject.id === id ? { ...subject, marks: value } : subject
        )
      );
    }
  };

  const handleCreditsChange = (id, value) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === id ? { ...subject, credits: Number(value) } : subject
      )
    );
  };

  const calculateCGPA = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/calculate-cgpa",
        {
          subjects,
        }
      );
      setCgpa(response.data.cgpa.toFixed(2));
    } catch (error) {
      console.error("Error calculating CGPA:", error);
    }
  };

  return (
    <div className="container">
      <h1>CGPA Calculator</h1>
      <div className="result">
        <h2>Your CGPA: {cgpa}</h2>
      </div>
      <div className="subjects-grid">
        {subjects.map((subject) => (
          <div key={subject.id} className="subject-row">
            <input
              type="text"
              value={subject.name}
              onChange={(e) =>
                setSubjects(
                  subjects.map((s) =>
                    s.id === subject.id ? { ...s, name: e.target.value } : s
                  )
                )
              }
              placeholder="Subject Name"
            />
            <input
              type="number"
              value={subject.credits}
              onChange={(e) => handleCreditsChange(subject.id, e.target.value)}
              placeholder="Credits"
              min="1"
              max="4"
            />
            <input
              type="number"
              value={subject.marks}
              onChange={(e) => handleMarksChange(subject.id, e.target.value)}
              placeholder="Marks (0-100)"
              min="0"
              max="100"
              step="1"
              onKeyDown={(e) => {
                if (
                  !/[0-9]|\.|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(
                    e.key
                  )
                ) {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                const pastedValue = e.clipboardData.getData("text");
                if (isNaN(pastedValue) || Number(pastedValue) > 100) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CGPACalculator;
