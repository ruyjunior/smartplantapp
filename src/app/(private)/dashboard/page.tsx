import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import { propsPage } from "@/lib/types";
import MsgPage from "@/components/common/msgPage";
import ComponentCard from "@/components/common/ComponentCard";
import { fetchDataPlants } from "@/query/plants/data";
import CardPlant from "./components/cardPlant";
import Revalidate from "@/components/common/revalidate";
import { Suspense } from 'react'
import  DashboardSkeleton from "./components/skeleton";
 

export const metadata: Metadata = {
  title:
    `Dashboard | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

export default async function Page({ props }: { props: propsPage }) {
  const plants = fetchDataPlants();
  return (
    <div>
      <Revalidate>
        <PageBreadcrumb pageTitle="Dashboard" backUrl="/home" backUrlName="Home" />
        <MsgPage />
        <Suspense fallback={<DashboardSkeleton />}>
          {(await plants).map((plant) => (
            <ComponentCard key={plant.id} title={plant.name} className="mb-4">
              <CardPlant plant={plant} />
            </ComponentCard>
          ))}
        </Suspense>
      </Revalidate>
    </div>
  );
}
