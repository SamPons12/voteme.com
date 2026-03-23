import { useMemo, useState } from "react";
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

export default function CreateNomineeDialog({ handleSubmit }) {

  const [nomineeName, setNomineeName] = useState('');
  const [description, setDescription] = useState('')
  const [enabled, setEnabled] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const canSubmit = useMemo(() => {
    return !(nomineeName && enabled.toString() && description)
  }, [nomineeName, description, enabled])

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
            <FaPlus /> Crear nominado
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-125 md:max-w-175 lg:max-w-225">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(nomineeName, description, enabled, imageFile);
            }}
          >
            <DialogHeader>
              <DialogTitle>Crear nuevo nominado</DialogTitle>
              <DialogDescription className='mb-5'>
                Introduzca los datos del nominado
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nominee-name">Nombre*</FieldLabel>
                <Input
                  id="nominee-name"
                  type="text"
                  value={nomineeName}
                  onChange={(e) => (setNomineeName(e.target.value))}
                  placeholder="Ej: The Legend of Zelda: Tears of the Kingdom"
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
                  placeholder="Ej: Nominado en Game Awards 2025"
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
