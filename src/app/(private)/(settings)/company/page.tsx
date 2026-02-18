import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { Metadata } from "next";
import React from "react";
import InfoCard from "./components/InfoCard";
import infoAPP from "@/lib/infoapp";
import { fetchCompany } from "@/query/companies/data";
import { CurrentCompany } from "@/lib/utils";

export const metadata: Metadata = {
  title:
    `Company | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

export default async function Company() {
  const company = await CurrentCompany();
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Company
        </h3>
        <div className="space-y-6">
          <InfoCard company={company}/>
        </div>
      </div>
    </div>
  );
}
