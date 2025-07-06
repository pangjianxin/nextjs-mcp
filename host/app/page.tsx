import { SignalRChat } from "@/components/agent/agent";

export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center">
      <SignalRChat hubUrl={process.env.SIGNALR_CHAT_URL as string} />
    </div>
  );
}
