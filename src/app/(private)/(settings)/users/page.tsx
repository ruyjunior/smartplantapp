import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import MsgPage from "@/components/common/msgPage";
import ComponentCard from "@/components/common/ComponentCard";
import { fetchData } from "@/query/users/data";
import UserCard from "./components/UserCard";

export const metadata: Metadata = {
  title:
    `Users | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const users = await fetchData();
  return (
    <div>
      <PageBreadcrumb pageTitle="Users" backUrl="/home" backUrlName="Home" />
      <MsgPage />
      <ComponentCard title="" className="mb-1">
        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </ComponentCard>
    </div>
  );
}
