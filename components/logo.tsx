import Link from "next/link";

export default function Logo(): React.ReactNode {
  return (
    <Link href="/">
      <p className="bg-gradient-to-r from-orange-600 to-yellow-400 bg-clip-text text-transparent font-extrabold text-3xl">
        BuonAppetito
      </p>
    </Link>
  );
}
