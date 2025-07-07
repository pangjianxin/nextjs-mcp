import { SignalRChat } from "@/components/agent/agent";

export default function Home() {
  return <SignalRChat hubUrl={process.env.SIGNALR_CHAT_URL as string} />;
}
