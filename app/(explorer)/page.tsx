import Link from "next/link";

import CtaLink from "../../components/CtaLink";
import Footer from "../../components/Footer";
import GalleryPreview from "../../components/GalleryPreview";
import Header from "../../components/Header";
import Intro from "../../components/Intro";
import SearchBar from "../../components/SearchBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novo Digital Assets Explorer | hashers.club",
  description:
    "Explore Novo Digital Assets with Hashers.Club. Search, filter, and sort Novo content.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-between space-y-6 p-6">
        {/* Intro Section */}
        <div className="mx-auto max-w-2xl space-y-10">
          {/* todo: wrap in motion */}
          <Intro />
          <div>
            <SearchBar />
            <Link
              href="/explore"
              className="mt-4 flex justify-center text-neutral-300"
            >
              or explore all
            </Link>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="w-full">
          <p className="mt-20 text-center text-sm uppercase">
            Latest Inscriptions
          </p>
          <div className="mx-auto mb-4 mt-3 h-12 w-0 border border-dashed border-l-black" />
          <GalleryPreview />

          <div className="mt-16 flex justify-around">
            <CtaLink href="/explore">
              Explore all, sort, and filter &rarr;
            </CtaLink>
          </div>
        </div>

        <div className="w-full py-8">
          <hr className="border-dashed border-neutral-200" />
        </div>

        <div className="grid w-full gap-5 md:grid-cols-2">
          <div className="rounded-[6px] border border-neutral-0 p-8">
            <div className="flex h-16 w-16 items-center overflow-hidden rounded bg-neutral-0 pl-2 text-xl">
              <span className="pointer-events-none select-none bg-gradient-to-r from-neutral-300 to-neutral-0 bg-clip-text text-transparent">
                #8030
              </span>
            </div>
            <h4 className="mt-7 text-2xl">Looking to make an inscription?</h4>
            <p className="mt-4">
              Visit{" "}
              <a
                href="https://hashers.club/inscribe"
                target="_blank"
                className="text-neutral-300"
              >
                Hashers.club
              </a>
            </p>
          </div>
          <div className="rounded-[6px] border border-neutral-0 p-8">
            <div className="pointer-events-none flex h-16 w-16 items-center justify-center rounded bg-neutral-0">
              <img src="/b-illustration.svg" alt="Bitcoin Icon" />
            </div>
            <h4 className="mt-7 text-2xl">What is Novo?</h4>
            <p className="mt-4">
              Novo reimagines the classic UTXO-based scalable technology by refining its core infrastructure and virtual machine. This enhancement unleashes the technology's considerably untapped potential for parallelizable transaction processing and Layer-1 programmability.{" "}
              <a
                href="https://novo.money "
                target="_blank"
                className="text-neutral-300"
              >
                Learn more.
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
