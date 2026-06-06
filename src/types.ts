export enum ComplexityLevel {
  MEDIUM = "Medium",
  HIGH = "High",
  MAXIMUM = "Maximum"
}

export interface Project {
  id: number;
  title: string;
  category: 'Software' | 'Robotics' | 'Hardware' | 'Mobile';
  tags: string[];
  description: string;
  complexity: ComplexityLevel;
  complexityScore: number; // 0 to 100 for the bar
  image: string;
}
