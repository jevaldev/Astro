import { supabase } from "../lib/supabaseClient";
import { marked } from "marked";
const { data: notes } = await supabase
  .from("notes")
  .select("*")
  .eq("is_public", true);

export const NoteCard = () => {
  async function getExcerpt(content: string, length = 100) {
    const html = await marked.parse(content);
    const plainText = html.replace(/(<([^>]+)>)/gi, "");
    return plainText.length > length
      ? plainText.slice(0, length) + "..."
      : plainText;
  }

  return (
    <article className="mt-4 mx-2">
      {notes === null ? (
        <p className="text-center text-secondary text-lg">
          Por el momento no hay notas públicas disponibles.
        </p>
      ) : (
        <nav>
          <ul className="grid gap-6 md:grid-cols-2">
            {notes
              ?.filter((note) => note.is_public)
              .map((note) => (
                <li
                  key={note.id}
                  className="group bg-primary-700/90 rounded-2xl p-5 shadow-lg shadow-primary-900 hover:shadow-primary-500/70 hover:-translate-y-1 transition-all duration-200 ease-in-out"
                >
                  <a href={`/note/${note.id}`} className="block h-full">
                    <h2 className="text-accent text-xl font-bold mb-2 group-hover:underline">
                      {note.title}
                    </h2>

                    <ul className="flex flex-wrap gap-2 mb-3">
                      {note.tags.map((tag: string) => (
                        <li
                          key={tag}
                          className="text-xs font-medium bg-primary-900/50 text-secondary px-2 py-2 rounded-md"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <p className="text-accent/90 text-sm line-clamp-3">
                      {getExcerpt(note.content, 120)}
                    </p>
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </article>
  );
};
