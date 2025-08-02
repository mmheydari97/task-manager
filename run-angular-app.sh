#!/bin/bash

# Set window title (macOS Terminal specific)
echo -ne "\033]0;Angular Task Manager\007"

# Change to project directory
cd "/Users/kian/Documents/Projects/Task Manager"

# Start Angular development server in background
npm run start &
SERVER_PID=$!

# Wait for server to start
sleep 8

# Open default browser to Angular app URL
open "http://localhost:4200/"

# Display messages
echo "Angular Task Manager is now running!"
echo
echo "To stop the application:"
echo "1. Close this terminal window"
echo "2. Close the server window (or use 'kill $SERVER_PID')"
echo
read -n 1 -s -r -p "Press any key to close this window..."
