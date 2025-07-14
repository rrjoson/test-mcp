#!/usr/bin/env node

/**
 * test-mcp - Professional Weather MCP Server
 * test
 *
 * Author: rrjoson
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { TOOLS } from "./tools/index.js";
import { SCHEMAS } from "./schemas/index.js";
import { handleGetWeather, handleGetPokemon } from "./handlers/index.js";

const server = new McpServer({
  name: "test-mcp",
  version: "1.0.0",
});

// Register tools
server.registerTool(TOOLS.GET_WEATHER, SCHEMAS.GET_WEATHER, handleGetWeather);
server.registerTool(TOOLS.GET_POKEMON, SCHEMAS.GET_POKEMON, handleGetPokemon);

// Register resources (simplified for now)
// server.registerResource(RESOURCES.WEATHER, new ResourceTemplate('weather://{city}'), RESOURCE_SCHEMAS.WEATHER, handleWeatherResource);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("test-mcp MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});
