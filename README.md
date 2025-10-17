💬 React Chat-App

This is a chat app built with React, using Firebase for authentication, storage, and database.

✨ Features

👤 User registration with profile picture

💬 Send and receive messages in real time

➕➖ Add and remove users

🗑️ Delete chats when a user is removed

🔔 Message notifications (visual color change in chat)

🧰 Tech Stack

⚛️ React

🔥 Firebase

🎨 TailwindCSS

🧠 Zustand

🎞️ Framer Motion

⚙️ Implementations
🧠 Zustand – UserStore

A store where all the app logic is handled.
This was created for better state management.

At the beginning, I was working with more than two contexts, and they needed to communicate with each other to make the app work.
After doing some research, I found Zustand — a better place to manage and centralize logic.

It was challenging because this is my first time using Zustand, and I was also learning many new concepts from Firebase at the same time.

I tried splitting the logic into multiple stores, but it was difficult because the functions share the same data.
My idea was to have one store for everything related to users (register, profile picture, add users, etc.) and another for chats and messages.
After a few attempts, I realized the two stores would need to communicate with each other to work properly, which is not what I wanted.

I also tried my best to separate the logic and responsibilities into different stores.
It’s not the most optimal solution, but it’s what my current knowledge allows me to do.

Each message shows the time using JavaScript’s toLocaleTimeString, just showing hours and minutes.

🧠 Performance Issues & Future Improvements

Currently, the app faces some performance issues when a user is created — it takes around 7–8 seconds to load.
This delay is mainly caused by handling the profile picture. I'm actively working to fix this, but it hasn’t worked yet.

Another issue is related to message timestamps.
I'm trying to implement something similar to WhatsApp, where you can see when each message was received.
I attempted to use Firebase with timestamp: new Date().toISOString(), but that caused errors.
I also can't use serverTimestamp from Firebase because the method I'm using to load messages is updateDoc, and they don’t work well together.

🔧 Planned Features

Show message time (timestamp on each message)

Reduce loading time of the main screen
