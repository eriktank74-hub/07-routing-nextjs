import { dehydrate, HydrationBoundary, QueryClient  } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Notes from "./Notes.client";

export default async function NotesPage({ params }: { params: Promise<{ slug: string }> }) {
  const queryClient = new QueryClient();
 
 
const {slug: [slug]} = await params




  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes(1, "", slug),

  });

  

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes slug={slug} />
    </HydrationBoundary>
  );
}