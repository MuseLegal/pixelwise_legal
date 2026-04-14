import { SlackConnectionResult } from "./types";

/**
 * Slack service layer is intentionally modular.
 * TODO production:
 * 1) add OAuth flow
 * 2) persist bot tokens securely
 * 3) create shared/client channels
 * 4) post matter status updates
 */
export const slackService = {
  async getConnectionState(companyId: string): Promise<SlackConnectionResult> {
    if (!companyId) return { state: "not_connected" };
    return { state: "mock_connected", workspaceName: "Pixelwise Client Space", channelName: "#legal-collab" };
  }
};
