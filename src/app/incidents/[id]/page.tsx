import { IncidentDetailClient } from "@/components/incident-detail-client";
import { mockIncidents } from "@/data/mockData";

export function generateStaticParams() {
  return mockIncidents.map((incident) => ({ id: incident.id }));
}

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <IncidentDetailClient incidentId={id} />;
}
