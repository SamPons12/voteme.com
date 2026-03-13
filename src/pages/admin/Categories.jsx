import { getAllCategories } from "@/api/categories.service";
import { SkeletonTable } from "@/components/TableSkeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoadingCategories(true);
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section>
      {loadingCategories && <SkeletonTable />}
      {!loadingCategories && (
        <Table>
          <TableCaption>Todas las categorías creadas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.id}</TableCell>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
