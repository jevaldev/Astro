// import { useEffect, useState } from "react";
// import { supabase } from "../../lib/supabaseClient";

// type Note = {
//   id: number;
//   title: string;
//   content: string;
//   tags: string[];
//   is_public: boolean;
// };

// export default function AdminDashboard() {
//   const [session, setSession] = useState<any>(null);
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Obtener session actual
//     supabase.auth.getSession().then(({ data }) => {
//       setSession(data.session);
//       if (!data.session) {
//         window.location.href = "/admin"; // si no hay sesión, redirect al login
//       }
//     });

//     // Subscribir cambios de auth (opcional)
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session);
//         if (!session) window.location.href = "/admin";
//       }
//     );

//     fetchNotes();

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   async function fetchNotes() {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from("notes")
//       .select("*")
//       .order("created_at", { ascending: false });
//     setLoading(false);
//     if (error) {
//       console.error(error);
//       return;
//     }
//     setNotes(data || []);
//   }

//   async function createNote() {
//     const title = prompt("Título de la nota");
//     if (!title) return;
//     const { data, error } = await supabase
//       .from("notes")
//       .insert([{ title, content: "", tags: [], is_public: false }])
//       .select()
//       .single();
//     if (error) return alert(error.message);
//     fetchNotes();
//   }

//   async function deleteNote(id: number) {
//     if (!confirm("¿Eliminar nota?")) return;
//     const { error } = await supabase.from("notes").delete().eq("id", id);
//     if (error) return alert(error.message);
//     fetchNotes();
//   }

//   async function editNote(note: Note) {
//     const title = prompt("Nuevo título", note.title) ?? note.title;
//     const content =
//       prompt("Nuevo contenido (Markdown)", note.content) ?? note.content;
//     const tagsText =
//       prompt("Tags separados por comas", note.tags.join(",")) ??
//       note.tags.join(",");
//     const tags = tagsText
//       .split(",")
//       .map((t) => t.trim())
//       .filter(Boolean);
//     const { error } = await supabase
//       .from("notes")
//       .update({ title, content, tags })
//       .eq("id", note.id);
//     if (error) return alert(error.message);
//     fetchNotes();
//   }

//   async function logout() {
//     await supabase.auth.signOut();
//     window.location.href = "/admin";
//   }

//   if (!session) return <p>Verificando sesión...</p>;

//   return (
//     <section>
//       <div className="flex justify-between items-center mb-6">
//         <div>Admin: {session.user?.email}</div>
//         <div>
//           <button
//             onClick={() => createNote()}
//             className="mr-2 px-3 py-1 bg-primary-500 text-white rounded"
//           >
//             Nueva nota
//           </button>
//           <button onClick={logout} className="px-3 py-1 border rounded">
//             Salir
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <p>Cargando...</p>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2">
//           {notes.map((note) => (
//             <article key={note.id} className="p-4 bg-primary-700/80 rounded">
//               <h3 className="text-accent font-bold">{note.title}</h3>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   className="px-2 py-1 border rounded"
//                   onClick={() => editNote(note)}
//                 >
//                   Editar
//                 </button>
//                 <button
//                   className="px-2 py-1 border rounded"
//                   onClick={() => deleteNote(note.id)}
//                 >
//                   Eliminar
//                 </button>
//                 <a
//                   className="ml-auto text-sm underline"
//                   href={`/note/${note.id}`}
//                 >
//                   Ver
//                 </a>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }
