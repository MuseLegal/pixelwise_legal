import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { slackService } from "@/lib/slack/service";

export async function SlackConnectionCard({ companyId }: { companyId: string }) {
  const connection = await slackService.getConnectionState(companyId);
  return (
    <Card>
      <CardHeader><h3>Slack collaboration</h3></CardHeader>
      <CardContent className="space-y-1 text-sm text-zinc-600">
        <p>Status: {connection.state}</p>
        {connection.workspaceName ? <p>Workspace: {connection.workspaceName}</p> : null}
        {connection.channelName ? <p>Channel: {connection.channelName}</p> : null}
        <p className="pt-2 text-zinc-500">Mocked for MVP. OAuth and channel automation can be enabled later.</p>
      </CardContent>
    </Card>
  );
}
