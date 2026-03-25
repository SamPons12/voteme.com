import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import RangeCalendar from "@/components/RangeCalendar";
import { FaPlus } from "react-icons/fa6";
import { getAllCategories } from "@/api/categories.service";
import { toast } from "sonner";

export default function CreateEditionDialog({ handleSubmit }) {
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });
  const [editionName, setEditionName] = useState('');
  const [status, setStatus] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoadingCategories(true);
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        toast.error("Error al cargar categorías", { position: "top-center" });
        console.log(err);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="ml-2">
            <FaPlus /> Crear edición
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-125 md:max-w-175 lg:max-w-225 max-h-[90vh] overflow-y-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedCategories.length === 0) {
                toast.error("Selecciona al menos una categoría", { position: "top-center" });
                return;
              }
              handleSubmit(dateRange, editionName, status, selectedCategories);
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
              <Select defaultValue='0' onValueChange={(value) => {setStatus(Number(value))}}>
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

              <Label className="mb-3">Categorías*</Label>
              <div className="border rounded-md p-3 max-h-48 overflow-y-auto">
                {loadingCategories ? (
                  <p className="text-sm text-gray-500">Cargando categorías...</p>
                ) : categories.length === 0 ? (
                  <p className="text-sm text-gray-500">No hay categorías disponibles</p>
                ) : (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.category_id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.category_id}`}
                          checked={selectedCategories.includes(category.category_id)}
                          onCheckedChange={() => handleCategoryToggle(category.category_id)}
                        />
                        <label
                          htmlFor={`category-${category.category_id}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">Seleccionadas: {selectedCategories.length}</p>
            </FieldGroup>
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button 
                  type='submit' 
                  disabled={!(dateRange.from && status.toString() && editionName && selectedCategories.length > 0)} 
                  className="ml-2"
                >
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
