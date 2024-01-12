import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-3 mainGreenBackground">
      <menu className="flex justify-evenly text-gray-100">
        <li className="hover:text-black cursor-pointer">
            <Link href="/">Service</Link>
        </li>

        <li className="hover:text-black cursor-pointer">
            <Link href="/ReviewPages/reviews">Reviews</Link>
        </li>

        <li className="hover:text-black cursor-pointer">
            <Link href="/">Vejret</Link>
        </li>

        <li className="hover:text-black cursor-pointer">
            <Link href="/">Nyheder</Link>
        </li>

        <li className="hover:text-black cursor-pointer">
            <Link href="/">Energidata</Link>
        </li>

      </menu>
    </nav>
  );
}
