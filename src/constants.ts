import { Project, ComplexityLevel } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    category: 'Software',
    title: "Biometric Fraud Detection System",
    tags: ["Python", "Machine Learning", "Pattern Recognition"],
    description: "An AI system that distinguishes between genuine and forged signatures with high accuracy using deep convolutional neural networks.",
    complexity: ComplexityLevel.HIGH,
    complexityScore: 85,
    image: "https://picsum.photos/id/532/600/400" 
  },
  {
    id: 2,
    category: 'Robotics',
    title: "BAZTEK: Autonomous Environmental Rover",
    tags: ["YOLOv8", "Raspberry Pi", "Lidar", "Python/C++"],
    description: "A smart beach-cleaning robot using Computer Vision to identify waste and Lidar for real-time obstacle avoidance and path planning.",
    complexity: ComplexityLevel.MAXIMUM,
    complexityScore: 98,
    image: "https://picsum.photos/id/250/600/400"
  },
  {
    id: 3,
    category: 'Hardware',
    title: "Discrete Logic ALU Prototype",
    tags: ["Transistors", "Circuit Design", "Low-Level Logic"],
    description: "A 3-bit binary multiplier built entirely from discrete transistors, demonstrating fundamental computation without microcontrollers.",
    complexity: ComplexityLevel.HIGH,
    complexityScore: 90,
    image: "https://picsum.photos/id/134/600/400"
  },
  {
    id: 4,
    category: 'Mobile',
    title: "BlueChat: Off-Grid Mesh",
    tags: ["Android", "Bluetooth", "Java/Kotlin"],
    description: "Enables secure communication in areas without internet/cellular coverage via Bluetooth Low Energy (BLE) bridging protocols.",
    complexity: ComplexityLevel.MEDIUM,
    complexityScore: 60,
    image: "https://picsum.photos/id/3/600/400"
  },
  {
    id: 5,
    category: 'Robotics',
    title: "Custom Bipedal Humanoid",
    tags: ["C++", "AutoCAD", "3D Printing", "Arduino"],
    description: "End-to-end robot design: from CAD modeling and laser cutting custom chassis parts to writing C++ inverse kinematics for gait programming.",
    complexity: ComplexityLevel.MAXIMUM,
    complexityScore: 95,
    image: "https://picsum.photos/id/881/600/400"
  }
];

export const NAV_LINKS = [
  { name: '01. Projects', href: '#projects' },
  { name: '02. About', href: '#about' },
  { name: '03. Contact', href: '#contact' },
];