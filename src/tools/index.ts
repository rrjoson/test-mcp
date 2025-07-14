/**
 * Tool and resource name constants for test-mcp
 * test
 *
 * Author: rrjoson
 */

export const TOOLS = {
  GET_WEATHER: "get_weather",
} as const;

export const RESOURCES = {
  WEATHER: "weather",
} as const;

export type ToolName = (typeof TOOLS)[keyof typeof TOOLS];
export type ResourceName = (typeof RESOURCES)[keyof typeof RESOURCES];
