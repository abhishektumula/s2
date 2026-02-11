import { ChatInterface } from "@/components/chat-interface";
import { Container } from "@/components/container";
import { LogOut } from "@/components/cred-page/logout";
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
  return (
    <div className="text-md">
      <Container className="mx-auto bg-amber-50 text-black p-4">
        <div className="w-full">
          <LogOut />
        </div>
        <div className="flex flex-col min-h-screen items-center justify-start gap-6">
          This is fucking protected page.Get your ass out of here.
          <ChatInterface adminUser={session.user?.name} />
        </div>
      </Container>
    </div>
  );
}
