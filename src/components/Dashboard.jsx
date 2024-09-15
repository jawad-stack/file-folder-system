// Dashboard.js
import { getToken, onMessage } from 'firebase/messaging';
import { useAuth } from '../contexts/AuthContext';
import { messaging } from '../firebase';
import { useEffect } from 'react';

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    useEffect(() => {
        // Request permission for notifications
        const requestPermission = async () => {
            try {
                const token = await getToken(messaging, { vapidKey: 'BEX6tw8l00LYzNJWXAhvyPTRBrHkdMuKUJxFGfItOi06Z_WW2WMeuJisz4ZNjNTNyz5hRWK1y14uWR2Wi3d3rEU' });
                if (token) {
                    console.log('FCM Token:', token);
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            } catch (err) {
                console.error('Error retrieving token:', err);
            }
        };

        requestPermission();

        // Handle incoming messages
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            // Show notification to the user here or do other actions
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Welcome, {currentUser.email}</h1>
            <h1>Push Notifications implemented on this screen</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
