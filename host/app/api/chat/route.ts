import { deepseek } from "@ai-sdk/deepseek";
import { streamText, experimental_createMCPClient } from "ai";
import { z } from "zod";
// Allow responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    // Connect to the MCP server to get tools
    // You can use different transport types based on your server setup
    const mcpClient = await experimental_createMCPClient({
      transport: {
        type: "sse", // or other transport types like 'websocket', 'http', etc.
        url: process.env.MCP_SERVER_URL as string,
      },
    });
    // Fetch tools from the MCP server
    const tools = await mcpClient.tools();
    // Create the text stream with the model and fetched tools
    const result = streamText({
      model: deepseek("deepseek-chat"),
      messages,
      tools,
      // Close the MCP client when the response is finished
      onFinish: async () => {
        await mcpClient.close();
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process your request" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
