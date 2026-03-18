import { createCategory, deleteCategory, getAllCategories, updateCategory } from "@/api/categories.service";
import CreateCategoryDialog from "@/components/admin/categories/CreateCategoryDialog";
import EditCategoryDialog from "@/components/admin/categories/EditCategoryDialog";
import DeleteAlertDialog from "@/components/admin/DeleteAlertDialog";
import { InputSearch } from "@/components/admin/InputSearch";
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
import { toast } from "sonner";

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

  const handleInputChange = (value) => {
    if (value === "") {
      getAllCategories()
        .then((data) => setCategories(data))
        .catch((err) => console.log(err.message));
      return;
    }
    const searchTerm = value.toLowerCase();
    const filteredCategories = categories.filter((cateogry) =>
      cateogry.name.toLowerCase().includes(searchTerm),
    );
    setCategories(filteredCategories);
  };

  const handleCreate = async (categoryName, description, enabled) => {
    try {
      const payload = {
        categoryName,
        description,
        enabled,
      };
      const result = await createCategory(payload);

      if (result.ok) {
        const categories = await getAllCategories();
        setCategories(categories);
        toast.success("Creado correctamente", { position: "top-center" });
      }
    } catch (err) {
      toast.error("Error, pruebe mas tarde!", { position: "top-center" });
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteCategory(id);

      if (result.ok) {
        const categories = await getAllCategories();
        setCategories(categories);
        toast.success("Eliminado correctamente", { position: "top-center" });
      }
    } catch (err) {
      console.log(err);
      toast.error("Error, pruebe mas tarde!", { position: "top-center" });
    }
  };

  const handleUpdate = async (categoryId, categoryName, description, enabled, ) => {
    try {
      const payload = {
        categoryName,
        description,
        enabled,
      };
      const data = await updateCategory(categoryId, payload);

      if (data.ok) {
        const categories = await getAllCategories();
        setCategories(categories);
        toast.success("Actulizado correctamente", { position: "top-center" });
      }
    } catch (err) {
      console.log(err);
      toast.error("Error, pruebe mas tarde!", { position: "top-center" });
    }
  };

  return (
    <section className="pt-19">
      <>
        {loadingCategories ? (
          <SkeletonTable rows={5} columns={4} />
        ) : (
          <>
            <div className="flex justify-between">
              <InputSearch
                onChange={(e) => handleInputChange(e.target.value)}
              />
              
              <CreateCategoryDialog handleSubmit={handleCreate} />
            </div>
            <Table>
              {categories.length > 0 && (
                <TableCaption>Todas la categorias creadas</TableCaption>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Edición</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              {!loadingCategories && categories.length > 0 && (
                <TableBody>
                  {categories.map((c) => (
                    <TableRow key={c.category_id}>
                      <TableCell>{c.category_id}</TableCell>
                      <TableCell className="flex flex-col gap-2 ">
                        {c.name}
                        <div className="flex items-center">
                          <DeleteAlertDialog
                            handleDelete={handleDelete}
                            id={c.category_id}
                          />
                          
                          <EditCategoryDialog
                            category={c}
                            handleSubmit={handleUpdate}
                          />
                        </div>
                      </TableCell>
                      <TableCell>{c.description}</TableCell>
                      <TableCell>{c.edition_name !== null ? c.edition_name : 'No asigando'}</TableCell>
                      <TableCell>
                        {c.enabled === 1 ? "Habilitado" : "Deshabilitado"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </>
        )}
      </>

      {categories.length === 0 && !loadingCategories && (
        <p className="text-center text-gray-500">No se encontraron ediciones</p>
      )}
    </section>
  );
}
