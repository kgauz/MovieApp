#  Movie App

A modern, full-featured movie and TV browsing application built with **React Native (Expo)**. 
The app allows users to explore trending content, search movies and series, view detailed information, and manage saved content with authentication.

---

## Overview

This project demonstrates a **production-ready mobile application** with:

- API integration (TMDB)
- Authentication (JWT)
- Backend communication
- Local storage (AsyncStorage)
- Responsive UI (mobile, tablet, desktop)
- Smooth animations and modern UX

---

##  Features

---

### Home Screen

- Featured movie hero section
-  Multiple horizontal sections:
- Trending Movies (This Week)
- Trending TV Series
- Popular Movies & Series
- Top Rated Movies & Series
- Upcoming Movies
- On-Air TV Series
-  Recently Played (stored locally)
- Hover animations (desktop support)

---

###  Search Screen

- Real-time movie search
- Smart suggestions dropdown
- Debounced API calls (performance optimized)
- Trending movies shown when search is empty
- Responsive grid layout

---

###  Movie Details Screen

- Supports both **Movies & TV Shows**
- Displays:
  - Title, genres, release date
  - Runtime and ratings
  - Overview and tagline

#### TV Features
- Season selector (horizontal scroll)
- Episode list per season
- Episode navigation

---

###  Playback System

- Play movies and TV episodes
- Passes correct parameters:
- Movie ID
- TV season & episode
- Automatically stores **Recently Played**

---

### Saved Movies (Enhanced UX)

- Save movies via backend API
- Bookmark toggle (save / unsave)
- Requires authentication (JWT)
- Fetch saved movies securely

####  UX Improvements
- Loading indicator while fetching data
- Pull-to-refresh support
- Empty state (no saved movies)
- Login prompt when user is not authenticated
- Smooth conditional rendering (no UI flicker)

---

###  Recently Played

- Stored using AsyncStorage
- Prevents duplicates
- Keeps only latest 10 items
- Integrated with Home screen

---

###  Profile Screen

- Dynamic menu based on login state
- Options include:
- Account (logged-in users)
- Login / Logout
- Privacy Policy
- Terms of Service
- Contact Us
- FAQs
- Logout confirmation modal
- Secure session handling

---

###  Authentication

- JWT-based login system
- Token stored in AsyncStorage
- Protected features (Saved Movies, Account)

---

###  UI / UX

-  Gradient-based design
-  Fully responsive layout:
- Mobile
- Tablet
- Desktop
-  Smooth animations:
- Hover effects
- Scaling transitions
- Netflix-style interface

---

##  Tech Stack

- **React Native (Expo)**
- **TypeScript / JavaScript**
- **Expo Router** (navigation)
- **TMDB API**
- **AsyncStorage**
- **Custom Backend API**
- **Animated API**

---

##  API Integration

###  TMDB API
Used for:
- Movies & TV data
- Trending content
- Seasons & episodes

###  Backend API
```bash
https://movieapp-acny.onrender.com/save-movie

AUTHOR: Kgaugelo matshela
