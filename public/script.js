async function fetchTemperature() {
    const cityName = document.getElementById('cityName').value;
    if (!cityName) {
        alert('Please enter a city name');
        return;
    }
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/cities/${cityName}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            document.getElementById('result').innerText = `Temperature in ${cityName}: ${data.temp}°C`;
        } else {
            document.getElementById('result').innerText = 'Failed to fetch temperature';
        }
    } catch (error) {
        document.getElementById('result').innerText = 'Error occurred while fetching temperature';
    }
}