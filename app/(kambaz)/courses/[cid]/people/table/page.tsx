"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import { getUsersForCourse } from "@/lib/kambaz/client-api";

export default function PeopleTablePage() {
  const { cid } = useParams() as { cid: string };
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!cid) return;
    const data = await getUsersForCourse(cid);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
