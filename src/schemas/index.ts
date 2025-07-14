/**
 * Schema definitions for test-mcp
 * test
 *
 * Author: rrjoson
 */

import { z } from "zod";

export const WEATHER_INPUT_SCHEMA = {
  city: z.string().min(1).describe("City name to get weather for"),
};

export const POKEMON_INPUT_SCHEMA = {
  pokemon: z
    .string()
    .min(1)
    .describe("Pokemon name or ID to get information for"),
};

export const SCHEMAS = {
  GET_WEATHER: {
    title: "Get Weather",
    description: "Get current weather information for a city",
    inputSchema: WEATHER_INPUT_SCHEMA,
  },
  GET_POKEMON: {
    title: "Get Pokemon",
    description: "Get information about a Pokemon by name or ID",
    inputSchema: POKEMON_INPUT_SCHEMA,
  },
} as const;

export const RESOURCE_SCHEMAS = {
  WEATHER: {
    title: "Weather Data",
    description: "Current weather information for cities",
  },
  POKEMON: {
    title: "Pokemon Data",
    description: "Information about Pokemon from the PokeAPI",
  },
} as const;

const WeatherInputSchema = z.object(WEATHER_INPUT_SCHEMA);
const PokemonInputSchema = z.object(POKEMON_INPUT_SCHEMA);

export type WeatherInput = z.infer<typeof WeatherInputSchema>;
export type PokemonInput = z.infer<typeof PokemonInputSchema>;
