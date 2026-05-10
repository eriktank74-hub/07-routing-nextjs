import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotesDetails from "./NoteDetails.client";

interface NoteDetailsPageProps {
    params: Promise<{id: string}>
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps ) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["notesDetails", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesDetails />
    </HydrationBoundary>
  );
}
