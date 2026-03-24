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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { FaEdit } from "react-icons/fa";
import {
  getEditionCategories,
  getEditionCategoryNominees,
  getAvailableNominees,
  addNomineeToEditionCategory,
  removeNomineeFromEditionCategory,
} from "@/api/edtions.service";
import { MoonLoader } from "react-spinners";

export default function ManageNomineesDialog({ edition }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryNominees, setCategoryNominees] = useState({});
  const [availableNominees, setAvailableNominees] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState({});

  useEffect(() => {
    if (open) {
      loadEditionCategories();
    }
  }, [open]);

  const loadEditionCategories = async () => {
    try {
      setLoading(true);
      const data = await getEditionCategories(edition.edition_id);
      setCategories(data);

      // Load nominees for each category
      const nomineesMap = {};
      const availableMap = {};
      
      for (const category of data) {
        const nominees = await getEditionCategoryNominees(category.edition_category_id);
        nomineesMap[category.edition_category_id] = nominees;

        const available = await getAvailableNominees(category.edition_category_id);
        availableMap[category.edition_category_id] = available;
      }

      setCategoryNominees(nomineesMap);
      setAvailableNominees(availableMap);
    } catch (err) {
      toast.error("Error al cargar categorías", { position: "top-center" });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNominee = async (editionCategoryId) => {
    const nomineeId = selectedNominee[editionCategoryId];
    if (!nomineeId) {
      toast.error("Selecciona un nominado", { position: "top-center" });
      return;
    }

    try {
      await addNomineeToEditionCategory(editionCategoryId, nomineeId);
      toast.success("Nominado agregado", { position: "top-center" });
      
      // Refresh nominees and available options
      const nominees = await getEditionCategoryNominees(editionCategoryId);
      const available = await getAvailableNominees(editionCategoryId);
      
      setCategoryNominees(prev => ({
        ...prev,
        [editionCategoryId]: nominees
      }));
      setAvailableNominees(prev => ({
        ...prev,
        [editionCategoryId]: available
      }));
      
      setSelectedNominee(prev => ({
        ...prev,
        [editionCategoryId]: ""
      }));
    } catch (err) {
      toast.error("Error al agregar nominado", { position: "top-center" });
      console.log(err);
    }
  };

  const handleRemoveNominee = async (id) => {
    try {
      await removeNomineeFromEditionCategory(id);
      toast.success("Nominado removido", { position: "top-center" });
      await loadEditionCategories();
    } catch (err) {
      toast.error("Error al remover nominado", { position: "top-center" });
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <FaEdit /> Gestionar nominados
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestionar nominados - {edition.name}</DialogTitle>
          <DialogDescription>
            Edición: {edition.start_date} a {edition.end_date}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <MoonLoader color="#000080" />
          </div>
        ) : categories.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Esta edición no tiene categorías asignadas</p>
          </div>
        ) : (
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              {categories.map((category) => (
                <Card key={category.edition_category_id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Nominados asignados */}
                    <div>
                      <p className="font-semibold text-sm mb-2">
                        Nominados asignados: {categoryNominees[category.edition_category_id]?.length || 0}
                      </p>
                      <div className="space-y-2">
                        {categoryNominees[category.edition_category_id]?.length > 0 ? (
                          categoryNominees[category.edition_category_id].map((nominee) => (
                            <div
                              key={nominee.id}
                              className="flex items-center justify-between bg-gray-50 p-2 rounded border"
                            >
                              <div className="flex-1">
                                <p className="font-medium text-sm">{nominee.name}</p>
                                {nominee.description && (
                                  <p className="text-xs text-gray-600">{nominee.description}</p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveNominee(nominee.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remover
                              </Button>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">Sin nominados asignados</p>
                        )}
                      </div>
                    </div>

                    {/* Agregar nominado */}
                    {availableNominees[category.edition_category_id]?.length > 0 && (
                      <div className="border-t pt-4">
                        <p className="font-semibold text-sm mb-2">Agregar nominado</p>
                        <div className="flex gap-2">
                          <Select
                            value={selectedNominee[category.edition_category_id] || ""}
                            onValueChange={(value) =>
                              setSelectedNominee(prev => ({
                                ...prev,
                                [category.edition_category_id]: value
                              }))
                            }
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Selecciona un nominado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {availableNominees[category.edition_category_id].map((nominee) => (
                                  <SelectItem key={nominee.nominee_id} value={nominee.nominee_id}>
                                    {nominee.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <Button
                            onClick={() => handleAddNominee(category.edition_category_id)}
                            size="sm"
                          >
                            Agregar
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
