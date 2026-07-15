import { WorkspacePage } from "@/features/workspace/WorkspacePage"

export const metadata = {
  title: "Trip Workspace — Trip Mind AI",
  description: "AI-Powered Travel Command Center.",
}

interface PageProps {
  params: Promise<{ tripId: string }>
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params
  return <WorkspacePage tripId={resolvedParams.tripId} />
}
