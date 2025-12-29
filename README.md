
# 🌍 WanderLust — Hotel Booking Website

Project link :- https://wanderlust-7u32.onrender.com/listings

WanderLust is a full-stack hotel booking web application that allows users to explore hotel listings, view them on an interactive map, add their own listings, leave reviews, and securely book stays.
Built with **Node.js**, **Express**, **MongoDB**, and **MapTiler**, WanderLust focuses on delivering a seamless travel-booking experience with a clean UI and powerful features.

---
# 💻 Tech Stack:
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)  ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
## 🚀 Features

### 🔐 **User Authentication**

* Secure signup, login, and logout
* Password hashing
* Session-based authentication

### 🏨 **Hotel Listings**

* Add new hotel listings with images
* Edit or delete your listings
* Image hosting powered by **Cloudinary**

### 📸 **Image Uploads**

* Supports Cloudinary image uploads
* Stores URLs in MongoDB

### ⭐ **Reviews & Ratings**

* Users can leave reviews and star ratings
* Edit/delete reviews
* Prevents duplicate reviews by the same user

### 📍 **Map Integration**

* Interactive map using **MapTiler API**
* Shows hotel coordinates on map
* Improves user experience for location-based discovery

### 💸 **Booking Functionality**

* Users can book hotels
* Booking records linked to user accounts
* Prevents double-booking behavior

### 🔎 **Search & Filters**

* Search hotels by name, city, price, etc.
* Filter based on rating, location, or price

### 💻 **Responsive UI**

* Clean layout made with **Vanilla CSS + Bootstrap**
* Fully responsive on all devices

---

## 🛠️ Tech Stack

### **Frontend**

* HTML5
* CSS / Vanilla CSS
* Bootstrap
* JavaScript

### **Backend**

* Node.js
* Express.js

### **Database**

* MongoDB Atlas

### **Third-Party Services**

* **Cloudinary** → Image Hosting
* **MapTiler API** → Map Integration

---

## 📦 Installation & Setup

Follow these steps to run WanderLust locally:

### **1. Clone the repository**

```bash
git clone <repository-url>
cd WanderLust
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Create a `.env` file**

Add the following keys:

```
MAP_API=your_maptiler_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
MONGO_URL=your_mongodb_atlas_connection_string
```

### **4. Run the project**

```bash
nodemon app.js
```

Your app will now run on:

```
http://localhost:8080/   (or your configured port)
```

---

## 🗄️ Database

WanderLust uses **MongoDB Atlas**, a cloud-hosted database solution.
Collections include:

* `users`
* `listings`
* `reviews`
* `bookings`

Indexes are used for optimized searches and queries.

---

## 🌐 Deployment

WanderLust is deployed on **Render** for production-ready hosting.

---

## 📁 Folder Structure

*(You said not to include it, so omitted. Let me know if you want it!)*

---

## 📝 Environment Variables

| Variable                | Description                  |
| ----------------------- | ---------------------------- |
| `MAP_API`               | MapTiler API Key             |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name        |
| `CLOUDINARY_KEY`        | Cloudinary API Key           |
| `MONGO_URL`             | MongoDB Atlas Connection URI |

---

## 🤝 Contributing

Feel free to fork the project and open pull requests.

---

## 🙌 Acknowledgments

* **MapTiler** for map services
* **Cloudinary** for image storage
* **MongoDB Atlas** for database hosting

