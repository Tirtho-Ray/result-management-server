// Helper Function to Calculate Grade Point
export const calculateGradePoint = (obtainedMarks: number, totalMarks: number): number => {
    const percentage = (obtainedMarks / totalMarks) * 100;
  
    if (percentage >= 80) return 4.0; // A+
    if (percentage >= 75) return 3.75; // A
    if (percentage >= 70) return 3.5; // A-
    if (percentage >= 65) return 3.25; // B+
    if (percentage >= 60) return 3.0; // B
    if (percentage >= 50) return 2.5; // C
    if (percentage >= 40) return 2.0; // D
    return 0.0; // F
  };
