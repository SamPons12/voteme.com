import DeleteAlertDialog from "@/components/admin/DeleteAlertDialog";
import EditEditionDialog from "@/components/admin/editions/EditEditionDialog";

import {
  createEdition,
  deleteEdition,
  getAllEditions,
  updateEdition,
  addCategoryToEdition,
  removeCategoryFromEdition,
} from "@/api/edtions.service";
import { InputSearch } from "@/components/admin/InputSearch";
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

import React, { useEffect, useState } from "react";
import CreateEditionDialog from "@/components/admin/editions/CreateEditionDialog";
import { toast } from "sonner";
import { formatDate } from "@/utils/formatDate";

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
        toast.error("Error al cargar ediciones", { position: "top-center" });
      } finally {
        setLloadingEditions(false);
      }
      
    }
    fetchEditions();
  }, []);

  const handleInputChange = (value) => {
    if (value === "") {
      getAllEditions()
        .then((data) => setEditions(data))
        .catch((err) => console.log(err.message));
      return;
    }
    const searchTerm = value.toLowerCase();
    const filteredEditions = editions.filter((edition) =>
      edition.name.toLowerCase().includes(searchTerm),
    );
    setEditions(filteredEditions);
  };

  const handleCreate = async (dateRange, editionName, status, categoryIds) => {
    try {
      
      const payload = {
        editionName,
        selectedRange: {
          from: formatDate(dateRange.from),
          to: formatDate(dateRange.to),
        },
        status,
        categoryIds,
      };
      const result = await createEdition(payload);

      if (result.ok) {
        const editions = await getAllEditions();
        setEditions(editions);
        toast.success("Creado correctamente", { position: "top-center" });
      }
    } catch (err) {
      toast.error("Error, pruebe mas tarde!", { position: "top-center" });
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id)
      const result = await deleteEdition(id);

      if (result.ok) {
        const editions = await getAllEditions();
        setEditions(editions);
        toast.success("Eliminado correctamente", { position: "top-center" });
      }
    } catch (err) {
      console.log(err);
      toast.error("Error, pruebe mas tarde!", { position: "top-center" });
    }
  };

  const handleUpdate = async (
    editionId,
    dateRange,
    editionName,
    status,
    categoriesToAdd = [],
    categoriesToRemove = [],
  ) => {
    try {
      console.log(editionId)
      const payload = {
        editionName,
        selectedRange: {
          from: formatDate(dateRange.from),
          to: formatDate(dateRange.to),
        },
        status,
      };
      const data = await updateEdition(editionId, payload);

      // Apply category changes
      await Promise.all([
        ...categoriesToAdd.map((catId) => addCategoryToEdition(editionId, catId)),
        ...categoriesToRemove.map((catId) => removeCategoryFromEdition(editionId, catId)),
      ]);

      if (data.ok) {
        const editions = await getAllEditions();
        setEditions(editions);
        toast.success("Actualizado correctamente", { position: "top-center" });
      }
    } catch (err) {
      console.log(err);
      toast.error("Error, pruebe más tarde!", { position: "top-center" });
    }
  };

  return (
    <section className="pt-19">
      <>
        {loadingEditions ? (
          <SkeletonTable rows={5} columns={7} />
        ) : (
          <>
            <div className="flex justify-between">
              <InputSearch
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <CreateEditionDialog handleSubmit={handleCreate} />
            </div>
            <Table>
              {editions.length > 0 && (
                <TableCaption>Todas la ediciones creadas</TableCaption>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Fecha inicio</TableHead>
                  <TableHead>Fecha fin</TableHead>
                  <TableHead>Total categorias</TableHead>
                  <TableHead>Total nominados</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              {!loadingEditions && editions.length > 0 && (
                <TableBody>
                  {editions.map((e) => (
                    <TableRow key={e.edition_id}>
                      <TableCell>{e.edition_id}</TableCell>
                      <TableCell className="flex flex-col gap-2 ">
                        {e.name}
                        <div className="flex items-center">
                          <DeleteAlertDialog
                            handleDelete={handleDelete}
                            id={e.edition_id}
                          />
                          <EditEditionDialog
                            edition={e}
                            handleSubmit={handleUpdate}
                          />
                        </div>
                      </TableCell>
                      <TableCell>{e.start_date}</TableCell>
                      <TableCell>{e.end_date}</TableCell>
                      <TableCell>{e.total_categories}</TableCell>
                      <TableCell>{e.total_nominees}</TableCell>
                      <TableCell>
                        {e.status === 'open' ? 'Abierto' : e.status === 'finished' ? 'Cerrado' : 'Programado'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </>
        )}
      </>

      {editions.length === 0 && !loadingEditions && (
        <p className="text-center text-gray-500">No se encontraron ediciones</p>
      )}
    </section>
  );
}
