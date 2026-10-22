"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { subscribeToPush, unsubscribeFromPush } from "@/lib/push/actions";
import { urlBase64ToUint8Array } from "@/lib/push/client-utils";

/** localStorage flag: the user closed the install banner — don't nag again. */
const INSTALL_DISMISS_KEY = "skoracare-pwa-install-dismissed";

/**
 * PWA setup (client-only):
 * - Registers the service worker (offline shell + Web Push).
 * - Captures the browser's install prompt (beforeinstallprompt) and shows an
 *   in-app "Install app" button.
 * - Subscribes the browser to Web Push so SOS alerts arrive even when the
 *   app tab is closed.
 */
export function PwaSetup() {
  const [installPrompt, setInstallPrompt] = useState<{
    prompt: () => Promise<void>;
    userChoice?: Promise<{ outcome: "accepted" | "dismissed" }>;
  } | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  /** Persist a PushSubscription to the server (idempotent). */
  async function persistSubscription(sub: PushSubscription) {
    const json = sub.toJSON();
    if (!json.endpoint || !json.keys) return;
    await subscribeToPush(
      json.endpoint,
      json.keys.auth ?? "",
      json.keys.p256dh ?? ""
    ).catch(() => {});
  }

  // Register service worker on mount, then subscribe to push when the user
  // has granted notification permission.
  useEffect(() => {
    if (!("serviceWorker" in navigator) || !window.location.protocol.startsWith("http")) return;
    let cancelled = false;

    navigator.serviceWorker
      .register("/sw.js")
      .then(async (reg) => {
        if (cancelled) return;

        // Re-opt-in only when permission was already granted. The browser
        // shows its own prompt; we never nag or auto-request.
        if (Notification.permission !== "granted") return;

        // Already subscribed? Keep it. (pushManager.getSubscription() also
        // reveals an existing subscription after reload.)
        const existing = await reg.pushManager.getSubscription();
        if (existing) {
          await persistSubscription(existing);
          return;
        }

        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? ""
          ),
        });
        await persistSubscription(sub);
      })
      .catch(() => {
        // SW registration / push subscribe failure must never break the app.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Clean up the server-side subscription when the user revokes permission.
  useEffect(() => {
    const onPermissionChange = () => {
      if (Notification.permission === "denied") {
        navigator.serviceWorker
          .getRegistration()
          .then((reg) => reg?.pushManager.getSubscription())
          .then((sub) => {
            if (sub?.endpoint) {
              void unsubscribeFromPush(sub.endpoint).catch(() => {});
              void sub.unsubscribe().catch(() => {});
            }
          })
          .catch(() => {});
      }
    };
    navigator.permissions?.query({ name: "notifications" }).then((st) => {
      st.addEventListener("change", onPermissionChange);
    }).catch(() => {});
    return () => {
      navigator.permissions?.query({ name: "notifications" }).then((st) => {
        st.removeEventListener("change", onPermissionChange);
      }).catch(() => {});
    };
  }, []);

  // Capture the install prompt (Android Chrome + desktop; iOS shows its own
  // "Add to Home Screen" flow). The dismissal flag is checked on EVERY firing
  // — Chromium can fire beforeinstallprompt multiple times per page (e.g. when
  // the service worker activates) — and again at render time below, so a
  // dismissed banner can never come back until the app is actually installed.
  useEffect(() => {
    const onPrompt = (e: Event) => {
      // Always suppress the browser's own mini-infobar; we own the UX.
      e.preventDefault();
      try {
        if (localStorage.getItem(INSTALL_DISMISS_KEY) === "1") return;
      } catch {
        // Storage unavailable (privacy mode) — fall through and show.
      }
      setInstallPrompt(e as never);
      setShowInstall(true);
    };
    const onInstalled = () => {
      setShowInstall(false);
      setInstallPrompt(null);
      // Installed for real — reset the flag so a future reinstall can prompt.
      try {
        localStorage.removeItem(INSTALL_DISMISS_KEY);
      } catch {
        // Ignore.
      }
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    try {
      await installPrompt.prompt();
      // Cancelling Chrome's own dialog must also stop the nagging, otherwise
      // the banner re-appears on the next load — persist it as a dismissal.
      const choice = await installPrompt.userChoice?.catch(() => null);
      if (choice?.outcome === "dismissed") {
        try {
          localStorage.setItem(INSTALL_DISMISS_KEY, "1");
        } catch {
          // Storage unavailable — banner still hides for this page view.
        }
      }
    } catch {
      // prompt() can throw if the event was already consumed — just hide.
    }
    setShowInstall(false);
  };

  const dismissInstall = () => {
    try {
      localStorage.setItem(INSTALL_DISMISS_KEY, "1");
    } catch {
      // Storage unavailable — at least hide it for this page view.
    }
    setShowInstall(false);
  };

  // Render-time gate (client only): the persisted dismissal wins over any
  // state, so even a stale showInstall can never render the banner.
  const storedDismissed =
    typeof window !== "undefined"
      ? (() => {
          try {
            return localStorage.getItem(INSTALL_DISMISS_KEY) === "1";
          } catch {
            return false;
          }
        })()
      : false;

  return (
    <AnimatePresence>
      {showInstall && !storedDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
          className="fixed bottom-5 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-[90] w-auto sm:w-[390px] max-w-[calc(100vw-2rem)] rounded-2xl border border-emerald-500/30 bg-[#03150E]/95 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_25px_rgba(16,185,129,0.18)] backdrop-blur-2xl p-3.5 text-[#FAF7F2]"
        >
          {/* Top subtle emerald gradient hairline */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
          />

          <div className="flex items-center gap-3">
            {/* App Icon with subtle glowing container */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-emerald-950/80 border border-emerald-500/30 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/icon-192.png"
                alt="SkoraCares"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* Text details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-main text-xs sm:text-sm font-bold tracking-tight text-white truncate">
                  Install SkoraCares
                </p>
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                  PWA
                </span>
              </div>
              <p className="font-secondary text-[11px] leading-snug text-emerald-100/70 truncate mt-0.5">
                Instant clinical access & offline support
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={install}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#10B981] via-[#059669] to-[#047857] px-3 py-2 text-xs font-bold font-main uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(16,185,129,0.35)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Install</span>
              </button>
              <button
                type="button"
                onClick={dismissInstall}
                className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors active:scale-95 cursor-pointer"
                aria-label="Dismiss installation prompt"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
