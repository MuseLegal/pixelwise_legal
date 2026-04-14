export type SlackConnectionState = "not_connected" | "mock_connected" | "connected";

export interface SlackConnectionResult {
  state: SlackConnectionState;
  workspaceName?: string;
  channelName?: string;
}
