import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllVotes } from '@/api/votes.service'
import { toast } from 'sonner'
import { FaSearch, FaDownload } from 'react-icons/fa'

export default function Votes() {
  const [votes, setVotes] = useState([])
  const [filteredVotes, setFilteredVotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadVotes()
  }, [])

  useEffect(() => {
    handleSearch()
  }, [votes, searchTerm])

  async function loadVotes() {
    try {
      setLoading(true)
      const data = await getAllVotes()
      setVotes(data || [])
    } catch (err) {
      toast.error("Error al cargar los votos", { position: "top-center" })
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch() {
    if (!searchTerm.trim()) {
      setFilteredVotes(votes)
      return
    }

    const filtered = votes.filter(vote =>
      vote.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vote.nominee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vote.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vote.edition_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredVotes(filtered)
  }

  function exportToCSV() {
    if (filteredVotes.length === 0) {
      toast.error("No hay votos para exportar", { position: "top-center" })
      return
    }

    const headers = ['ID Voto', 'Email', 'Nominado', 'Categoría', 'Edición', 'Fecha del Voto']
    const data = filteredVotes.map(vote => [
      vote.vote_id,
      vote.user_email,
      vote.nominee_name,
      vote.category_name,
      vote.edition_name,
      new Date(vote.voted_at).toLocaleString('es-ES')
    ])

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `votos_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success("Votos exportados correctamente", { position: "top-center" })
  }

  return (
    <section className="pt-19 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Votos</h1>
          <p className="text-gray-500 mt-1">Administra y visualiza todos los votos emitidos</p>
        </div>
      </div>

      {/* Tarjeta con estadísticas */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Total de Votos</p>
            <p className="text-2xl font-bold text-blue-600">{votes.length}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Usuarios que Votaron</p>
            <p className="text-2xl font-bold text-green-600">
              {new Set(votes.map(v => v.user_id)).size}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Votos Mostrados</p>
            <p className="text-2xl font-bold text-purple-600">{filteredVotes.length}</p>
          </div>
        </CardContent>
      </Card>

      {/* Búsqueda y Acciones */}
      <Card>
        <CardHeader>
          <CardTitle>Búsqueda y Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Buscar por usuario, email, nominado, categoría, edición..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={exportToCSV}
              className="bg-green-600 hover:bg-green-700"
            >
              <FaDownload className="mr-2" />
              Exportar CSV
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            {filteredVotes.length} de {votes.length} votos
          </p>
        </CardContent>
      </Card>

      {/* Tabla de Votos */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Votos</CardTitle>
          <CardDescription>
            Listado completo de todos los votos emitidos en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500">Cargando votos...</p>
            </div>
          ) : filteredVotes.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Nominado</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Edición</TableHead>
                    <TableHead>Fecha del Voto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVotes.map((vote) => (
                    <TableRow key={vote.vote_id}>
                      <TableCell className="font-mono text-xs">
                        {vote.vote_id.substring(0, 8)}...
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {vote.user_email}
                      </TableCell>
                      <TableCell>
                        {vote.nominee_name}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                          {vote.category_name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                          {vote.edition_name}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(vote.voted_at).toLocaleString('es-ES')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500">
                {searchTerm ? 'No se encontraron votos que coincidan con la búsqueda' : 'Sin votos registrados'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
