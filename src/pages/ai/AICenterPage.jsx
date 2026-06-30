import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, FileText, Stethoscope, Mic, FileSearch, MessageSquare } from "lucide-react";

const aiFeatures = [
  { title: "AI Assistant", desc: "Chat with AI for clinical decision support and hospital queries.", icon: Bot, color: "text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20" },
  { title: "Medical Scribe", desc: "AI-powered medical transcription and documentation.", icon: FileText, color: "text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20" },
  { title: "AI Diagnosis Support", desc: "Symptom analysis and differential diagnosis suggestions.", icon: Stethoscope, color: "text-green-600 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20" },
  { title: "Document AI", desc: "Extract data from medical documents, prescriptions, and reports.", icon: FileSearch, color: "text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20" },
  { title: "Voice AI", desc: "Voice-to-text for clinical notes and prescriptions.", icon: Mic, color: "text-red-600 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20" },
  { title: "AI Chat", desc: "Patient-facing chatbot for appointment booking and FAQs.", icon: MessageSquare, color: "text-teal-600 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/20" },
];

export default function AICenterPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="AI Center" description="AI-powered tools for clinical support, documentation, and automation."
        breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "AI Center" }]}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {aiFeatures.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Card key={i} className="shadow-sm cursor-pointer hover:shadow-lg transition-all rounded-xl border-muted group overflow-hidden">
              <CardContent className="p-6">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{feature.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs text-primary font-medium">
                  <span>Launch →</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
