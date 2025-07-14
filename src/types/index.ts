/**
 * Type definitions for test-mcp
 * Author: rrjoson
 */

export interface ToolResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
} 