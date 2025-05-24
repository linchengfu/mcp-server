import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dayjs from "dayjs";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});

// Add an addition tool
server.tool("add", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}));

server.tool("getCurrentTime", {}, async () => ({
  content: [{ type: "text", text: dayjs().format("YYYY-MM-DD HH:mm:ss") }],
}));

server.tool("say hello", { name: z.string() }, async ({ name }) => ({
  content: [{ type: "text", text: `Hello, ${name}!` }],
}));

// Static resource
server.resource("config", "config://app", async (uri) => {
  try {
    const configPath = path.resolve(__dirname, "app.bundle.js");
    const configContent = await fs.readFile(configPath, "utf-8");
    return {
      contents: [
        {
          uri: uri.href,
          text: configContent,
        },
      ],
    };
  } catch (error) {
    console.error("Failed to read config file:", error);
    return {
      contents: [
        {
          uri: uri.href,
          text: "Unable to load configuration file",
        },
      ],
    };
  }
});

// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        text: `Hello, ${name}!`,
      },
    ],
  })
);

console.log("Server is running...");

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
async function main() {
  await server.connect(transport);
}
main().catch(console.error);
