import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { slackService } from "@/lib/slack/service";

export async function SlackConnectionCard({ companyId }: { companyId: string }) {
  const connection = await slackService.getConnectionState(companyId);
  return (
    <Card>
      <CardHeader><h3 className="font-medium">Slack Collaboration</h3></CardHeader>
      <CardContent className="text-sm text-zinc-600">
        <p>Status: {connection.state}</p>
        {connection.workspaceName ? <p>Workspace: {connection.workspaceName}</p> : null}
        {connection.channelName ? <p>Channel: {connection.channelName}</p> : null}
        <p className="mt-2">Slack OAuth and channel provisioning are modular and ready for production integration.</p>
      </CardContent>
    </Card>
  );
}
