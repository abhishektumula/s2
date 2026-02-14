import { ChatPageClient } from "@/components/chat-page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getsessionDetails = async () => {
  const session = await getServerSession();
  return session;
};

export default async function ChatPage() {
  const session = await getsessionDetails();
  if (!session) {
    redirect("/");
  }

  const loverName = process.env.LOVER_NAME ?? process.env.NEXT_PUBLIC_LOVER_NAME ?? "";

  return <ChatPageClient adminUser={session.user?.name} loverName={loverName} />;
}
