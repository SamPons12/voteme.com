import { useRef, useState, useEffect } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import RangeCalendar from "@/components/RangeCalendar";
import ManageNomineesDialog from "./ManageNomineesDialog";
import { toast } from "sonner";
import {
  getEditionCategories,
  getAvailableCategoriesForEdition,
  addCategoryToEdition,
  removeCategoryFromEdition,
} from "@/api/edtions.service";

export default function EditEditionDialog ({ edition, handleSubmit }) {
  const [dateRange, setDateRange] = useState({
    from: edition?.start_date ? new Date(edition.start_date) : undefined,
    to: edition?.end_date ? new Date(edition.end_date) : undefined,
  });
  const [categories, setCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [open, setOpen] = useState(false);
  
  const editionNameRef = useRef(edition.name);
  const isOpenRef = useRef(edition.is_open);

  useEffect(() => {
    if (open) {
      loadCategories();
    }
  }, [open]);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const [currentCats, availableCats] = await Promise.all([
        getEditionCategories(edition.edition_id),
        getAvailableCategoriesForEdition(edition.edition_id),
      ]);
      setCategories(currentCats);
      setAvailableCategories(availableCats);
      setSelectedCategory("");
    } catch (err) {
      toast.error("Error al cargar categorías", { position: "top-center" });
      console.log(err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleAddCategory = async () => {
    if (!selectedCategory) {
      toast.error("Selecciona una categoría", { position: "top-center" });
      return;
    }

    try {
      await addCategoryToEdition(edition.edition_id, selectedCategory);
      toast.success("Categoría agregada", { position: "top-center" });
      await loadCategories();
    } catch (err) {
      toast.error("Error al agregar categoría", { position: "top-center" });
      console.log(err);
    }
  };

  const handleRemoveCategory = async (categoryId) => {
    try {
      await removeCategoryFromEdition(edition.edition_id, categoryId);
      toast.success("Categoría removida", { position: "top-center" });
      await loadCategories();
    } catch (err) {
      toast.error("Error al remover categoría", { position: "top-center" });
      console.log(err);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="ml-2">
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-125 md:max-w-175 lg:max-w-225 max-h-[90vh] overflow-y-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(edition.edition_id, dateRange, editionNameRef.current, isOpenRef.current);
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

              {/* Categorías */}
              <Label className="mt-5 font-semibold">Categorías ({categories.length})</Label>
              
              {loadingCategories ? (
                <p className="text-sm text-gray-500">Cargando categorías...</p>
              ) : (
                <>
                  {/* Categorías actuales */}
                  <div className="border rounded-md p-3">
                    {categories.length === 0 ? (
                      <p className="text-sm text-gray-500">Sin categorías asignadas</p>
                    ) : (
                      <ScrollArea className="h-40 w-full rounded-md border">
                        <div className="space-y-2 p-4">
                          {categories.map((cat) => (
                            <div
                              key={cat.category_id}
                              className="flex items-center justify-between bg-blue-50 p-2 rounded border border-blue-200"
                            >
                              <div className="flex-1">
                                <p className="text-sm font-medium">{cat.name}</p>
                                {cat.description && (
                                  <p className="text-xs text-gray-600">{cat.description}</p>
                                )}
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveCategory(cat.category_id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remover
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </div>

                  {/* Agregar categorías */}
                  {availableCategories.length > 0 && (
                    <div className="border-t pt-3">
                      <Label>Agregar categoría</Label>
                      <div className="flex gap-2 mt-2">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {availableCategories.map((cat) => (
                                <SelectItem key={cat.category_id} value={cat.category_id.toString()}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          onClick={handleAddCategory}
                          size="sm"
                        >
                          Agregar
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
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

      <ManageNomineesDialog edition={edition} />
    </>
  );
}

