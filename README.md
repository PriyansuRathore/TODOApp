# 📝 TaskFlow - Personal Productivity App

> Turn chaos into clarity, one task at a time ✨

A modern, feature-rich todo application with age verification, priority management, and advanced productivity features.

## 🚀 Live Demo

[View Live Demo](https://priyansuRathore.github.io/TODOApp/)

## ✨ Features

### Core Functionality
- ✅ **Age Verification** - Secure login with age validation (10+ years)
- ✅ **Task Management** - Create, edit, delete, and organize tasks
- ✅ **Stage Transitions** - Todo → Completed → Archived workflow
- ✅ **Priority Levels** - High 🔴, Medium 🟡, Low 🟢 priority tasks
- ✅ **Search & Filter** - Real-time search and priority-based filtering

### Advanced Features
- 🎨 **Dark/Light Theme** - Toggle between themes
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⌨️ **Keyboard Shortcuts** - Power user productivity shortcuts
- 📊 **Data Export/Import** - Backup and restore your tasks
- 🎉 **Confetti Animation** - Celebrate completed tasks
- 🌅 **Personalized Greetings** - Time-based welcome messages

### Technical Features
- 💾 **Local Storage** - Data persists across browser sessions
- 🔄 **API Integration** - Loads dummy tasks from DummyJSON API
- ⚡ **Smooth Animations** - Polished UI with fade-in effects
- 🎯 **Error Handling** - Robust error management

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Modern CSS with Glassmorphism effects
- **Fonts**: Inter (Google Fonts)
- **API**: DummyJSON for initial task data
- **Storage**: Browser LocalStorage
- **Icons**: Emoji-based icons

## 📁 Project Structure

```
TODOApp/
├── index.html          # Login/Registration page
├── app.html           # Main todo application
├── css/
│   └── style.css      # Complete styling
├── js/
│   ├── index.js       # Login page logic
│   └── app.js         # Main app functionality
└── README.md          # Project documentation
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/PriyansuRathore/TODOApp.git
   cd TODOApp
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server like Live Server in VS Code

3. **Start using TaskFlow**
   - Enter your name and date of birth (must be 10+ years old)
   - Click "Start Organizing 🚀"
   - Begin managing your tasks!

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Add new task |
| `Ctrl + 1/2/3` | Switch between Todo/Completed/Archived |
| `Ctrl + F` | Focus search box |
| `Ctrl + N` | Focus new task input |
| `Ctrl + E` | Export data |
| `Ctrl + I` | Import data |
| `Ctrl + ?` | Show shortcuts help |

## 🔧 Features in Detail

### Age Verification System
- Validates user age must be over 10 years
- Secure form validation with error handling
- Persistent user session management

### Task Priority System
- Visual priority indicators with colored borders
- Auto-sorting by priority (High → Medium → Low)
- Priority-based filtering options

### Data Management
- Export tasks as JSON with timestamp
- Import tasks from JSON files
- Automatic backup to localStorage

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Touch-friendly interface

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for providing dummy task data
- [Google Fonts](https://fonts.google.com/) for the Inter font family
- [Canvas Confetti](https://github.com/catdad/canvas-confetti) for celebration animations

---

⭐ **Star this repository if you found it helpful!**