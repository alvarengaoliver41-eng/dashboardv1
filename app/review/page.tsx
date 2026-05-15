"use client";

import { useHabitData } from "@/hooks/useHabitData";
import PageHeader from "@/components/layout/PageHeader";
import ReviewForm from "@/components/review/ReviewForm";
import ReviewHistory from "@/components/review/ReviewHistory";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ReviewPage() {
  const { data, hydrated, today, todayEntry, updateDaily } = useHabitData();

  if (!hydrated) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <PageHeader title="Review" subtitle="Diario y estado de ánimo" />

      <div className="px-4">
        <Tabs defaultValue="hoy">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="hoy" className="flex-1">Hoy</TabsTrigger>
            <TabsTrigger value="historial" className="flex-1">Historial</TabsTrigger>
          </TabsList>
          <TabsContent value="hoy">
            <ReviewForm
              onSave={(updates) => updateDaily(today, updates)}
            />
          </TabsContent>
          <TabsContent value="historial">
            <ReviewHistory daily={data.daily} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
