export default function Nominee({nominee, selectedNominee, handleClickNominee}) {
  return (
    <figure
      onClick={
        () => handleClickNominee(nominee.nominee_category_id)
      }
      className={`flex flex-col cursor-pointer transform transition-all border-blue-900 hover:scale-103
                            ${selectedNominee === nominee.nominee_category_id ? "border-5" : ""} `}
    >
      <img src="death_stranding.webp" className="object-cover h-78 lg:h-99" />
      <div className="flex flex-col">
        <h2 className="font-bold">{nominee.name.toUpperCase()}</h2>
        <small>{nominee.description}</small>
      </div>
    </figure>
  );
}
