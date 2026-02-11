import { CheckIn } from "@/components/cred-page";

export default function HomeLayout() {
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-row items-center justify-center">
        <CheckIn />
      </div>
    </div>
  );
}
