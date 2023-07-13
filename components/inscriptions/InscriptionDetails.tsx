"use client";

import Link from "next/link";
import useSWR from "swr";

import { EnterFullScreenIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { API_URL } from "../../lib/constants";
import { InscriptionResponse } from "../../lib/types";
import { cn, fetcher, formatDateTime } from "../../lib/utils";
import CopyButton from "../CopyButton";
import RarityTag from "../RarityTag";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip";
import IconExpand from "../icons/IconExpand";
import IconShrink from "../icons/IconShrink";
import IconTwitter from "../icons/IconTwitter";
import IconUpRight from "../icons/IconUpRight";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Loading from "./../Loading";
import TransferHistory from "./../TransferHistory";
import InscriptionRender from "./InscriptionRender";

const InscriptionDetails = (params: { iid: string }) => {
  const { data, error, isLoading } = useSWR<
    | Array<InscriptionResponse>
    | {
        // todo: add more generic api error response type
        error: string;
        message: string;
        statusCode: number;
      }
  >(`${API_URL}/inscriptions/${params.iid}`, fetcher);

  const [showExpanded, setShowExpanded] = useState(false);

  if (!params.iid) return <div>404</div>;

  if (error) {
    console.log("Error:", error);
    return <span>Something went wrong ʕ•̠͡•ʔ</span>;
  }

  if (!data) {
    console.log("Loading...");
    return <Loading />;
  }

  if ("error" in data) {
    console.log("API Error:", data.error);
    return (
      <span>
        Something went wrong ʕ•̠͡•ʔ
        <br />
        {data.error}: {data.message}
      </span>
    );
  }

  // Since data is now an array, we take the first element
  const firstData = data[0];

  // todo: reusable error component (maybe including loading)

  // todo: add better check (could be the same if transferred in same block?)
  const wasTransferred = firstData.timestamp !== firstData.genesis_timestamp;

  console.log("Inscription Data:", firstData);

  return (
    <>
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-auto basis-[384px]">
            <div
              className={cn(
                "relative mx-auto mb-16 aspect-square max-w-[65%] overflow-hidden rounded-md sm:max-w-[55%] md:mb-0 md:w-0 md:min-w-full md:max-w-none lg:border",
                showExpanded ? "p-0" : "lg:p-9 xl:p-[60px]"
              )}
            >
              <InscriptionRender
                className="overflow-hidden rounded-md"
                inscription={firstData}
              />
              {/* todo: if image add glow */}

              <div className="absolute right-0.5 top-0.5 space-y-0.5 xl:right-2 xl:top-2 xl:space-y-2">
                <div className="hidden lg:block">
                  <Tooltip>
                    <TooltipContent variant="dark" side="right" sideOffset={6}>
                      <p>{showExpanded ? "Shrink" : "Expand"}</p>
                    </TooltipContent>
                    <TooltipTrigger asChild>
                      <button
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-[4px] bg-[rgba(255,255,255,.35)] transition-colors hover:bg-[rgba(255,255,255,.4)]",
                          showExpanded ? "border-0" : "border-0 lg:border"
                        )}
                        onClick={() => setShowExpanded((b) => !b)}
                      >
                        {showExpanded ? <IconShrink /> : <IconExpand />}
                      </button>
                    </TooltipTrigger>
                  </Tooltip>
                </div>
                <div>
                  <Dialog>
                    <Tooltip>
                      <TooltipContent
                        variant="dark"
                        side="right"
                        sideOffset={6}
                      >
                        <p>Full screen</p>
                      </TooltipContent>
                      <TooltipTrigger>
                        <DialogTrigger
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-[4px] bg-[rgba(255,255,255,.35)] transition-colors hover:bg-[rgba(255,255,255,.4)]",
                            showExpanded ? "border-0" : "border-0 lg:border"
                          )}
                        >
                          <EnterFullScreenIcon
                            width={16}
                            height={16}
                            className="scale-105"
                          />
                        </DialogTrigger>
                      </TooltipTrigger>
                    </Tooltip>
                    <DialogContent className="h-full border-none bg-white p-0 shadow-none sm:max-w-full">
                      <InscriptionRender
                        className="h-full w-full"
                        inscription={firstData}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <div>
                  <Tooltip>
                    <TooltipContent variant="dark" side="right" sideOffset={6}>
                      <p>View content</p>
                    </TooltipContent>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/content/${firstData.id}`}
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-[4px] bg-[rgba(255,255,255,.35)] transition-colors hover:bg-[rgba(255,255,255,.4)]",
                          showExpanded ? "border-0" : "border-0 lg:border"
                        )}
                        target="_blank"
                      >
                        <IconUpRight />
                      </Link>
                    </TooltipTrigger>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          {/* todo: add links to linkeable data, add copy icon to copy to clipboard elements (see figma) */}
          <div className="flex-initial">
            <div className="flex items-center space-x-2">
              <h2 className="my-2 pl-3 text-2xl md:pl-0">
                Inscription #{firstData.number}
              </h2>
              <div className="flex">
                <Tooltip>
                  <TooltipContent variant="dark" side="top" sideOffset={6}>
                    View on ordinals.com
                  </TooltipContent>
                  <TooltipTrigger asChild>
                    <Link
                      href={`https://ordinals.com/inscription/${firstData.id}`}
                      className="rounded bg-neutral-0 px-1 py-1 transition-colors hover:bg-neutral-50"
                      target="_blank"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  </TooltipTrigger>
                </Tooltip>
              </div>
              <div className="flex">
                <Tooltip>
                  <TooltipContent variant="dark" side="top" sideOffset={6}>
                    Share on Twitter
                  </TooltipContent>
                  <TooltipTrigger asChild>
                    <Link
                      href={`https://twitter.com/intent/tweet?text=${encodeURI(
                        `Inscription ${firstData.number} on the @novochainl1 Explorer`
                      )}`}
                      className="rounded bg-neutral-0 px-1 py-1 transition-colors hover:bg-neutral-50"
                      target="_blank"
                    >
                      <IconTwitter className="aspect-square w-4 text-neutral-900" />
                    </Link>
                  </TooltipTrigger>
                </Tooltip>
              </div>
            </div>
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="flex flex-col border-b pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                  <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                    <span className="uppercase">Type</span>
                  </td>
                  <td className="group break-all pb-2.5 align-middle md:py-1.5">
                    <span className="uppercase">{firstData.mime_type}</span>
                  </td>
                </tr>
                <tr className="flex flex-col border-b pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                  <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                    <span className="uppercase">Content Length</span>
                  </td>
                  <td className="group break-all pb-2.5 align-middle md:py-1.5">
                    {firstData.content_length}{" "}
                    <span className="uppercase">bytes</span>
                  </td>
                </tr>
                <tr className="flex flex-col border-b pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                  <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                    <span className="uppercase">ID</span>
                  </td>
                  <td className="group break-all pb-2.5 align-middle md:py-1.5">
                    <span className="font-['Aeonik_Mono'] tracking-tight">
                      <CopyButton>{firstData.id}</CopyButton>
                    </span>
                  </td>
                </tr>
                <tr className="flex flex-col border-b pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                  <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                    <span className="uppercase">Owned By</span>
                    {/* todo: add help tooltip to explain what an address is and how utxo ownership works */}
                  </td>
                  <td className="group break-all pb-2.5 align-middle md:py-1.5">
                    <CopyButton text={firstData.address}>
                      <Link
                        className="font-['Aeonik_Mono'] tracking-tight underline"
                        href={`/address/${firstData.address}`}
                      >
                        {firstData.address}
                      </Link>
                    </CopyButton>
                  </td>
                </tr>
                <tr className="flex flex-col border-b pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                  <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                    <span className="uppercase">Inscribed By</span>
                    {/* todo: add help tooltip to explain what an address is and how utxo ownership works */}
                  </td>
                  <td className="group break-all pb-2.5 align-middle md:py-1.5">
                    <span className="font-['Aeonik_Mono'] tracking-tight">
                      <CopyButton text={firstData.genesis_address}>
                        <Link
                          className="underline"
                          href={`/address/${firstData.genesis_address}`}
                        >
                          {firstData.genesis_address}
                        </Link>
                      </CopyButton>
                    </span>
                  </td>
                </tr>
                <tr className="flex flex-col border-b pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                  <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                    <span className="uppercase">Inscription TxId</span>
                  </td>
                  <td className="group break-all pb-2.5 align-middle md:py-1.5">
                    <span className="font-['Aeonik_Mono'] tracking-tight">
                      <CopyButton text={firstData.genesis_tx_id}>
                        <div>
                          <Link
                            className="underline"
                            href={`https://novoexplorer.com/tx/${firstData.genesis_tx_id}`}
                            target="_blank"
                          >
                            {firstData.genesis_tx_id}
                          </Link>
                          <span className="ml-1">↗</span>
                        </div>
                      </CopyButton>
                    </span>
                  </td>
                </tr>
                <tr className="flex flex-col border-b pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                  <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                    <span className="uppercase">Inscription Date</span>
                  </td>
                  <td className="group break-all pb-2.5 align-middle md:py-1.5">
                    <span className="uppercase">
                      {formatDateTime(firstData.genesis_timestamp)}
                    </span>
                  </td>
                </tr>
                {wasTransferred && (
                  <tr className="flex flex-col border-b pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                    <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                      <span className="uppercase">Last Transfer Date</span>
                    </td>
                    <td className="group break-all pb-2.5 align-middle md:py-1.5">
                      <span className="uppercase">
                        {new Intl.DateTimeFormat("default", {
                          dateStyle: "long",
                          timeStyle: "medium",
                        }).format(new Date(firstData.timestamp))}
                      </span>
                    </td>
                  </tr>
                )}
                <tr className="flex flex-col border-b pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                  <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                    <span className="uppercase">Inscription Height</span>
                  </td>
                  <td className="group break-all pb-2.5 align-middle md:py-1.5">
                    <Link
                      href={`/block/${firstData.genesis_block_height}`}
                      className="underline"
                    >
                      {firstData.genesis_block_height}
                    </Link>
                  </td>
                </tr>
                <tr className="flex flex-col border-b pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                  <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                    <span className="uppercase">Inscription Fee</span>
                  </td>
                  <td className="group break-all pb-2.5 align-middle md:py-1.5">
                    {firstData.genesis_fee}
                  </td>
                </tr>
                <tr className="flex flex-col border-b pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                  <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                    <span className="uppercase">Licence</span>
                  </td>
                  <td className="group break-all pb-2.5 align-middle md:py-1.5">
                    <span className="font-['Aeonik_Mono'] tracking-tight">
                      <CopyButton>{firstData.licence}</CopyButton>
                    </span>
                  </td>
                </tr>
                <tr className="flex flex-col pl-3 md:table-row md:py-3 md:pl-0 md:align-middle">
                  <td className="whitespace-nowrap pr-8 pt-2.5 text-neutral-400 md:py-2.5 md:text-black">
                    <span className="uppercase">Max Claims</span>
                  </td>
                  <td className="group break-all pb-2.5 align-middle md:py-1.5">
                    {firstData.max_claims}
                  </td>
                </tr>
              </tbody>
              {/* todo: add period? not in api, needs sat coinbase height, or calculate it */}
            </table>
          </div>
        </div>
        <div className="mt-10">
          {wasTransferred ? (
            <TransferHistory inscription={firstData} />
          ) : (
            <div className="flex flex-col p-2">
              <h2 className="my-4 text-xl">Transfer History</h2>
              <div className="text-neutral-400">
                This inscription has not been transferred yet.
              </div>
            </div>
          )}
        </div>
      </TooltipProvider>
    </>
  );
};

export default InscriptionDetails;
