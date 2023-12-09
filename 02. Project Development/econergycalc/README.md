# Installation

## Prerequisites:
- Node.js
- npm (Node Package Manager)
- MongoDB Compass

## Steps:
1. Clone the repository to your local machine using git clone 
```
https://github.com/archishab/EconergyCalc.git
```
2. Navigate to the cloned directory using 
```
cd EconergyCalc
```
3. Install the required node modules by running 
```
npm install
```
4. Start the application and the server with 
```
npm run both
```
5. Open your web browser and visit `http://localhost:3000` to view the application.

# MongoDB Compass Setup
## Connecting to the Database:
- Install MongoDB Compass from the official MongoDB website.
- Open MongoDB Compass and connect to your database using the connection string provided in your config file or environment variables.
- Once connected, you can view, insert, modify, and delete the documents in your collections as needed

# How to Use

## Register & Login:
- Start by creating an account with the 'Register' feature.
- Once registered, log in to access your dashboard.

## Adding Appliances:
- Click on the 'Add Appliance' button on the dashboard.
- Enter the appliance details including type, brand, power rating, Energy Star compliancy and whether its active.
- Alternatively, search with a model number to automatically find and fetch appliance details.

## Tracking Consumption:
- Click on the 'Log Usage' button on the dashboard.
- Add the time the appliance is used for by using the stopwatch or enetring a time in seconds.
- View weekly, and monthly energy consumption trends in the 'Dashboard'.
- Receive personalized energy-saving recommendations based on your usage patterns in the Recommendations tab.

## Community Forum:
- Click on the 'Add New Post' button on the Forum page to add a new post.
- Users can like or dislike other posts as well as leave a reply.
- With each like on a post, its author receives a point. Users with the most points are showcased in a Leaderboard.