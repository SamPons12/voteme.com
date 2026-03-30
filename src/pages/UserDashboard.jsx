import { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'
import { getUserVotes } from '../api/votes.service'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { FaUser, FaEnvelope } from 'react-icons/fa'
import { FaDoorOpen } from 'react-icons/fa6'

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const [votes, setVotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "Vote4Me | Mi perfil"
    loadUserVotes()
  }, [])

  async function loadUserVotes() {
    try {
      setLoading(true)
      const data = await getUserVotes()
      setVotes(data || [])
    } catch (err) {
      toast.error("Error al cargar tus votos", { position: "top-center" })
    } finally {
      setLoading(false)
    }
  }

  // Agrupar votos por edición
  const votesByEdition = votes.reduce((acc, vote) => {
    const edition = vote.edition_name
    if (!acc[edition]) acc[edition] = []
    acc[edition].push(vote)
    return acc
  }, {})

  return (
    <main className="min-h-dvh bg-[url(/pawel-czerwinski-xwp0_eLoZp0-unsplash.jpg)] bg-center bg-cover bg-gray-900">
      <section className="pt-28 pb-10 px-4 max-w-4xl mx-auto space-y-6">

        {/* Perfil */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center flex-col justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center">
                  <FaUser className="text-white w-7 h-7" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Mi Perfil</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <FaEnvelope className="w-3 h-3" />
                    {user?.email}
                  </CardDescription>
                </div>
              </div>
              
            </div>
          </CardHeader>
        </Card>

        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-blue-600">{votes.length}</p>
              <p className="text-sm text-gray-600 mt-1">Votos emitidos</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-purple-600">{Object.keys(votesByEdition).length}</p>
              <p className="text-sm text-gray-600 mt-1">Ediciones participadas</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-green-600">
                {new Set(votes.map(v => v.category_name)).size}
              </p>
              <p className="text-sm text-gray-600 mt-1">Categorías votadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Historial de votos */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Historial de Votos</CardTitle>
            <CardDescription>
              Todos los votos que has emitido en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Cargando votos...</p>
              </div>
            ) : votes.length > 0 ? (
              <div className="space-y-6">
                {Object.entries(votesByEdition).map(([edition, editionVotes]) => (
                  <div key={edition}>
                    <h3 className="font-semibold text-lg mb-3 text-blue-900">{edition}</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Categoría</TableHead>
                          <TableHead>Tu voto</TableHead>
                          <TableHead>Fecha</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {editionVotes.map((vote) => (
                          <TableRow key={vote.vote_id}>
                            <TableCell>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                {vote.category_name}
                              </span>
                            </TableCell>
                            <TableCell className="font-medium">
                              {vote.nominee_name}
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {new Date(vote.voted_at).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 space-y-4">
                <p className="text-gray-500 text-lg">Aún no has emitido ningún voto</p>
                <Link to="/votar">
                  <Button className="bg-blue-900 text-white cursor-pointer">
                    🗳️ Ir a votar
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        <div>
          <Button variant="destructive" onClick={logout} className="cursor-pointer font-bold py-6 text-lg">
            <FaDoorOpen /> Cerrar sesión
          </Button>
        </div>
      </section>
    </main>
  )
}
