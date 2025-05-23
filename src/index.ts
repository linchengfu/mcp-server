#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

// 定义服务器信息
const server = new Server(
  {
    name: 'example-mcp-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 定义工具列表
const tools: Tool[] = [
  {
    name: 'echo',
    description: '回显输入的文本',
    inputSchema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: '要回显的文本',
        },
      },
      required: ['text'],
    },
  },
  {
    name: 'add_numbers',
    description: '计算两个数字的和',
    inputSchema: {
      type: 'object',
      properties: {
        a: {
          type: 'number',
          description: '第一个数字',
        },
        b: {
          type: 'number',
          description: '第二个数字',
        },
      },
      required: ['a', 'b'],
    },
  },
];

// 处理工具列表请求
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools,
  };
});

// 处理工具调用请求
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'echo':
      return {
        content: [
          {
            type: 'text',
            text: `Echo: ${args.text}`,
          },
        ],
      };

    case 'add_numbers':
      const sum = (args.a as number) + (args.b as number);
      return {
        content: [
          {
            type: 'text',
            text: `${args.a} + ${args.b} = ${sum}`,
          },
        ],
      };

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});