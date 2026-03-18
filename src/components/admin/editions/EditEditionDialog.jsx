import { useRef, useState } from "react";
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

export default function EditEditionDialog ({ edition, handleSubmit }) {
  const [dateRange, setDateRange] = useState({
    from: edition?.start_date ? new Date(edition.start_date) : undefined,
    to: edition?.end_date ? new Date(edition.end_date) : undefined,
  });
  const editionNameRef = useRef(edition.name);
  const isOpenRef = useRef(edition.is_open)

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="ml-2">
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-125 md:max-w-175 lg:max-w-225">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(edition.voting_period_id, dateRange, editionNameRef.current, isOpenRef.current);
            }}
          >
            <DialogHeader>
              <DialogTitle>Editar edición</DialogTitle>
              <DialogDescription className='mb-5'>
                Modifica los detalles de la edición
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="edition-name">Nombre*</FieldLabel>
                <Input
                  id="edition-name"
                  type="text"
                  onChange={(e) => (editionNameRef.current = e.target.value)}
                  defaultValue={edition.name}
                  required
                />
              </Field>
              <Label>Fechas*</Label>
              <Card className="flex justify-center items-center">
                <CardContent className="p-0">
                  <RangeCalendar edition={edition} dateRange={dateRange} setDateRange={setDateRange}/>
                </CardContent>
              </Card>
                <Label>Estado*</Label>
                <Select defaultValue={edition?.is_open.toString()} onValueChange={(value) => {console.log(value); isOpenRef.current = Number(value);}}>
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
                <Button type="submit" className="ml-2">
                  Guardar cambios
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
