# 📚 Quiz App (OpenTDB API Integration)

A dynamic and interactive Quiz App built using **HTML, CSS, and JavaScript**, integrating the **Open Trivia Database (OpenTDB) API**. Users can choose the number of questions, category, difficulty level, and a time limit before starting the quiz. At the end, they can view their total score and restart as needed.

---

## 🚀 Features

- 🎯 **Customizable Quiz Settings** – Users can select:
  - Number of questions
  - Category
  - Difficulty level
  - Time limit per question
- 🔄 **Randomized Questions & Answers** – Ensuring a fresh quiz experience every time.
- ⏳ **Timer for Each Question** – Users must answer within a set time limit.
- ✅ **Score Calculation** – View total score at the end of the quiz.
- 🔄 **Restart Option** – Restart the quiz anytime with new settings.
- 🌐 **API Integration** – Fetches real-time questions from OpenTDB API.

---

## 📸 Screenshots

![Quiz App Screenshot](https://github.com/user-attachments/assets/ffc111c4-832b-4827-8d5e-dfb24509e394)


---

## 🛠️ Technologies Used

- **HTML5** – Structure of the app
- **CSS3** – Styling and layout
- **JavaScript (ES6+)** – Functionality and logic
- **OpenTDB API** – Fetching trivia questions

---

## 🎮 How to Run the Project

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/quiz-app-opentdb.git
   ```
2. Navigate to the project folder:
   ```sh
   cd quiz-app-opentdb
   ```
3. Open `index.html` in your browser or use Live Server (VS Code extension).

---

## 🔧 API Integration (OpenTDB)

This app fetches trivia questions from **Open Trivia Database (OpenTDB)**:
```js
const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
```
- `amount` → Number of questions
- `category` → Quiz category
- `difficulty` → Difficulty level (easy, medium, hard)
- `type=multiple` → Multiple-choice format

---

## 📌 Future Enhancements

- 🔥 **Leaderboard System** – Track user scores globally.
- 🎨 **Dark Mode** – Add a theme switcher.
- 🏆 **Rewards & Badges** – Gamification to enhance engagement.
- 🎵 **Sound Effects** – Add interactive sounds for a better experience.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Contributions are always welcome! If you’d like to contribute:
1. Fork the repo
2. Create a new branch (`feature-branch`)
3. Commit your changes
4. Push to your fork and submit a Pull Request

---

## 📩 Contact

👤 **Your Name**  
📧 Email: prajatech355@gmail.com
🔗 GitHub: [yourgithub](https://github.com/Praveenkr398)  

---

🌟 **If you like this project, don't forget to star the repository!** ⭐

