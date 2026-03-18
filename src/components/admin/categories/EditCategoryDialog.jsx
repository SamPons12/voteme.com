import { useRef } from "react";
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

export default function EditCategoryDialog({ category, handleSubmit }) {
  const categoryNameRef = useRef(category.name);
  const descriptionRef = useRef(category.description);
  const enabledRef = useRef(category.enabled);

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
              handleSubmit(
                category.category_id,
                categoryNameRef.current,
                descriptionRef.current,
                enabledRef.current,
              );
            }}
          >
            <DialogHeader>
              <DialogTitle>Editar categoria</DialogTitle>
              <DialogDescription className="mb-5">
                Modifica los detalles de la categoria
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="edition-name">Nombre*</FieldLabel>
                <Input
                  id="edition-name"
                  type="text"
                  onChange={(e) => (categoryNameRef.current = e.target.value)}
                  defaultValue={category.name}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Descripción*</FieldLabel>
                <Input
                  id="description"
                  type="text"
                  onChange={(e) => (descriptionRef.current = e.target.value)}
                  defaultValue={category.description}
                  required
                />
              </Field>
              <Label>Estado*</Label>
              <Select
                defaultValue={category?.enabled.toString()}
                onValueChange={(value) => {
                  enabledRef.current = Number(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estado</SelectLabel>
                    <SelectItem value="1">Habilitado</SelectItem>
                    <SelectItem value="0">Deshabilitado</SelectItem>
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
