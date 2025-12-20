export default function MovieTrailer({ videos }) {
  const trailer = videos.find(
    v => v.type === "Trailer" && v.site === "YouTube"
  );

  if (!trailer) return null;

  return (
    <>
      <h2 className="text-xl text-white mt-10 mb-4">
        Trailer
      </h2>

      <iframe
        className="w-full h-[400px]"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        allowFullScreen
      />
    </>
  );
}
