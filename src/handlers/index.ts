/**
 * Handler functions for test-mcp
 * test
 * 
 * Author: rrjoson
 */

import type { WeatherInput } from '../schemas/index.js';
import { weatherData, type WeatherData } from '../data/index.js';

/**
 * Handle get weather tool
 */
export async function handleGetWeather({ city }: WeatherInput) {
  const cityKey = city.toLowerCase().replace(/\s+/g, '-');
  const weather = weatherData[cityKey];
  
  if (!weather) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Weather data not available for "${city}". Available cities: ${Object.values(weatherData).map((w: WeatherData) => w.city).join(', ')}`,
        },
      ],
    };
  }

  return {
    content: [
      {
        type: 'text' as const,
        text: `Weather in ${weather.city}:\n🌡️ Temperature: ${weather.temperature}°C\n🌤️ Condition: ${weather.condition}\n💧 Humidity: ${weather.humidity}%`,
      },
    ],
  };
}

/**
 * Handle weather resource requests
 */
export async function handleWeatherResource(uri: URL, params: { city: string }) {
  const { city } = params;
  const cityKey = city.toLowerCase().replace(/\s+/g, '-');
  const weather = weatherData[cityKey];
  
  if (!weather) {
    return {
      contents: [
        {
          uri: uri.href,
          text: `Weather data not available for "${city}"`,
        },
      ],
    };
  }

  return {
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(weather, null, 2),
        mimeType: 'application/json',
      },
    ],
  };
} 