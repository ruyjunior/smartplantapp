import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import { propsPage } from "@/lib/types";
import MsgPage from "@/components/common/msgPage";
import { fetchById } from "@/query/machines/data";
import { machine } from "os";
import ComponentCard from "@/components/common/ComponentCard";
import LineChartOne from "../components/LineChartOne";
import { fetchData } from "@/query/counts/data";
import BarChartOne from "../components/BarChartOne";
import Revalidate from "@/components/common/revalidate";

export const metadata: Metadata = {
  title:
    `Machine View | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const machine = await fetchById(id);
  const counts = await fetchData(id);
  const types = counts.reduce((acc, count) => acc.includes(count.tag) ? acc : [...acc, count.tag], [] as string[]);

  return (
    <div>
      <Revalidate>
        <PageBreadcrumb pageTitle={machine.name} backUrl="/dashboard" backUrlName="Dashboard" />
        <ComponentCard title='' className="mb-4">
          {types.map((type) => {
            const countsOfType = counts.filter((count) => count.tag === type);
            return (
              <div key={type} className="m4">
                {(countsOfType[0].value.toString() === '1' || countsOfType[0].value.toString() === '0')  && <BarChartOne counts={countsOfType} />}
                {(countsOfType[0].value.toString() > '1' )  && <LineChartOne counts={countsOfType} />}
              </div>
            )    
          })}
        </ComponentCard>
      </Revalidate>
    </div  >
  );
}
