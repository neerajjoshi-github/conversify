import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-20 border-b border flex items-center justify-between px-4 sm:px-6 md:px-8">
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
    </div>
  );
};

export default Home;
