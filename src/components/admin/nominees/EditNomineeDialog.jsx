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

export default function EditNomineeDialog({ nominee, handleSubmit }) {
  const nomineeNameRef = useRef(nominee.name);
  const descriptionRef = useRef(nominee.description);
  const enabledRef = useRef(nominee.enabled);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    nominee.image_url
      ? (nominee.image_url.startsWith('http') ? nominee.image_url : `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}${nominee.image_url}`)
      : null
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
                nominee.nominee_id,
                nomineeNameRef.current,
                descriptionRef.current,
                enabledRef.current,
                imageFile,
              );
            }}
          >
            <DialogHeader>
              <DialogTitle>Editar nominado</DialogTitle>
              <DialogDescription className="mb-5">
                Modifica los detalles del nominado
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nominee-name">Nombre*</FieldLabel>
                <Input
                  id="nominee-name"
                  type="text"
                  onChange={(e) => (nomineeNameRef.current = e.target.value)}
                  defaultValue={nominee.name}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Descripción*</FieldLabel>
                <Input
                  id="description"
                  type="text"
                  onChange={(e) => (descriptionRef.current = e.target.value)}
                  defaultValue={nominee.description}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="nominee-image">Imagen</FieldLabel>
                <Input
                  id="nominee-image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />
                )}
              </Field>
              <Label>Estado*</Label>
              <Select
                defaultValue={nominee?.enabled.toString()}
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
