# 🏙️ Smart Civic Issue Reporting System (MERN + AI)

### 🚀 Overview
The **Smart Civic Issue Reporting System** is a full-stack web application that empowers citizens to report civic issues (like potholes, garbage overflow, or broken streetlights) with location and photo evidence.  
It integrates **AI-based image analysis** to automatically categorize civic problems, ensuring faster and more accurate responses from authorities.

---

## ✨ Features

### 👥 User Features
- 📸 Report issues with description, category, image & location  
- 🤖 Automatic issue detection using AI (e.g., potholes, garbage, waterlogging)  
- 📍 Real-time location tagging via Google Maps API  
- 🧾 View & track submitted reports and their status  
- 🔔 Get status updates on reported issues (Pending / In Progress / Resolved)

### 🧑‍💼 Admin Panel
- 🔎 View all reported issues from citizens  
- 🧠 AI insights for auto-categorized problems  
- 🗂️ Filter, update, and resolve issues  
- 📊 Dashboard with issue analytics and statistics  
- 🧭 Map view for location-based issue management  

---

## 🧠 AI Integration

The system integrates **CivicSense AI Model** (custom-trained using Roboflow / TensorFlow) to:
- Detect issue type from uploaded images (pothole, garbage, etc.)  
- Assign a category automatically during submission  
- Display AI confidence level and insights on the admin dashboard  

> Optional: You can integrate OpenAI or HuggingFace APIs for text-based summarization, category prediction, or chatbot assistance.

---

## 🧩 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React.js, Tailwind CSS, Axios, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | JWT (JSON Web Token), bcrypt.js |
| **AI Model** | Roboflow API / TensorFlow / OpenAI |
| **Map Integration** | Google Maps JavaScript API |
| **Storage** | Local storage for images (can be upgraded to Cloudinary / Firebase) |

---

## ⚙️ Installation & Setup

###  Clone the Repository
```bash
git clone https://github.com/Glanil21/Kartavya.git
cd Kartavya
```

### Run the Project

Once everything is set up, simply double-click the batch file to launch the project:

Test_Kartavya.bat


or run it via terminal:
```bash
./Test_Kartavya.bat
```

This will automatically start both the frontend and backend servers (if configured) and open the application in your default browser.
