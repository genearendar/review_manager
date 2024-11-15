// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Widget, Review } from "@/app/dashboard/dashboardUtils";
import WidgetSingle from "./widgetSingle";
import AddWidgetForm from "./widgetAddForm";
import {
  UrlTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/dashboard/urlTabs";

export default function WidgetTabs({
  initialWidgets,
  reviews,
}: {
  initialWidgets: Widget[];
  reviews: Review[];
}) {
  const widgetElements = initialWidgets.map((w) => (
    <WidgetSingle key={w.id} widget={w} />
  ));
  return (
    // <Tabs defaultValue="Your widgets">
    //   <TabsList>
    //     <TabsTrigger value="Your widgets">Your widgets</TabsTrigger>
    //     <TabsTrigger value="New widget">New widget</TabsTrigger>
    //   </TabsList>
    //   <TabsContent value="Your widgets">
    //     <div className="flex flex-col gap-2 max-w-xl">{widgetElements}</div>
    //   </TabsContent>
    //   <TabsContent value="New widget">
    //     <AddWidgetForm reviews={reviews} />
    //   </TabsContent>
    // </Tabs>
    <UrlTabs defaultValue="allWidgets">
      <TabsList>
        <TabsTrigger value="allWidgets">Your widgets</TabsTrigger>
        <TabsTrigger value="newWidget">New widget</TabsTrigger>
      </TabsList>
      <TabsContent value="allWidgets">
        <div className="flex flex-col gap-2 max-w-xl">{widgetElements}</div>
      </TabsContent>
      <TabsContent value="newWidget">
        <AddWidgetForm reviews={reviews} />
      </TabsContent>
    </UrlTabs>
  );
}
