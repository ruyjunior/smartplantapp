import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import { propsPage } from "@/lib/types";
import MsgPage from "@/components/common/msgPage";
import ComponentCard from "@/components/common/ComponentCard";
import { fetchData } from "@/query/plants/data";
import CardPlant from "./components/cardPlant";
import Revalidate from "@/components/common/revalidate";

export const metadata: Metadata = {
  title:
    `Dashboard | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

export default async function Page({ props }: { props: propsPage }) {
  const plants = fetchData();
  return (
    <div>
      <Revalidate>
        <PageBreadcrumb pageTitle="Dashboard" backUrl="/home" backUrlName="Home" />
        <MsgPage props={props} />
        {(await plants).map((plant) => (
          <ComponentCard key={plant.id} title={plant.name} className="mb-4">
            <CardPlant plant={plant} />
          </ComponentCard>
        ))}
      </Revalidate>
    </div>
  );
}
