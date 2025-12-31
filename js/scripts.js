 import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
        import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAdD-hqpfHTV6n41lZ3ZJ7Hfi4OuttDMS0",
            authDomain: "esp8266-relay-75b18.firebaseapp.com",
            databaseURL: "https://esp8266-relay-75b18-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "esp8266-relay-75b18",
            storageBucket: "esp8266-relay-75b18.firebasestorage.app",
            messagingSenderId: "715957690048",
            appId: "1:715957690048:web:fbb35ed7bb8ceafb599725"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);

        // Update status bar
        function updateStatusBar(online) {
            const statusBar = document.getElementById('statusBar');
            const statusText = document.getElementById('statusText');
            
            if (online) {
                statusBar.className = 'status-bar online';
                statusText.textContent = '✅ Connected - ESP8266 Online';
            } else {
                statusBar.className = 'status-bar';
                statusText.textContent = '📡 Connected to Firebase';
            }
        }

        // Listen for relay status changes
        onValue(ref(database, 'relays/relay1'), (snapshot) => {
            const state = snapshot.val();
            const statusEl = document.getElementById('relay1Status');
            statusEl.textContent = state ? 'ON' : 'OFF';
            statusEl.className = 'relay-status ' + (state ? 'on' : 'off');
        });

        onValue(ref(database, 'relays/relay2'), (snapshot) => {
            const state = snapshot.val();
            const statusEl = document.getElementById('relay2Status');
            statusEl.textContent = state ? 'ON' : 'OFF';
            statusEl.className = 'relay-status ' + (state ? 'on' : 'off');
        });

        // Listen for connection status
        onValue(ref(database, 'status/connection'), (snapshot) => {
            const status = snapshot.val();
            updateStatusBar(status === 'online');
        });

        // Control relay function
        window.controlRelay = async function(relay, state) {
            const buttons = document.querySelectorAll('button');
            buttons.forEach(btn => btn.disabled = true);

            try {
                await set(ref(database, `relays/relay${relay}`), state);
                console.log(`Relay ${relay} set to ${state ? 'ON' : 'OFF'}`);
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to control relay. Please try again.');
            } finally {
                setTimeout(() => {
                    buttons.forEach(btn => btn.disabled = false);
                }, 500);
            }
        };

        // Initial status
        updateStatusBar(false);
        console.log('Firebase initialized successfully');