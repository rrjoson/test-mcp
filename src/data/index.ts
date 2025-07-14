/**
 * Weather data for test-mcp
 * test
 * 
 * Author: rrjoson
 */

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
}

export const weatherData: Record<string, WeatherData> = {
  'new-york': {
    city: 'New York',
    temperature: 22,
    condition: 'Sunny',
    humidity: 65,
  },
  'london': {
    city: 'London',
    temperature: 18,
    condition: 'Cloudy',
    humidity: 78,
  },
  'tokyo': {
    city: 'Tokyo',
    temperature: 25,
    condition: 'Partly Cloudy',
    humidity: 70,
  },
  'paris': {
    city: 'Paris',
    temperature: 20,
    condition: 'Rainy',
    humidity: 85,
  },
  'san-francisco': {
    city: 'San Francisco',
    temperature: 16,
    condition: 'Foggy',
    humidity: 82,
  },
};
