# Aura Clothing Brand 👕✨

Aura is a modern, responsive, and high-converting e-commerce web application built for a premium clothing brand. It features a clean, minimalist aesthetic, dynamic shopping cart logic, and a fully functional full-stack backend architecture.

## 🚀 Features

- **Modern UI/UX**: Minimalist aesthetic with smooth hover animations and a premium feel.
- **Responsive Design**: Built with CSS Grid and Flexbox for seamless browsing on mobile, tablet, and desktop.
- **Dynamic Shopping Cart**: Slide-out cart drawer with real-time price calculations, quantity controls, and `localStorage` persistence.
- **Backend API Integration**: Products are fetched dynamically from a Node.js/Express backend.
- **Database Architecture**: Powered by MongoDB and Mongoose for robust data modeling.

## 💻 Technology Stack

### Frontend
- HTML5 & CSS3 (Vanilla, No Frameworks)
- Vanilla JavaScript for interactivity and API integration
- CSS Variables for a centralized design system

### Backend (In Progress)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose
- **Security & Config**: `dotenv`, `cors`

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ItsyaBoiJR/Aura_Clothing_Brand.git
   cd Aura_Clothing_Brand
   ```

2. **Install Backend Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   The project requires a `.env` file in the root directory. Make sure it contains:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/aura_db
   ```
   *(Note: Ensure you have a local MongoDB instance running, or replace the URI with a MongoDB Atlas cluster URI.)*

4. **Seed the Database**
   To populate the database with dummy clothing products:
   ```bash
   node seeder.js
   ```

5. **Start the Server**
   ```bash
   npm run dev
   ```

6. **View the Site**
   Open your browser and navigate to: [http://localhost:5000](http://localhost:5000)

## 📌 Project Phases

- [x] **Frontend Phase 1**: Static landing page & foundational CSS.
- [x] **Frontend Phase 2**: Product listing page, sidebar filters, and responsive product grid.
- [x] **Frontend Phase 3**: Shopping cart logic, slide-out drawer, and dynamic calculations.
- [x] **Backend Phase 1**: Node.js/Express server setup and MongoDB connection.
- [x] **Backend Phase 2**: Mongoose Product models, seeding script, and API integration.
- [ ] **Backend Phase 3**: User Authentication & Profiles (JWT).
- [ ] **Backend Phase 4**: Backend Cart Logic & Orders.
- [ ] **Backend Phase 5**: Payment Gateway Integration.

---
*Developed with modern web standards and a focus on clean, maintainable code.*