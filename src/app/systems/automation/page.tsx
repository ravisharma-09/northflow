import SystemDetailPage, { type SystemPageConfig } from "@/components/public/SystemDetailPage";

const config: SystemPageConfig = {
  eyebrow: "Workflow efficiency",
  title: "Automation Systems",
  intro: "Connected workflows that reduce repetitive work, help customers receive timely communication and keep internal follow-up moving.",
  sections: [
    { title: "Lead Management", icon: "zap", items: ["Instant lead notifications", "Lead assignment", "Pipeline updates", "Follow-up sequences"] },
    { title: "WhatsApp Automation", icon: "message", items: ["Welcome messages", "Appointment scheduling", "Reminder messages", "Follow-up automation"] },
    { title: "Email Automation", icon: "mail", items: ["Welcome emails", "Follow-up emails", "Drip campaigns", "Customer nurturing"] },
    { title: "Booking Automation", icon: "calendar", items: ["Calendar scheduling", "Meeting confirmations", "Reminder emails", "Reminder messages"] },
    { title: "Operations Automation", icon: "settings", items: ["Team notifications", "Workflow automation", "Internal alerts", "CRM synchronization"] },
  ],
  additional: ["AI customer support", "AI lead qualification", "AI appointment booking", "Review request systems", "Document generation", "Approval workflows", "Finance and payment automations"],
};

export default function AutomationSystems() {
  return <SystemDetailPage config={config} />;
}
