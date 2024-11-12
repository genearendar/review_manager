import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Widget } from "@/app/dashboard/dashboardUtils";

export default function WidgetTabs({
  initialWidgets,
}: {
  initialWidgets: Widget[];
}) {
  return (
    <Tabs defaultValue="Your widgets">
      <TabsList>
        <TabsTrigger value="Your widgets">Your widgets</TabsTrigger>
        <TabsTrigger value="New widget">New widget</TabsTrigger>
      </TabsList>
      <TabsContent value="Your widgets">
        {JSON.stringify(initialWidgets, null, 2)}
      </TabsContent>
      <TabsContent value="New widget">New widget form goes here</TabsContent>
    </Tabs>
  );
}
