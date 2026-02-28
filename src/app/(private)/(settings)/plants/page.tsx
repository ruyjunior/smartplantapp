import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import MsgPage from "@/components/common/msgPage";
import ComponentCard from "@/components/common/ComponentCard";
import { fetchDataPlants } from "@/query/plants/data";
import { fetchDataAreas } from "@/query/areas/data";
import UserCard from "./components/AreaCard";
import AreaCard from "./components/AreaCard";
import PlantCard from "./components/PlantCard";
import Areas from "./components/Areas";
import Plants from "./components/Plants";

export const metadata: Metadata = {
  title: `Plants | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const plants = await fetchDataPlants();
  return (
    <div>
      <PageBreadcrumb pageTitle="Plants" backUrl="/home" backUrlName="Home" />
      <MsgPage />
      <Plants />
    </div>
  );
}
