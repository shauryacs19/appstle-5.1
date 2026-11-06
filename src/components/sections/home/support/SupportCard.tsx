import Image from "next/image";
import { SupportChatPhone } from "@/components/features/demos/SupportChatPhone";
import supportPhoto from "@/assets/home/support-photo.webp";

export function SupportCard() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-blue-ink text-white">
      <div className="relative h-[27rem] shrink-0 overflow-hidden lg:h-auto lg:min-h-[26rem] lg:flex-1">
        <Image
          src={supportPhoto}
          alt="An Appstle merchant success engineer wearing a headset, working at a laptop"
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 36vw, 95vw"
          className="object-cover object-[100%_30%] sm:object-[50%_30%]"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-blue-ink via-blue-ink/10 to-transparent" />
        <div aria-hidden className="absolute inset-y-0 right-0 w-3/5 bg-linear-to-l from-black/45 via-black/15 to-transparent" />
        <SupportChatPhone className="absolute top-14 right-4 h-[calc(100%-2.25rem)] w-[11.75rem] rotate-[2.5deg] [mask-image:linear-gradient(to_bottom,#000_88%,transparent)] min-[400px]:w-[12.75rem] sm:top-6 sm:right-8 sm:h-[calc(100%-0.25rem)] lg:right-6 lg:w-[13.25rem] xl:w-[14rem]" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur sm:top-auto sm:bottom-4 sm:left-5">
          <span className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-[#4ADE80] motion-safe:animate-[pulse-ring_2s_ease-out_infinite]" />
            <span className="relative size-2 rounded-full bg-[#4ADE80]" />
          </span>
          Available 24x7x365
        </span>
      </div>
      <div className="flex flex-col p-7 sm:p-8">
        <h3 className="text-3xl leading-tight font-bold sm:text-[2.1rem]">Customer service you can count on.</h3>
        <p className="mt-3 leading-relaxed text-white/90">
          You’re only a few minutes away from Appstle’s merchant success engineers — ready to help with setup,
          migrations and quick customizations.
        </p>
      </div>
    </div>
  );
}
