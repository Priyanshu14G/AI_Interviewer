import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div>
    <Link href='/dashboard'>
      <Button>Let's go</Button>
    </Link>
    </div>
  );
}
