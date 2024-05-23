import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="bg-blue-50 h-full pt-20">
      <div className="z-20 fixed top-0 left-0 w-full h-20 border-b backdrop-blur-md border-zinc-400 flex items-center justify-between px-4 sm:px-6 md:px-8">
        <div>
          <span className="text-4xl font-bold font-dancing-script text-primary">
            Conversify
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="lg" className="p-0 h-auto">
            <Link href="/register" className="sm:px-5 px-3 sm:py-3 py-2">
              Signup
            </Link>
          </Button>
          <Button size="lg" className="p-0 h-auto">
            <Link href="/login" className="sm:px-5 px-3 sm:py-3 py-2">
              Login
            </Link>
          </Button>
        </div>
      </div>
      <div className="min-h-[calc(100vh-80px)] w-full  px-4 sm:px-8 lg:px-12 py-4 xl:px-14 flex flex-col max-lg:justify-center lg:flex-row items-center gap-3">
        <div className="w-full lg:w-1/2 flex flex-col gap-6 z-[1]">
          <h1 className="text-5xl sm:text-7xl 2xl:text-8xl font-black">
            <span className="text-primary">Connecting </span> Conversations
            <br />
            <span className="text-primary">Anytime, </span>
            <br /> Anywhere.
          </h1>
          <p className="text-sm lg:text-base">
            Welcome to Conversify, the chat app that brings people closer
            together effortlessly. Enjoy seamless, secure conversations anytime,
            anywhere, with a user-friendly interface and real-time messaging.
          </p>

          <Button asChild size="lg" className="text-lg py-6">
            <Link href="/register">Start Chatting Now</Link>
          </Button>
        </div>
        <div className="max-lg:hidden w-full lg:w-1/2 flex items-center justify-center lg:justify-end drop-shadow-2xl">
          <img
            src="/images/hero.png"
            alt="Hero Image"
            className="max-h-[350px] lg:max-h-[550px] xl:max-h-[600px] bg-blue-400 rounded-t-full shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
