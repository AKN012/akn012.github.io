let ESP_IP = '';

// Load saved IP from localStorage
window.addEventListener('load', function () {
    const savedIP = localStorage.getItem('esp_ip');
    if (savedIP) {
        document.getElementById('ipInput').value = savedIP;
        ESP_IP = savedIP;
    }
});

function connectToESP() {
    const ip = document.getElementById('ipInput').value.trim();

    if (!ip) {
        alert('Please enter an IP address');
        return;
    }

    ESP_IP = ip;
    localStorage.setItem('esp_ip', ip);

    if (location.protocol === 'https:') {
        alert('Page is loaded over HTTPS. Browser may block requests to http:// local devices (mixed content).');
    }

    // Test connection
    fetch(`http://${ESP_IP}/status`)
        .then(response => {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.json();
        })
        .then(data => {
            document.getElementById('statusBar').className = 'status-bar connected';
            document.getElementById('statusBar').innerHTML = '✅ Connected to ' + ip;
            document.getElementById('controlSection').style.display = 'block';
            updateStatus();
        })
        .catch(error => {
            document.getElementById('statusBar').className = 'status-bar disconnected';
            document.getElementById('statusBar').innerHTML = '❌ Connection failed - ' + error.message;
            alert('Could not connect to ESP8266. Make sure:\n1. IP address is correct\n2. ESP8266 is powered on\n3. You are on the same WiFi network');
        });
}

function controlRelay(relay, action) {
    if (!ESP_IP) {
        alert('Please connect to ESP8266 first');
        return;
    }

    const buttons = document.querySelectorAll('.button-group button');
    buttons.forEach(btn => btn.disabled = true);

    fetch(`http://${ESP_IP}/relay${relay}/${action}`)
        .then(response => {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            updateStatus();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Command failed - Check connection');
        })
        .finally(() => {
            buttons.forEach(btn => btn.disabled = false);
        });
}

function updateStatus() {
    if (!ESP_IP) return;

    fetch(`http://${ESP_IP}/status`)
        .then(response => {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.json();
        })
        .then(data => {
            // Update Relay 1
            const relay1Status = document.getElementById('relay1Status');
            relay1Status.textContent = data.relay1;
            relay1Status.className = 'relay-status ' + (data.relay1 === 'ON' ? 'on' : 'off');

            // Update Relay 2
            const relay2Status = document.getElementById('relay2Status');
            relay2Status.textContent = data.relay2;
            relay2Status.className = 'relay-status ' + (data.relay2 === 'ON' ? 'on' : 'off');
        })
        .catch(error => {
            console.error('Status update failed:', error);
        });
}

// Auto-refresh status every 3 seconds
setInterval(() => {
    if (ESP_IP && document.getElementById('controlSection').style.display !== 'none') {
        updateStatus();
    }
}, 3000);