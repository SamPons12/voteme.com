import { createNominee, deleteNominee, getAllNominees, updateNominee } from "@/api/nominees.service";
import CreateNomineeDialog from "@/components/admin/nominees/CreateNomineeDialog";
import EditNomineeDialog from "@/components/admin/nominees/EditNomineeDialog";
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

export default function Nominees() {
  const [loadingNominees, setLoadingNominees] = useState(false);
  const [nominees, setNominees] = useState([]);

  useEffect(() => {
    async function fetchNominees() {
      try {
        setLoadingNominees(true);
        const data = await getAllNominees();
        setNominees(data);
      } catch (err) {
        toast.error("Error al cargar nominados", { position: "top-center" });
      } finally {
        setLoadingNominees(false);
      }
    }
    fetchNominees();
  }, []);

  const handleInputChange = (value) => {
    if (value === "") {
      getAllNominees()
        .then((data) => setNominees(data))
        .catch((err) => console.log(err.message));
      return;
    }
    const searchTerm = value.toLowerCase();
    const filteredNominees = nominees.filter((nominee) =>
      nominee.name.toLowerCase().includes(searchTerm),
    );
    setNominees(filteredNominees);
  };

  const handleCreate = async (name, description, enabled, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('enabled', enabled ? 1 : 0);
      if (imageFile) formData.append('image', imageFile);

      const result = await createNominee(formData);
      if (result.ok) {
        const nominees = await getAllNominees();
        setNominees(nominees);
        toast.success("Creado correctamente", { position: "top-center" });
      }
    } catch (err) {
      toast.error("Error, pruebe mas tarde!", { position: "top-center" });
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteNominee(id);

      if (result.ok) {
        const nominees = await getAllNominees();
        setNominees(nominees);
        toast.success("Eliminado correctamente", { position: "top-center" });
      }
    } catch (err) {
      console.log(err);
      toast.error("Error, pruebe mas tarde!", { position: "top-center" });
    }
  };

  const handleUpdate = async (nomineeId, name, description, enabled, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('enabled', enabled ? 1 : 0);
      if (imageFile) formData.append('image', imageFile);

      const data = await updateNominee(nomineeId, formData);

      if (data.ok) {
        const nominees = await getAllNominees();
        setNominees(nominees);
        toast.success("Actualizado correctamente", { position: "top-center" });
      }
    } catch (err) {
      console.log(err);
      toast.error("Error, pruebe mas tarde!", { position: "top-center" });
    }
  };

  return (
    <section className="pt-19">
      <>
        {loadingNominees ? (
          <SkeletonTable rows={5} columns={4} />
        ) : (
          <>
            <div className="flex justify-between">
              <InputSearch
                onChange={(e) => handleInputChange(e.target.value)}
              />
              
              <CreateNomineeDialog handleSubmit={handleCreate} />
            </div>
            <Table>
              {nominees.length > 0 && (
                <TableCaption>Todos los nominados creados</TableCaption>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead>Imagen</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              {!loadingNominees && nominees.length > 0 && (
                <TableBody>
                  {nominees.map((n) => (
                    <TableRow key={n.nominee_id}>
                      <TableCell>
                        {n.image_url ? (
                          <img
                            src={`${import.meta.env.VITE_API_URL.replace(/\/$/, '')}${n.image_url}`}
                            alt={n.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                            Sin imagen
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="flex flex-col gap-2 ">
                        {n.name}
                        <div className="flex items-center">
                          <DeleteAlertDialog
                            handleDelete={handleDelete}
                            id={n.nominee_id}
                          />
                          
                          <EditNomineeDialog
                            nominee={n}
                            handleSubmit={handleUpdate}
                          />
                        </div>
                      </TableCell>
                      <TableCell>{n.description}</TableCell>
                      <TableCell>
                        {n.enabled === 1 ? "Habilitado" : "Deshabilitado"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </>
        )}
      </>

      {nominees.length === 0 && !loadingNominees && (
        <p className="text-center text-gray-500">No se encontraron nominados</p>
      )}
    </section>
  );
}
