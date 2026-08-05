import SystemDetailPage, { type SystemPageConfig } from "@/components/public/SystemDetailPage";

const config: SystemPageConfig = {
  eyebrow: "Data and operations",
  title: "CRM & Business Dashboards",
  intro: "A centralized operating layer for lead records, sales pipeline movement, team activity and the business information that needs a clear home.",
  sections: [
    { title: "CRM Management", icon: "users", items: ["Lead database", "Customer database", "Contact management", "Sales pipeline", "Deal tracking"] },
    { title: "Business Tracking", icon: "chart", items: ["Lead sources", "Conversion tracking", "Revenue tracking", "Growth metrics"] },
    { title: "Team Management", icon: "shield", items: ["Team dashboard", "User roles", "Task tracking", "Team activity logs"] },
    { title: "Reporting", icon: "file", items: ["Daily reports", "Weekly reports", "Monthly reports", "Business analytics"] },
  ],
  additional: ["Executive dashboards", "Multi-location dashboards", "Franchise management", "White-label dashboards", "Custom permissions", "API integrations", "Custom reporting systems"],
};

export default function DashboardSystems() {
  return <SystemDetailPage config={config} />;
}
