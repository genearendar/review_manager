"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

const TabsContext = createContext<{
  activeTab: string;
  switchTab: (tab: string) => void;
} | null>(null);

// Create hook for children to use
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within UrlTabs");
  }
  return context;
};

const UrlTabs = ({
  defaultValue,
  children,
  className,
}: {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || defaultValue;
  const switchTab = (tab: string) => {
    router.push(`?tab=${tab}`);
  };
  return (
    <TabsContext.Provider value={{ activeTab, switchTab }}>
      <div className="all-tabs">{children}</div>
    </TabsContext.Provider>
  );
};
const TabsList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className="inline-flex gap-2 mb-4 bg-slate-100">{children}</div>;
};

const TabsTrigger = ({
  children,
  className,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) => {
  const { switchTab } = useTabsContext();
  const {activeTab} = useTabsContext();
  const classList = cn(
    "rounded bg-slate-100 px-4 py-2", 
    activeTab === value && "bg-slate-200"
  )
  return (
    <button className={classList} onClick={() => switchTab(value)}>
      {children}
    </button>
  );
};

const TabsContent = ({
  children,
  className,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) => {
  const { activeTab } = useTabsContext();
  return activeTab === value ? (
    <div className={className}>{children}</div>
  ) : null;
};

export { UrlTabs, TabsList, TabsTrigger, TabsContent };
