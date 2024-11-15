"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext } from "react";

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
  return <div className={className}>{children}</div>;
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
  return (
    <button className={className} onClick={() => switchTab(value)}>
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
