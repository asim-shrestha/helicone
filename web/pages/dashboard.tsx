import { User, useUser } from "@supabase/auth-helpers-react";
import AuthLayout from "../components/shared/layout/authLayout";
import MetaData from "../components/shared/metaData";
import DashboardPage from "../components/templates/dashboard/dashboardPage";
import { withAuthSSR } from "../lib/api/handlerWrappers";
import { checkOnboardedAndUpdate } from "./api/user/checkOnboarded";
import { init } from "commandbar";

import { useEffect, useState } from "react";
import { useOrg } from "../components/shared/layout/organizationContext";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Result } from "../lib/result";
import { useUserSettings } from "../services/hooks/userSettings";
import { useGetAuthorized } from "../services/hooks/dashboard";
import UpgradeProModal from "../components/shared/upgradeProModal";

interface DashboardProps {
  user: User;
}

const Dashboard = (props: DashboardProps) => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!router) return;
    if (!process.env.NEXT_PUBLIC_COMMAND_BAR_HELPHUB_0 || !user?.id) return;
    if (typeof window !== "undefined") {
      init(process.env.NEXT_PUBLIC_COMMAND_BAR_HELPHUB_0 ?? "");
      window.CommandBar.boot(user.id);
    }
    if (!user) {
      router.push("/");
    }
    return () => {
      window.CommandBar.shutdown();
    };
  }, [router, user]);

  if (!user) {
    return <MetaData title="Dashboard">Loading user...</MetaData>;
  }

  return (
    <MetaData title="Dashboard">
      <AuthLayout user={user!}>
        <DashboardPage user={user} />
      </AuthLayout>
    </MetaData>
  );
};

export default Dashboard;
