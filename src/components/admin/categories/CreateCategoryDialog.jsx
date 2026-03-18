import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa6";
import { getAllEditions } from "@/api/edtions.service";

export default function CreateCategoryDialog({ handleSubmit }) {

  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('')
  const [enabled, setEnabled] = useState(1);
  const [selectedEdition, setSelectedEdtion] = useState(null);
  const [editions, setEditions] = useState([]);

  const canSubmit = useMemo(() => {
    return !(categoryName && enabled && description && selectedEdition)
  }, [categoryName, description, enabled, selectedEdition])

  useEffect(() => {
    const getEditions = async () => {
      try {
        const data = await getAllEditions();
        setEditions(data);
      } catch (err) {
        console.log(err)
      }
    }
    getEditions();
  }, [])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="ml-2">
            <FaPlus /> Crear categoria
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-125 md:max-w-175 lg:max-w-225">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(categoryName, description, enabled, selectedEdition);
            }}
          >
            <DialogHeader>
              <DialogTitle>Crear nueva edición</DialogTitle>
              <DialogDescription className='mb-5'>
                Introduzca los datos de la edición
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="edition-name">Nombre*</FieldLabel>
                <Input
                  id="edition-name"
                  type="text"
                  value={categoryName}
                  onChange={(e) => (setCategoryName(e.target.value))}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Descripción*</FieldLabel>
                <Input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => (setDescription(e.target.value))}
                  required
                />
              </Field>
                <Label>Ediciones*</Label>
                <Select onValueChange={(value) => {setSelectedEdtion(value)}}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una edición"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ediciones</SelectLabel>
                      {
                        editions.map((e) => (
                          <SelectItem value={e.voting_period_id}>{e.name}</SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Label>Estado*</Label>
                <Select defaultValue='1' onValueChange={(value) => {setEnabled(Number(value))}}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Estado</SelectLabel>
                      <SelectItem value='1'>Habilitado</SelectItem>
                      <SelectItem value='0'>Deshabilitado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
            </FieldGroup>
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type='submit' disabled={canSubmit} className="ml-2">
                  Crear
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
