import { McpClient } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const client = new McpClient({
    transport: new StdioClientTransport()
  });

  // 测试加法工具
  const addResult = await client.tool("add", { a: 5, b: 3 });
  console.log("加法结果:", addResult.content[0].text);

  // 测试问候资源
  const greeting = await client.resource("greeting", { name: "World" });
  console.log("问候语:", greeting.contents[0].text);
}

main().catch(console.error);
