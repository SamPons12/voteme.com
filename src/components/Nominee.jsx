export default function Nominee({nominee, selectedNominee, handleClickNominee}) {
  const imageUrl = nominee.image_url
    ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}${nominee.image_url}`
    : '/death_stranding.webp';

  return (
    <figure
      onClick={
        () => handleClickNominee(nominee.id)
      }
      className={`flex flex-col cursor-pointer transform transition-all border-blue-900 hover:scale-103
                            ${selectedNominee === nominee.id ? "border-5" : ""} `}
    >
      <img src={imageUrl} className="object-cover h-78 lg:h-99" />
      <div className="flex flex-col">
        <h2 className="font-bold">{nominee.name.toUpperCase()}</h2>
        <small>{nominee.description}</small>
      </div>
    </figure>
  );
}
