import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-3 mainGreenBackground">
      <menu className="flex justify-evenly text-gray-100">
        <li className="hover:text-black cursor-pointer">
            <Link href="/">Service</Link>
        </li>

        <div className="dropdown">
          <button  className="hover:text-black cursor-pointer">Reviews</button>
          <div className="dropdown-content">
            <li>
                <Link href="/reviews/reviewsAll">Alle anmeldelser</Link>
                <Link href="/reviews/reviewsAdmin">Anmeldelser - Admin</Link>
                <Link href="/reviews/reviewsCreate">Ny anmeldelse</Link>
            </li>
          </div>
        </div>

        <li className="hover:text-black cursor-pointer">
            <Link href="/weather">Vejret</Link>
        </li>

        <li className="hover:text-black cursor-pointer">
            <Link href="/news">Nyheder</Link>
        </li>

        <li className="hover:text-black cursor-pointer">
            <Link href="/">Energidata</Link>
        </li>

      </menu>
    </nav>
  );
}
