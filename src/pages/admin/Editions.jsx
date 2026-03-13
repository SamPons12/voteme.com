import { getAllEditions } from "@/api/edtions.service";
import { SkeletonTable } from "@/components/TableSkeleton";
import {
  TableCaption,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React, { useEffect, useRef, useState } from "react";

export default function Editions() {
  const [loadingEditions, setLloadingEditions] = useState(false);
  const [editions, setEditions] = useState([]);

  useEffect(() => {
    async function fetchEditions() {
      try {
        setLloadingEditions(true);
        const data = await getAllEditions();
        setEditions(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLloadingEditions(false);
      }
    }
    fetchEditions();
  }, []);
  return (
    <section className="">
      {loadingEditions && <SkeletonTable />}

      {!loadingEditions && (
          <Table>
            <TableCaption>Todas la ediciones creadas</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha inicio</TableHead>
                <TableHead>Fecha fin</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editions.map((e, key) => (
                <TableRow key={key}>
                  {Object.entries(e).map(([key, value]) => (
                    <TableCell key={key}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
      )}
    </section>
  );
}
