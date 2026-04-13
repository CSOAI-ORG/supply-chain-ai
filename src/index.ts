/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * @csoai/supply-chain-ai
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T06:00:00Z
 * Last Modified:   2026-02-26T06:00:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleSupplyChainAiCompliance } from "./tools/supply-chain-ai-compliance.js";

const server = new McpServer({
  name: "csoai-supply-chain-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const SupplyChainAiComplianceShape = {
  system_name: z.string().describe("Name of supply chain AI system"),
  ai_function: z.string().describe("Function (demand forecasting, warehouse automation, route optimization, supplier scoring, trade compliance)"),
  compliance_scope: z.string().describe("Compliance scope (customs, sanctions, forced labor, ESG, conflict minerals)"),
  data_sources: z.string().describe("Data sources (ERP, IoT, satellite, trade documents, supplier databases)"),
  jurisdiction: z.string().describe("Operating jurisdiction (EU/CSDDD, US/UFLPA, UK/MSA, etc.)"),
};

// ─── Tool 1: supply_chain_ai_compliance ───
(server.tool as any)(
  "supply_chain_ai_compliance",
  "Assess compliance for AI in supply chain management. Covers trade compliance, forced labor screening, autonomous logistics, and ESG monitoring.",
  SupplyChainAiComplianceShape,
  async (args: any) => {
    const result = handleSupplyChainAiCompliance(args.system_name, args.ai_function, args.compliance_scope, args.data_sources, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
