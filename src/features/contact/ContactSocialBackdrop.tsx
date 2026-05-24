"use client";

import { getWhatsAppUrl, profile } from "@/content/profile";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { motion } from "framer-motion";
import Image from "next/image";

const ICONS = [
  {
    src: "/images/social/github.svg",
    alt: "GitHub",
    href: profile.github,
    position: "left-[4%] md:left-[8%]",
    size: 112,
    delay: 0,
  },
  {
    src: "/images/social/linkedin.png",
    alt: "LinkedIn",
    href: profile.linkedin,
    position: "left-[26%] md:left-[30%]",
    size: 96,
    delay: 0.15,
  },
  {
    src: "/images/social/whatsapp.svg",
    alt: "WhatsApp",
    href: getWhatsAppUrl(),
    position: "right-[26%] md:right-[30%]",
    size: 104,
    delay: 0.3,
  },
  {
    src: "/images/social/outlook.png",
    alt: "Outlook",
    href: `mailto:${profile.email}`,
    position: "right-[4%] md:right-[8%]",
    size: 120,
    delay: 0.45,
  },
] as const;

export function ContactSocialBackdrop() {
  const { preferLightEffects } = useDeviceProfile();

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(42vh,320px)] overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(3,4,10,0.35) 35%, rgba(3,4,10,0.92) 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center">
        {ICONS.map((icon) => (
          <motion.div
            key={icon.alt}
            className={`absolute bottom-0 ${icon.position}`}
            initial={preferLightEffects ? false : { opacity: 0, y: 24 }}
            whileInView={preferLightEffects ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={preferLightEffects ? undefined : { duration: 0.7, delay: icon.delay }}
          >
            {preferLightEffects ? (
              <div
                className="relative opacity-[0.07] md:opacity-[0.09]"
                style={{ width: icon.size, height: icon.size }}
              >
                <Image
                  src={icon.src}
                  alt=""
                  fill
                  sizes={`${icon.size}px`}
                  className="object-contain"
                  draggable={false}
                />
              </div>
            ) : (
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5 + icon.delay * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative opacity-[0.07] blur-[0.5px] transition-opacity duration-300 md:opacity-[0.09]"
                style={{ width: icon.size, height: icon.size }}
              >
                <Image
                  src={icon.src}
                  alt=""
                  fill
                  sizes={`${icon.size}px`}
                  className="object-contain"
                  draggable={false}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"
        aria-hidden
      />
    </div>
  );
}
