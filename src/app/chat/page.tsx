import { NavBar } from "@/components/bars";
import { ChatInterface } from "@/components/chat-interface";
import { Container } from "@/components/container";
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
  const adminUser = session.user?.name;
  return (
    <div className="text-md">
      <Container className="mx-auto bg-amber-50 text-black px-4">
        <div className="w-full">
          <NavBar adminUser={adminUser} />
        </div>
        <div className="flex flex-col min-h-screen items-center justify-start gap-6">
          <p className="text-base text-red-600">
            This is fucking protected page.Get your ass out of here.
          </p>
          <ChatInterface adminUser={session.user?.name} />
        </div>
      </Container>
    </div>
  );
}
