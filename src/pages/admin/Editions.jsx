import DeleteAlertDialog from "@/components/admin/DeleteAlertDialog";
import { getAllEditions } from "@/api/edtions.service";
import { InputSearch } from "@/components/admin/InputSearch";
import { SkeletonTable } from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
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
import { FaPlus } from "react-icons/fa6";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <section className="pt-19">
      <>
        {loadingEditions ? (
          <SkeletonTable rows={5} columns={5} />
        ) : (
          <>
            <div className="flex justify-between">
              <InputSearch onChange={(e) => handleInputChange(e.target.value)} />
              <Button>
                <FaPlus /> Crear edición
              </Button>
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
                          <DeleteAlertDialog onClick={() => {console.log("ELIMINAR")}} />
                          
                          <Dialog>
                            <form>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="ml-2">
                                  Editar
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-full sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px]">
                                <DialogHeader>
                                  <DialogTitle>Editar edición</DialogTitle>
                                  <DialogDescription>
                                    Modifica los detalles de la edición
                                  </DialogDescription>
                                </DialogHeader>
                                <FieldGroup>
                                  <Field>
                                    <FieldLabel htmlFor="edition-name">Nombre</FieldLabel>
                                    <Input id="edition-name" defaultValue={e.name} />
                                  </Field>
                                   <label>Fechas</label>
                                  <Card className="flex justify-center items-center">
                                    <CardContent className="p-0">
                                     
                                      <Calendar
                                        mode="range"
                                        numberOfMonths={2}
                                        disabled={(date) =>
                                          date > new Date() || date < new Date("1900-01-01")
                                        }
                                      />
                                    </CardContent>
                                  </Card>
                                </FieldGroup>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancelar</Button>
                                  </DialogClose>
                                  <Button type="submit" className="ml-2">Guardar cambios</Button>
                                </DialogFooter>
                              </DialogContent>
                            </form>
                          </Dialog>
                        </div>
                      </TableCell>
                      <TableCell>{e.start_date}</TableCell>
                      <TableCell>{e.end_date}</TableCell>
                      <TableCell>{e.is_open}</TableCell>
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
