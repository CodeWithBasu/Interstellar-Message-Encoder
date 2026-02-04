# 🌌 Interstellar Message Encoder

![Interstellar Encoder Banner](public/morse-logo.png)

> **"Encode human language into universal cosmic signals."**

The **Interstellar Message Encoder** is a futuristic, research-inspired web application designed to convert human messages into universal communication formats suitable for extraterrestrial intelligence (ETI). Drawing inspiration from the Voyager Golden Record, SETI research, and mathematical elegance, this project bridges the gap between language, physics, and code.

---

## 🚀 About The Project

Communication with an alien civilization requires a language that transcends culture and biology. This project assumes that **mathematics and physics** are the only true universal languages.

The application allows users to input text messages and visualizes them as:

1.  **Binary Streams**: The fundamental language of computing and logic.
2.  **Morse Code**: A time-based rhythmic communication protocol.
3.  **Waveforms**: Visual representation of signal frequency and amplitude.
4.  **Audio Pulses**: Auditory transmission using basic sine waves.

It features a high-fidelity **Sci-Fi UI** with glassmorphism, neon aesthetics, and CRT-style flickering effects to simulate a deep-space transmission console.

---

## 🎯 Purpose and Motivation

- **Scientific Exploration**: To demonstrate how complex information can be broken down into simple, universal pulses.
- **Educational Tool**: To help users visualize concepts like binary encoding, signal processing, and data visualization.
- **Frontend Mastery**: A showcase of advanced React patterns, custom hooks, Canvas API animations, and Web Audio API integration without relying on heavy external libraries.

---

## ✨ Key Features

- **⌨️ Terminal-Style Input**: A responsive text input field that parses messages in real-time.
- **🔢 Multi-Layer Encoding**:
  - **Binary**: Converts text to 8-bit binary strings (ASCII/UTF-8).
  - **Morse**: Standard International Morse Code translation.
- **🌊 Dynamic Waveform Visualization**: Real-time rendering of signal pulses using HTML5 Canvas for a smooth, organic oscilloscope effect.
- **🔊 Audio Transmission**: Playback functionality that uses the **Web Audio API** to generate accurate sine-wave beeps for dots and dashes.
- **🎨 Immersive UI/UX**:
  - **Flickering Grid Background**: A custom-built canvas animation that creates a "Matrix" or "Radar" aesthetic.
  - **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices (masking adjusts dynamically).
  - **Interactive Elements**: Hover effects, glass panels, and glow animations.

---

## 🛠️ Technology Stack

This project is built using a modern, type-safe, and performance-oriented stack:

- **Frontend Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode enabled)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Alpha/Beta features utilized for optimization)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **APIs**:
  - **Web Audio API** (for signal generation)
  - **Canvas API** (for grid and waveform rendering)
  - **Clipboard API** (for copying features)

---

## 📐 Data Workflow & How It Works

1.  **Input Parsing**: The user enters a string (e.g., "Hello Mars").
2.  **Normalization**: Text is sanitized (trimmed, upper-cased) to ensure standardization.
3.  **Encoding Engine** (`src/hooks/useEncoder.ts`):
    - **Text → Binary**: Each character is converted to its ASCII decimal value, then to an 8-bit binary representation.
    - **Text → Morse**: Sentences are mapped to Morse sequences (dots `.` and dashes `-`).
    - **Morse → Pulse**: Morse strings are parsed into numeric data for the waveform visualizer (High for signal, Low for silence).
4.  **Rendering**:
    - Binary and Morse strings are displayed in the UI.
    - The waveform component reads the pulse data and draws curves on the HTML Canvas.
5.  **Audio Output**: The `PlayMorse` component triggers the Oscillator nodes to produce sound based on the timeline.

---

## 📂 Project Structure

The project follows a clean, modular architecture:

```
src/
 ├── 📁 components/           # UI Components
 │   ├── 📁 encoder/          # logic-heavy components (Waveform, Inputs)
 │   │   ├── BinaryOutput.tsx
 │   │   ├── MessageInput.tsx
 │   │   ├── MorseOutput.tsx
 │   │   ├── PlayMorse.tsx
 │   │   └── Waveform.tsx
 │   └── 📁 ui/               # Reusable presentational components
 │       ├── flickering-grid.tsx
 │       └── shimmer-button.tsx
 ├── 📁 hooks/                # Custom React Hooks
 │   ├── useEncoder.ts        # Central logic for message conversion
 │   └── useIsMobile.ts       # Responsive layout detection
 ├── 📁 lib/                  # Utility libraries (clsx, tailwind-merge)
 ├── 📁 utils/                # Pure helper functions
 │   ├── audioGenerator.ts    # Web Audio API logic
 │   ├── binaryEncoder.ts     # Binary conversion algorithms
 │   └── morseEncoder.ts      # Dictionary and parsing logic
 ├── App.tsx                  # Main Layout & Orchestration
 └── main.tsx                 # Entry Point
```

---

## ⚡ Installation & Usage

Follow these steps to run the project locally:

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/CodeWithBasu/Interstellar-Message-Encoder.git
    cd Interstellar-Message-Encoder
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

4.  **Open in browser**:
    Navigate to `http://localhost:5173` to see the app in action.

---

## 🤝 Acknowledgements

- **NASA & The Voyager Program**: For inspiring humanity to think beyond our skies.
- **SETI Institute**: For the continuous search for extraterrestrial intelligence.
- **Open Source Community**: For the tools and libraries that made this possible.

---

## 📬 Contact

Created with ❤️ by **Basudev Moharana**.

- **GitHub**: [CodeWithBasu](https://github.com/CodeWithBasu)
- **LinkedIn**: [Basudev Moharana](https://www.linkedin.com/in/basudev-moharana)
- **Instagram**: [@wandersoul**\_\_\_\_**](https://www.instagram.com/wandersoul________?igsh=MTR2dDJua2NpeHI5Yw==)

---

_© 2026 Basudev. System v3.1 • Signal Ready._
