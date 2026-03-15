import DeleteAlertDialog from "@/components/admin/DeleteAlertDialog";
import EditEditionDialog from "@/components/admin/editions/EditEditionDialog";

import { deleteEdition, getAllEditions, updateEdition } from "@/api/edtions.service";
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

  const handleCreate = (selectedRange, editionName, isOpen) => {
    console.log(selectedRange, editionName, isOpen)
  }

  const handleDelete = async (id) => {
    try {
      const result = await deleteEdition(id);

      if (result.ok) {
        const editions = await getAllEditions();
        setEditions(editions);
        toast.success('Eliminado correctamente', {position: "top-center",})
      }
    } catch (err) {
      console.log(err)
      toast.error('Error, pruebe mas tarde!', {position: "top-center"})
    }
  }

  const handleUpdate = async (editionId, selectedRange, editionName, isOpen) => {
    try {
      const payload = {selectedRange, editionName, isOpen}
      const data = await updateEdition(editionId, payload); 

      if (data.ok) {
        const editions = await getAllEditions();
        setEditions(editions);
        toast.success('Actulizado correctamente', {position: "top-center"})
      }
      
    } catch (err) {
      console.log(err)
      toast.error('Error, pruebe mas tarde!', {position: "top-center"})
    }
  }

  return (
    <section className="pt-19">
      <>
        {loadingEditions ? (
          <SkeletonTable rows={5} columns={5} />
        ) : (
          <>
            <div className="flex justify-between">
              <InputSearch onChange={(e) => handleInputChange(e.target.value)} />
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
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              {!loadingEditions && editions.length > 0 && (
                <TableBody>
                  {editions.map((e) => (
                    <TableRow key={e.voting_period_id}>
                      <TableCell>{e.voting_period_id}</TableCell>
                      <TableCell className="flex flex-col gap-2 ">
                        {e.name}
                        <div className="flex items-center">
                          <DeleteAlertDialog handleDelete={handleDelete} id={e.voting_period_id}/>                          
                          <EditEditionDialog edition={e} handleSubmit={handleUpdate}  />
                        </div>
                      </TableCell>
                      <TableCell>{e.start_date}</TableCell>
                      <TableCell>{e.end_date}</TableCell>
                      <TableCell>{e.is_open === 1 ? 'Abierto' : 'Cerrado'}</TableCell>
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
