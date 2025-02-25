# What is Redux? 🤔
Think of Redux as a big box (store) that holds all the important information (state) for your app. Instead of passing information between components directly, everything goes through this box.

# Basic Concepts 📦
- Store: The big box that holds all your app's data
- Actions: Messages that tell Redux "hey, I want to change something"
- Reducers: The rules for how to change the data
- State: The actual data in the store

# How Redux Works 🔄
- User clicks the "+" button
- dispatch(increment()) sends a message (action)
- Reducer sees the 'INCREMENT' message
- Reducer updates the count in the store
- Component automatically gets the new count

# When to Use Redux? 🤔
- When many components need the same data
- When you need to manage complex state
- When you need to track how your data changes

Think of Redux like a central bank for your app's data - everything goes through it, and it keeps track of all changes!