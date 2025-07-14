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

export const SCHEMAS = {
  GET_WEATHER: {
    title: "Get Weather",
    description: "Get current weather information for a city",
    inputSchema: WEATHER_INPUT_SCHEMA,
  },
} as const;

export const RESOURCE_SCHEMAS = {
  WEATHER: {
    title: "Weather Data",
    description: "Current weather information for cities",
  },
} as const;

const WeatherInputSchema = z.object(WEATHER_INPUT_SCHEMA);
export type WeatherInput = z.infer<typeof WeatherInputSchema>;
