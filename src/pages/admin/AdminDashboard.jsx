import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllEditions } from '@/api/edtions.service';
import { getAllCategories } from '@/api/categories.service';
import { getAllNominees } from '@/api/nominees.service';
import { toast } from 'sonner';
import { FaCalendar, FaTrophy, FaList } from 'react-icons/fa6';
import { BiSolidCategoryAlt } from 'react-icons/bi';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

// Chart configurations para shadcn
const chartConfigs = {
  editions: {
    categorias: {
      label: "Categorías",
      color: "#3b82f6"
    },
    nominados: {
      label: "Nominados",
      color: "#10b981"
    }
  },
  editionStatus: {
    value: {
      label: "Cantidad"
    },
    Abiertas: {
      color: "#10b981",
      label: "Abiertas"
    },
    Cerradas: {
      color: "#ef4444",
      label: "Cerradas"
    }
  },
  categoryStatus: {
    value: {
      label: "Cantidad"
    },
    Habilitadas: {
      color: "#10b981",
      label: "Habilitadas"
    },
    Deshabilitadas: {
      color: "#ef4444",
      label: "Deshabilitadas"
    }
  },
  nomineeStatus: {
    value: {
      label: "Cantidad"
    },
    Habilitados: {
      color: "#10b981",
      label: "Habilitados"
    },
    Deshabilitados: {
      color: "#ef4444",
      label: "Deshabilitados"
    }
  }
};

export default function AdminDashboard() {
  const [editions, setEditions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [editData, catData, nomData] = await Promise.all([
          getAllEditions(),
          getAllCategories(),
          getAllNominees(),
        ]);
        
        setEditions(editData || []);
        setCategories(catData || []);
        setNominees(nomData || []);
      } catch (err) {
        toast.error("Error al cargar datos", { position: "top-center" });
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Datos para gráficos
  const editionData = editions.map(e => ({
    name: e.name.substring(0, 15),
    categorias: e.total_categories || 0,
    nominados: e.total_nominees || 0,
  }));

  const categoryStatusData = [
    {
      name: 'Habilitadas',
      value: categories.filter(c => c.enabled === 1).length,
    },
    {
      name: 'Deshabilitadas',
      value: categories.filter(c => c.enabled === 0).length,
    }
  ];

  const editionStatusData = [
    {
      name: 'Abiertas',
      value: editions.filter(e => e.status === 'open').length,
    },
    {
      name: 'Programadas',
      value: editions.filter(e => e.status === 'closed').length,
    },
    {
      name: 'Cerradas',
      value: editions.filter(e => e.status === 'finished').length,
    }
  ];

  const nomineeStatusData = [
    {
      name: 'Habilitados',
      value: nominees.filter(n => n.enabled === 1).length,
    },
    {
      name: 'Deshabilitados',
      value: nominees.filter(n => n.enabled === 0).length,
    }
  ];

  return (
    <section className="pt-19 space-y-6">
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ediciones</CardTitle>
            <FaCalendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{editions.length}</div>
            <p className="text-xs text-muted-foreground">
              {editions.filter(e => e.status === 'open').length} abiertas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            <BiSolidCategoryAlt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              {categories.filter(c => c.enabled === 1).length} habilitadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nominados</CardTitle>
            <FaTrophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nominees.length}</div>
            <p className="text-xs text-muted-foreground">
              {nominees.filter(n => n.enabled === 1).length} habilitados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Nominaciones</CardTitle>
            <FaList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {editions.reduce((acc, e) => acc + (e.total_nominees || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              en todas las ediciones
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Ediciones */}
        <Card>
          <CardHeader>
            <CardTitle>Ediciones - Categorías y Nominados</CardTitle>
            <CardDescription>
              Distribución de categorías y nominados por edición
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editionData.length > 0 ? (
              <ChartContainer config={chartConfigs.editions} className="h-75">
                <BarChart data={editionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="categorias" fill="var(--color-categorias)" name="Categorías" />
                  <Bar dataKey="nominados" fill="var(--color-nominados)" name="Nominados" />
                </BarChart>
              </ChartContainer>
            ) : (
              <p className="text-center text-gray-500 py-8">No hay datos disponibles</p>
            )}
          </CardContent>
        </Card>

        {/* Estado de Ediciones */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Ediciones</CardTitle>
            <CardDescription>
              Ediciones abiertas vs cerradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigs.editionStatus} className="h-75">
              <PieChart>
                <Pie
                  data={editionStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {editionStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Estado de Categorías */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Categorías</CardTitle>
            <CardDescription>
              Categorías habilitadas vs deshabilitadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigs.categoryStatus} className="h-75">
              <PieChart>
                <Pie
                  data={categoryStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Estado de Nominados */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Nominados</CardTitle>
            <CardDescription>
              Nominados habilitados vs deshabilitados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigs.nomineeStatus} className="h-75">
              <PieChart>
                <Pie
                  data={nomineeStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {nomineeStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de últimas ediciones */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Ediciones</CardTitle>
          <CardDescription>
            Resumen de las ediciones creadas recientemente
          </CardDescription>
        </CardHeader>
        <CardContent>
          {editions.length > 0 ? (
            <div className="space-y-4">
              {editions.slice(0, 5).map((edition) => (
                <div key={edition.edition_id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{edition.name}</p>
                    <p className="text-sm text-gray-500">
                      {edition.start_date} a {edition.end_date}
                    </p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="font-semibold">{edition.total_categories}</span>
                      <p className="text-gray-500">categorías</p>
                    </div>
                    <div>
                      <span className="font-semibold">{edition.total_nominees}</span>
                      <p className="text-gray-500">nominados</p>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        edition.status === 'open' 
                          ? 'bg-green-100 text-green-800' 
                          : edition.status === 'finished' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {edition.status === 'open' ? 'Abierta' : edition.status === 'finished' ? 'Cerrada' : 'Programado'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">Sin ediciones</p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
