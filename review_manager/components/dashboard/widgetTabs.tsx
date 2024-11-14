import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Widget } from "@/app/dashboard/dashboardUtils";
import WidgetSingle from "./widgetSingle";

export default function WidgetTabs({
  initialWidgets,
}: {
  initialWidgets: Widget[];
}) {
  const widgetElements = initialWidgets.map((w) => (
    <WidgetSingle key={w.id} widget={w} />
  ));
  console.log(initialWidgets);
  return (
    <Tabs defaultValue="Your widgets">
      <TabsList>
        <TabsTrigger value="Your widgets">Your widgets</TabsTrigger>
        <TabsTrigger value="New widget">New widget</TabsTrigger>
      </TabsList>
      <TabsContent value="Your widgets">{widgetElements}</TabsContent>
      <TabsContent value="New widget">New widget form goes here</TabsContent>
    </Tabs>
  );
}
