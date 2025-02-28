"use client";

import dynamic from "next/dynamic";

// This wrapper exists to handle dynamic import in a client component context
// Dynamic import with ssr: false needs to be in a client component
const DashboardPreview = dynamic(
  () => import("@/components/marketing/dashboard-preview"),
  { ssr: false }
);

export default function DashboardWrapper() {
  return <DashboardPreview />;
} 