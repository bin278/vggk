import React, { useState, useEffect } from 'react';
import { Search, Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Calendar } from 'lucide-react';

function WeatherDashboard() {
  const [city, setCity] = useState('Shanghai');
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockCurrentWeather = {
    city: 'Shanghai',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    feelsLike: 21,
    icon: 'cloud'
  };

  const mockForecast = [
    { day: 'Today', date: 'Oct 15', high: 24, low: 18, condition: 'Sunny', icon: 'sun' },
    { day: 'Tue', date: 'Oct 16', high: 23, low: 17, condition: 'Cloudy', icon: 'cloud' },
    { day: 'Wed', date: 'Oct 17', high: 21, low: 16, condition: 'Rain', icon: 'cloud-rain' },
    { day: 'Thu', date: 'Oct 18', high: 22, low: 17, condition: 'Partly Cloudy', icon: 'cloud' },
    { day: 'Fri', date: 'Oct 19', high: 25, low: 19, condition: 'Sunny', icon: 'sun' }
  ];

  useEffect(() => {
    setWeatherData(mockCurrentWeather);
    setForecastData(mockForecast);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    
    setLoading(true);
    setCity(searchInput);
    
    setTimeout(() => {
      const newWeather = {
        ...mockCurrentWeather,
        city: searchInput,
        temperature: Math.floor(Math.random() * 10) + 18
      };
      
      const newForecast = mockForecast.map(day => ({
        ...day,
        high: Math.floor(Math.random() * 8) + 20,
        low: Math.floor(Math.random() * 8) + 15
      }));
      
      setWeatherData(newWeather);
      setForecastData(newForecast);
      setLoading(false);
      setSearchInput('');
    }, 800);
  };

  const getWeatherIcon = (iconName) => {
    switch(iconName) {
      case 'sun': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloud-rain': return <CloudRain className="w-8 h-8 text-blue-500" />;
      default: return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
            <Cloud className="w-10 h-10 text-blue-500" />
            Weather Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Real-time weather updates and 5-day forecast</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search for a city..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </form>

              {weatherData && (
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">{weatherData.city}</h2>
                      <p className="text-blue-100">{weatherData.condition}</p>
                      <div className="flex items-baseline mt-4">
                        <span className="text-6xl font-bold">{weatherData.temperature}°</span>
                        <span className="text-xl ml-2 text-blue-100">C</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {getWeatherIcon(weatherData.icon)}
                      <p className="mt-2 text-blue-100">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="flex items-center gap-3">
                      <Thermometer className="w-5 h-5" />
                      <div>
                        <p className="text-sm text-blue-100">Feels Like</p>
                        <p className="font-semibold">{weatherData.feelsLike}°C</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Droplets className="w-5 h-5" />
                      <div>
                        <p className="text-sm text-blue-100">Humidity</p>
                        <p className="font-semibold">{weatherData.humidity}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Wind className="w-5 h-5" />
                      <div>
                        <p className="text-sm text-blue-100">Wind</p>
                        <p className="font-semibold">{weatherData.windSpeed} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5" />
                      <div>
                        <p className="text-sm text-blue-100">Updated</p>
                        <p className="font-semibold">Just now</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-500" />
                5-Day Forecast
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {forecastData.map((day, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl border ${index === 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <p className="font-semibold text-gray-800">{day.day}</p>
                    <p className="text-sm text-gray-500 mb-3">{day.date}</p>
                    <div className="flex justify-center my-3">
                      {getWeatherIcon(day.icon)}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{day.condition}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">{day.high}°</span>
                      <span className="text-gray-500">{day.low}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Popular Cities</h3>
              <div className="space-y-4">
                {['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai'].map((cityName) => (
                  <button
                    key={cityName}
                    onClick={() => {
                      setSearchInput(cityName);
                      setTimeout(() => {
                        document.querySelector('form button[type="submit"]').click();
                      }, 100);
                    }}
                    className="w-full p-4 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors text-left flex justify-between items-center"
                  >
                    <span className="font-medium text-gray-800">{cityName}</span>
                    <span className="text-gray-500">22°C</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Weather Tips</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-gray-600 text-sm">Perfect day for outdoor activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-600 text-sm">UV index is moderate today</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <span className="text-gray-600 text-sm">Light jacket recommended for evening</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Weather data updates every 15 minutes • Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
        </footer>
      </div>
    </div>
  );
}

export default WeatherDashboard;