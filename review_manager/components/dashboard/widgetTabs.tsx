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
  return (
    <Tabs defaultValue="Your widgets">
      <TabsList>
        <TabsTrigger value="Your widgets">Your widgets</TabsTrigger>
        <TabsTrigger value="New widget">New widget</TabsTrigger>
      </TabsList>
      <TabsContent value="Your widgets">
        <div className="flex flex-col gap-2 max-w-xl">{widgetElements}</div>
      </TabsContent>
      <TabsContent value="New widget">New widget form goes here</TabsContent>
    </Tabs>
  );
}
