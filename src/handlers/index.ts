/**
 * Handler functions for test-mcp
 * test
 *
 * Author: rrjoson
 */

import type { WeatherInput, PokemonInput } from "../schemas/index.js";
import { weatherData, type WeatherData } from "../data/index.js";

/**
 * Handle get weather tool
 */
export async function handleGetWeather({ city }: WeatherInput) {
  const cityKey = city.toLowerCase().replace(/\s+/g, "-");
  const weather = weatherData[cityKey];

  if (!weather) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Weather data not available for "${city}". Available cities: ${Object.values(
            weatherData
          )
            .map((w: WeatherData) => w.city)
            .join(", ")}`,
        },
      ],
    };
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `Weather in ${weather.city}:\n🌡️ Temperature: ${weather.temperature}°C\n🌤️ Condition: ${weather.condition}\n💧 Humidity: ${weather.humidity}%`,
      },
    ],
  };
}

/**
 * Handle get pokemon tool
 */
export async function handleGetPokemon({ pokemon }: PokemonInput) {
  try {
    const pokemonName = pokemon.toLowerCase().trim();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return {
          content: [
            {
              type: "text" as const,
              text: `❌ Pokemon "${pokemon}" not found. Please check the spelling or try a different Pokemon name/ID.`,
            },
          ],
        };
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    const pokemonData = await response.json();

    // Extract key information
    const name = pokemonData.name;
    const id = pokemonData.id;
    const height = pokemonData.height / 10; // Convert to meters
    const weight = pokemonData.weight / 10; // Convert to kg
    const types = pokemonData.types
      .map((type: any) => type.type.name)
      .join(", ");
    const abilities = pokemonData.abilities
      .map((ability: any) => ability.ability.name)
      .join(", ");
    const baseExperience = pokemonData.base_experience;

    // Get sprite image URL
    const spriteUrl = pokemonData.sprites.front_default;

    return {
      content: [
        {
          type: "text" as const,
          text: `🎮 **${name.charAt(0).toUpperCase() + name.slice(1)}** (#${id})
📏 Height: ${height}m
⚖️ Weight: ${weight}kg
🎯 Type(s): ${types}
✨ Abilities: ${abilities}
🌟 Base Experience: ${baseExperience}
${spriteUrl ? `🖼️ Sprite: ${spriteUrl}` : ""}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text" as const,
          text: `❌ Error fetching Pokemon data: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      ],
    };
  }
}

/**
 * Handle weather resource requests
 */
export async function handleWeatherResource(
  uri: URL,
  params: { city: string }
) {
  const { city } = params;
  const cityKey = city.toLowerCase().replace(/\s+/g, "-");
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
        mimeType: "application/json",
      },
    ],
  };
}
