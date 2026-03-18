import { useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
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
import RangeCalendar from "@/components/RangeCalendar";
import { FaPlus } from "react-icons/fa6";

export default function CreateEditionDialog({ handleSubmit }) {
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });
  const [editionName, setEditionName] = useState('');
  const [isOpen, setIsOpen] = useState(0);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="ml-2">
            <FaPlus /> Crear edición
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-125 md:max-w-175 lg:max-w-225">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(dateRange, editionName, isOpen);
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
                  value={editionName}
                  onChange={(e) => (setEditionName(e.target.value))}
                  required
                />
              </Field>
              <Label>Fechas*</Label>
              <Card className="flex justify-center items-center">
                <CardContent className="p-0">
                  <RangeCalendar edition={null} dateRange={dateRange} setDateRange={setDateRange}/>
                </CardContent>
              </Card>
                <Label>Estado*</Label>
                <Select defaultValue='0' onValueChange={(value) => {setIsOpen(Number(value))}}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Estado</SelectLabel>
                      <SelectItem value='1'>Abierto</SelectItem>
                      <SelectItem value='0'>Cerrado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
            </FieldGroup>
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type='submit' disabled={!(dateRange.from && isOpen.toString() && editionName)} className="ml-2">
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
