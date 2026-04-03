import { useEffect, useState } from "react";
import { getNomineesBycategory } from "../api/nominees.service";
import { voteHelper } from "../helpers/voteHelper";
import { MoonLoader } from "react-spinners";
import { saveVotes } from "../api/votes.service";
import Nominee from "../components/Nominee";
import { useNavigate } from "react-router-dom";
import { hasUserVoted } from "../helpers/userHelper";
import { getActiveEditionCategories } from "@/api/edtions.service";
import { toast } from "sonner";

export default function Vote() {
  
  const [categories, setCategories] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [votes, setVotes] = useState({});
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingNominees, setLoadingNominees] = useState(false);
  const [loadingSendVotes, setLoadingSendVotes] = useState(false);

  const navigate = useNavigate();

  // useEffects
  useEffect(() => {
    async function getCategories() {
      try {
        setLoadingCategories(true);
        const data = await getActiveEditionCategories();
        if (data.length > 0) {
          setCategories(data);
          setCategoryId(data[0].category_id);
        }
      } catch (err) {
        toast.error("Error al cargar categorías", { position: "top-center" });
      } finally {
        setLoadingCategories(false);
      }
    }
    
    async function checkUserVoted() {
      try {
        const result = await hasUserVoted(localStorage.getItem('token'))
        if (result) {
          navigate('/votar/gracias-por-participar', {replace: true})
        }
      } catch (err) {
        toast.error("Error al verificar historial de votos", { position: "top-center" });
      }
    }
    checkUserVoted()
    getCategories();
  }, [navigate]);

  useEffect(() => {
    async function getNominees() {
      try {
        setLoadingNominees(true);
        const data = await getNomineesBycategory(categoryId);
        if (data.length > 0) {
          setNominees(data);
        }
      } catch (err) {
        toast.error("Error al cargar nominados", { position: "top-center" });
      } finally {
        setLoadingNominees(false);
      }
    }
    if (categoryId) {
      getNominees();
    }
  }, [categoryId]);

  const selectedNominee = votes[categoryId] || null;

  const actualCategory = categories.find((c) => c.category_id === categoryId);

  // Functions
  function handleClickNominee(nomineeCategoryId) {
    setVotes((prev) => ({ ...prev, [categoryId]: nomineeCategoryId }));
    console.log(votes);
  }

  async function sendVotes() {
    try {
      setLoadingSendVotes(true);
      const response = await saveVotes(votes);
      if (response.data.ok) {
        toast.success("Votos guardados correctamente", { position: "top-center" });
        navigate('/votar/gracias-por-participar', {replace: true})
      }
    } catch (err) {
      toast.error("Error al guardar votos", { position: "top-center" });
    } finally {
      setLoadingSendVotes(false);
    }
  }

  function previousCategory() {
    const currentIndex = categories.findIndex(
      (c) => c.category_id === categoryId,
    );

    if (currentIndex <= 0) return;

    setCategoryId(categories[currentIndex - 1].category_id);
  }

  function nextCategory() {
    const currentIndex = categories.findIndex(
      (c) => c.category_id === categoryId,
    );
    

    if (currentIndex === -1) return;

    if (currentIndex === categories.length - 1) {
      sendVotes();
      return;
    }
    
    setCategoryId(categories[currentIndex + 1].category_id);
  }

  return (
    <main className="min-h-dvh pt-34 bg-[url(/pawel-czerwinski-xwp0_eLoZp0-unsplash.jpg)] bg-center bg-cover bg-gray-900 lg:pt-70">
      {(loadingCategories || loadingNominees || loadingSendVotes) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <MoonLoader size={90} color="#000080" />
        </div>
      )}
      <section className="px-5 pb-20 lg:px-15">
        <section className="flex flex-col py-10 px-5 text-soft-black shadow-2xl rounded-2xl gap-5 lg:gap-10">
          {actualCategory && (
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl font-extrabold lg:text-6xl">
                {actualCategory.name.toUpperCase()}
              </h1>
              <p className="lg:text-2xl">{actualCategory.description}</p>
            </div>
          )}
          {!voteHelper.existsNext(categories, categoryId) && (
            <div>
              <button
                onClick={sendVotes}
                className="rounded-xl cursor-pointer bg-blue-900 py-4 px-6 text-xl font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                ENVIAR
              </button>
            </div>
          )}
        </section>
        <section className="grid grid-cols-2 pt-10 gap-x-2 gap-y-10 justify-center w-full sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-10">
          {nominees &&
            !loadingCategories &&
            !loadingCategories &&
            nominees.map((n) => (
              <Nominee
                key={n.id}
                nominee={n}
                selectedNominee={selectedNominee}
                handleClickNominee={handleClickNominee}
              />
            ))}
        </section>
      </section>

      <section className="sticky h-20 bottom-0 bg-soft-gray px-5 z-5 lg:fixed lg:top-0 lg:mt-25 lg:w-screen lg:z-20 lg:border-t- lg:border-off-white">
        <div className="flex justify-between items-center h-full">
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={
              voteHelper.existPrevious(categories, categoryId)
                ? previousCategory
                : undefined
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              height="30"
              width="30"
            >
              <g id="Arrow-Back-2">
                <path
                  id="Union"
                  fill="#f9fafb"
                  d="m15.9997 19.3379 -1.543 -0.9981 -8.49993 -5.5c-0.29105 -0.1884 -0.46441 -0.5147 -0.45703 -0.8613 0.00744 -0.3465 0.19441 -0.665 0.49316 -0.8408l8.5 -5 1.5068 -0.88575zM8.40306 12.04l5.59664 3.6211V8.74805z"
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
            <h3
              className={`font-stretch-expanded text-off-white font-xl ${!voteHelper.existPrevious(categories, categoryId) ? "cursor-not-allowed" : ""}`}
            >
              ANTERIOR
            </h3>
          </div>
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={
              voteHelper.existsNext(categories, categoryId)
                ? nextCategory
                : undefined
            }
          >
            <h3
              className={`text-off-white font-stretch-expanded font-xl ${!voteHelper.existsNext(categories, categoryId) ? "cursor-not-allowed" : ""}`}
            >
              SIGUIENTE
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              height="30"
              width="30"
              className=" rotate-180"
            >
              <g id="Arrow-Back-2">
                <path
                  id="Union"
                  fill="#f9fafb"
                  d="m15.9997 19.3379 -1.543 -0.9981 -8.49993 -5.5c-0.29105 -0.1884 -0.46441 -0.5147 -0.45703 -0.8613 0.00744 -0.3465 0.19441 -0.665 0.49316 -0.8408l8.5 -5 1.5068 -0.88575zM8.40306 12.04l5.59664 3.6211V8.74805z"
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </section>
    </main>
  );
}
